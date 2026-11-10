import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "5-Day Zero-Waste Challenge" };

const DAYS = [
  {
    day: 1,
    title: "The Crisper Drawer Audit",
    time: "5 minutes",
    goal: "Know exactly what you have and what has to be eaten first.",
    steps: [
      "Empty the crisper, the door and the front of each shelf onto the counter.",
      "Sort into three piles: use tonight (soft, wilting, opened), use this week, keep.",
      "Wilted herbs and greens go in iced water for 10 minutes; most perk right back up.",
      "Add the \"use tonight\" pile to your Golden pantry so recipes are matched to it.",
    ],
    cta: { label: "Match my fridge to a meal", href: "/pantry" },
  },
  {
    day: 2,
    title: "Three Master Sauces",
    time: "20 minutes",
    goal: "Three sauce structures that turn random leftovers into one finished meal.",
    steps: [
      "Savory-sweet glaze: 2 parts soy sauce, 1 part honey or sugar, 1 part vinegar, garlic. For stir-fries, rice and roast veg.",
      "Bright herb sauce: soft herbs or greens, oil, lemon or vinegar, salt, garlic, blended or finely chopped. For grains, eggs, fish and potatoes.",
      "Creamy pan sauce: fry onion or garlic, add stock or pasta water, reduce by half, finish with butter, cream or cheese. For pasta, chicken and vegetables.",
      "Taste each one and balance it: flat needs acid, harsh needs fat or sugar, dull needs salt.",
    ],
    cta: { label: "Find dinners for my leftovers", href: "/pantry" },
  },
  {
    day: 3,
    title: "Your First Micro-Orchestration",
    time: "Under 30 minutes",
    goal: "A two-dish dinner that lands on the table hot, at the same time.",
    steps: [
      "Pick two dishes in Plan a meal: one main and one side.",
      "Golden merges them into one timeline and staggers the starts.",
      "Follow one task at a time. Chimes and vibration tell you when to switch.",
      "Tap \"I made it!\" for each dish to log your first orchestrated meal.",
    ],
    cta: { label: "Plan my two-dish dinner", href: "/plan" },
  },
  {
    day: 4,
    title: "The Rescue Drill",
    time: "15 minutes",
    goal: "Learn to save a dish instead of binning it, before it ever happens for real.",
    steps: [
      "Make a quick pan sauce from yesterday's leftovers: fry garlic, add stock, reduce.",
      "Taste it at three points: after the stock, halfway through reducing, at the end.",
      "If it's too salty, too thin or splits, open Fix My Mistake and follow the exact amounts it gives you.",
      "Note the tell you'll recognise next time: the sheen of a split sauce, the coating on a spoon.",
    ],
    cta: { label: "Practise with Fix My Mistake", href: "/plan" },
  },
  {
    day: 5,
    title: "Cook Once, Eat Twice",
    time: "About 40 minutes",
    goal: "One cook that becomes tonight's dinner and tomorrow's lunch, using up the last of the fridge.",
    steps: [
      "Check your pantry in Golden and pick a dinner that uses what's left from the week.",
      "Double the base (grains, roast vegetables or a sauce) while the main cooks.",
      "Portion half into containers before serving, so it becomes lunch, not leftovers.",
      "Open your kitchen log: five days of meals, and what you didn't throw away.",
    ],
    cta: { label: "Pick tonight's cook-once dinner", href: "/pantry" },
  },
];

export default function ChallengePage() {
  return (
    <main className="mx-auto px-4 pb-12 pt-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Free for 5 days, every feature unlocked</p>
      <h1 className="font-display text-[2.2rem]">The 5-Day <span className="text-accent">Zero-Waste</span> Challenge</h1>
      <p className="mt-2 text-muted">Turn whatever is in your fridge into five good dinners, without a trip to the grocery store.</p>

      <ol className="mt-6 space-y-5">
        {DAYS.map((d) => (
          <li key={d.day} className="rounded-3xl border border-line p-5">
            <p className="text-sm font-semibold text-muted">Day {d.day} · {d.time}</p>
            <h2 className="mt-1 text-xl font-semibold">{d.title}</h2>
            <p className="mt-1">{d.goal}</p>
            <ul className="mt-3 space-y-2">
              {d.steps.map((s) => <li key={s} className="flex gap-2"><span aria-hidden className="text-basil">✓</span><span>{s}</span></li>)}
            </ul>
            <Link href={d.cta.href} className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-button font-semibold text-button-ink">{d.cta.label}</Link>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted">Next: build real technique with the <Link href="/modules" className="underline">Chinese, Korean and Italian modules</Link>.</p>
    </main>
  );
}
