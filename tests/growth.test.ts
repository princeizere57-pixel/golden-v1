import { describe, expect, it } from "vitest";
import { OFFERS, TRIAL_HEADLINE_DAYS, newOrderId, offerById, perMonth, priceLine, yearlySaving } from "@/lib/billing/offers";
import { covers, isStaple, pantryMatch, parseFridge, rankMeals } from "@/lib/pantry";

describe("offers", () => {
  it("matches the plans configured in Whop, the same as the Golden app", () => {
    expect(offerById("year")).toMatchObject({ name: "Golden Year", price: 45.09, planType: "renewal", billingPeriodDays: 365, trialDays: 3, planEnv: "WHOP_PLAN_YEAR" });
    expect(offerById("month")).toMatchObject({ price: 7.99, planType: "renewal", billingPeriodDays: 30, trialDays: 3, planEnv: "WHOP_PLAN_MONTH" });
    expect(OFFERS.map((o) => o.id)).toEqual(["year", "month"]);
    expect(offerById("executive")).toBeUndefined();
  });

  it("describes prices for buyers", () => {
    expect(priceLine(offerById("year")!)).toBe("3 days free, then $45.09/year");
    expect(priceLine(offerById("month")!)).toBe("3 days free, then $7.99/month");
    expect(perMonth(offerById("year")!)).toBe("$3.76");
    expect(yearlySaving()).toEqual({ amount: 50.79, pct: 53 });
    expect(TRIAL_HEADLINE_DAYS).toBe(3);
  });

  it("makes unique, recognisable order IDs", () => {
    const a = newOrderId();
    expect(a).toMatch(/^gld_[a-z0-9]+_[0-9a-f]{12}$/);
    expect(newOrderId()).not.toBe(a);
  });
});

describe("pantry", () => {
  it("matches ingredients by word, singular or plural", () => {
    expect(covers("chicken", "Chicken Thighs")).toBe(true);
    expect(covers("tomato", "Chopped Tomatoes")).toBe(true);
    expect(covers("egg", "Eggplant")).toBe(false);
    expect(isStaple("Olive Oil")).toBe(true);
  });

  it("ignores staples and reports what's missing", () => {
    const m = pantryMatch(["Chicken Breast", "Rice", "Salt", "Olive Oil", "Lemon"], ["chicken", "rice"]);
    expect(m.have).toEqual(["Chicken Breast", "Rice"]);
    expect(m.missing).toEqual(["Lemon"]);
    expect(m.ratio).toBeCloseTo(2 / 3);
    expect(pantryMatch(["Salt"], []).ratio).toBe(0);
  });
});

describe("pantry-to-plate matcher", () => {
  it("reads what people type about their fridge", () => {
    expect(parseFridge("2 eggs, half an onion and some rice\nspinach, eggs")).toEqual(["eggs", "onion", "rice", "spinach"]);
    expect(parseFridge("leftover chicken + 1 tin of tomatoes; garlic")).toEqual(["chicken", "tomatoes", "garlic"]);
    expect(parseFridge("  ,, and ")).toEqual([]);
  });

  it("ranks meals by how much the fridge covers, instant meals first", () => {
    const recipes = [
      { slug: "omelette", ingredients: ["Eggs", "Spinach", "Salt", "Butter"] },
      { slug: "fried-rice", ingredients: ["Rice", "Eggs", "Onion", "Soy Sauce"] },
      { slug: "curry", ingredients: ["Chicken", "Coconut Milk", "Curry Paste", "Rice"] },
    ];
    const ranked = rankMeals(recipes, parseFridge("eggs, spinach, rice, onion"));
    expect(ranked.map((m) => m.recipe.slug)).toEqual(["omelette", "fried-rice"]);
    expect(ranked[0].instant).toBe(true);
    expect(ranked[1]).toMatchObject({ instant: false, match: { missing: ["Soy Sauce"] } });
    expect(rankMeals(recipes, [])).toEqual([]);
  });
});

it("prefers meals that use up more of the fridge over tiny exact matches", () => {
  const recipes = [
    { slug: "plain-rice", ingredients: ["Rice", "Salt"] },
    { slug: "stir-fry", ingredients: ["Eggs", "Rice", "Onion", "Chicken", "Tomatoes"] },
  ];
  expect(rankMeals(recipes, parseFridge("eggs, rice, onion, chicken, spinach")).map((m) => m.recipe.slug)).toEqual(["stir-fry", "plain-rice"]);
});
