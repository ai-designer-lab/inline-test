export type StarterQuestion = {
  id: string;
  label: string;
  userMessage: string;
  nextAnswerId: string;
};

export type ScriptedAnswer = {
  id: string;
  markdown: string;
  followUps: Array<{
    id: string;
    label: string;
    userMessage: string;
    nextAnswerId: string;
  }>;
};

export const SIJO_STARTERS: StarterQuestion[] = [
  {
    id: "sq-1",
    label: "What sheets are best for hot sleepers?",
    userMessage: "What sheets are best for hot sleepers?",
    nextAnswerId: "a-1-hot-sleepers-overview",
  },
  {
    id: "sq-2",
    label: "Bamboo vs linen for cooling?",
    userMessage: "Is bamboo or linen better for cooling sleep?",
    nextAnswerId: "a-2-bamboo-vs-linen",
  },
  {
    id: "sq-3",
    label: "What weave is coolest: percale or sateen?",
    userMessage: "What weave is coolest — percale or sateen?",
    nextAnswerId: "a-3-percale-vs-sateen",
  },
  {
    id: "sq-4",
    label: "My partner sleeps cold, I sleep hot. What do we do?",
    userMessage: "My partner sleeps cold but I sleep hot — what's the best setup?",
    nextAnswerId: "a-4-partner-temp-mismatch",
  },
];

export const SIJO_ANSWERS: Record<string, ScriptedAnswer> = {
  "a-1-hot-sleepers-overview": {
    id: "a-1-hot-sleepers-overview",
    markdown: `# Best bedding for cooler sleep (Sijo picks)

If you wake up warm or sweaty, your sheets are usually the fastest win. The goal is **breathability + moisture wicking**, not "thicker = better."

## What to look for
- **Cooling feel:** crisp, breathable fabric that doesn't trap heat
- **Moisture management:** helps move humidity away from your body
- **Weave matters:** percale tends to feel cooler than sateen

## Sijo recommendations
### 1) Crisp + airy: Percale-style feel
If you like that "hotel sheet" crispness, choose a breathable weave that stays cool against the skin.

### 2) Smooth + moisture-wicking: Bamboo-derived fabric
If you want something soft and drapey that still sleeps cool, bamboo-based options are often a great fit for hot sleepers.

## Quick setup tip
Pair cooling sheets with a **lighter duvet insert** (or a quilt) so your bedding isn't fighting the airflow your sheets create.

> If you tell me what you prefer — **crisp vs silky** — I can narrow this down to the best match.`,
    followUps: [
      {
        id: "fu-1a",
        label: "I like crisp hotel sheets. Which Sijo set?",
        userMessage: "I like crisp hotel sheets. Which Sijo set should I get?",
        nextAnswerId: "a-1a-crisp-hotel",
      },
      {
        id: "fu-1b",
        label: "I want super soft but still cool. What's best?",
        userMessage: "I want super soft sheets but still cool — what's best?",
        nextAnswerId: "a-1b-soft-but-cool",
      },
      {
        id: "fu-1c",
        label: "How do I pick the right weight for summer?",
        userMessage: "How do I pick the right bedding weight for summer?",
        nextAnswerId: "a-1c-summer-weight",
      },
    ],
  },

  "a-1a-crisp-hotel": {
    id: "a-1a-crisp-hotel",
    markdown: `# Crisp "hotel sheet" feel for cool sleep

If you love crisp sheets, prioritize a **breathable weave** that doesn't cling.

## Why crisp feels cooler
- More airflow through the fabric
- Less "drape" (so it doesn't wrap and trap heat)
- Often feels cool-to-the-touch when you first get in bed

## What to choose (Sijo)
### Go for a percale-like feel
Look for sheets described as **crisp**, **matte**, or **hotel-style**. They typically sleep cooler than buttery/silky weaves.

## Care tip (helps cooling)
Wash on cool and avoid heavy fabric softeners — buildup can reduce breathability over time.`,
    followUps: [
      {
        id: "fu-1a-1",
        label: "Percale vs linen — which is cooler?",
        userMessage: "Percale vs linen — which is cooler?",
        nextAnswerId: "a-5-percale-vs-linen",
      },
      {
        id: "fu-1a-2",
        label: "What thread count is best for cooling?",
        userMessage: "What thread count is best for cooling sheets?",
        nextAnswerId: "a-6-thread-count-cooling",
      },
    ],
  },

  "a-1b-soft-but-cool": {
    id: "a-1b-soft-but-cool",
    markdown: `# Soft sheets that still sleep cool

If you want "soft first" without overheating, look for **moisture-wicking + breathable drape**.

## Why soft sheets can run warm
Softer weaves often drape more, which can reduce airflow and trap heat — especially if you also use a heavy duvet.

## What to choose (Sijo)
### Bamboo-derived / moisture-wicking options
These tend to feel smooth and cool while helping manage humidity for hot sleepers.

## Best paired with
- A lighter duvet insert or quilt
- A breathable mattress protector (avoid plastic-feel barriers)`,
    followUps: [
      {
        id: "fu-1b-1",
        label: "Bamboo vs eucalyptus (lyocell) — big difference?",
        userMessage: "Is bamboo or eucalyptus (lyocell) better for cooling?",
        nextAnswerId: "a-7-bamboo-vs-lyocell",
      },
      {
        id: "fu-1b-2",
        label: "I sweat at night — what should I change first?",
        userMessage: "I sweat at night — what should I change first?",
        nextAnswerId: "a-8-night-sweats-first-fix",
      },
    ],
  },

  "a-1c-summer-weight": {
    id: "a-1c-summer-weight",
    markdown: `# Picking bedding weight for summer

Sheets help, but your top layer usually decides whether you overheat.

## A simple summer setup
- **Cooling sheets** (breathable weave)
- **Light insert** (or swap to a quilt)
- Keep one "backup layer" folded at the foot of the bed

## If you still run hot
- Downshift your duvet fill weight
- Avoid overly dense weaves on the top layer
- Consider a breathable mattress pad if your mattress sleeps warm`,
    followUps: [
      {
        id: "fu-1c-1",
        label: "What's the best Sijo combo for summer?",
        userMessage: "What's the best Sijo bedding combo for summer?",
        nextAnswerId: "a-9-best-summer-combo",
      },
      {
        id: "fu-1c-2",
        label: "Why do I sleep hotter in winter bedding even in summer?",
        userMessage: "Why do I sleep hotter with winter bedding even in summer?",
        nextAnswerId: "a-10-why-winter-bedding-hot",
      },
    ],
  },

  "a-2-bamboo-vs-linen": {
    id: "a-2-bamboo-vs-linen",
    markdown: `# Bamboo vs linen for cooling sleep

Both can sleep cool, but they feel very different.

## If you want the coolest "feel"
### Linen
- Airy, textured, and very breathable
- Feels less clingy when you run warm
- Gets better with washes

## If you want soft + moisture management
### Bamboo-derived fabric
- Smooth, drapey, and soft immediately
- Often great for humidity and night sweats
- Can feel "cool" without being crisp

> Quick rule: **linen = airy + crisp-ish**, **bamboo = smooth + moisture-wicking**.`,
    followUps: [
      {
        id: "fu-2-1",
        label: "Which one is best for night sweats?",
        userMessage: "Which is better for night sweats — linen or bamboo?",
        nextAnswerId: "a-11-night-sweats-linen-vs-bamboo",
      },
      {
        id: "fu-2-2",
        label: "I hate scratchy sheets. What's the safest choice?",
        userMessage: "I hate scratchy sheets — what's the safest choice?",
        nextAnswerId: "a-12-hate-scratchy",
      },
    ],
  },

  "a-3-percale-vs-sateen": {
    id: "a-3-percale-vs-sateen",
    markdown: `# Percale vs sateen for cool sleep

If cooling is the priority, **percale usually wins**.

## Percale
- Crisp, breathable, "hotel sheet" feel
- Less cling → better airflow
- Typically feels cooler overnight

## Sateen
- Smoother, silkier feel
- More drape → can trap warmth
- Often preferred if you sleep cold or want a cozy feel

> If you run hot: choose percale-like. If you run cold: sateen can feel nicer.`,
    followUps: [
      {
        id: "fu-3-1",
        label: "What if I want soft but not warm?",
        userMessage: "What if I want soft but not warm?",
        nextAnswerId: "a-1b-soft-but-cool",
      },
      {
        id: "fu-3-2",
        label: "Does thread count matter more than weave?",
        userMessage: "Does thread count matter more than weave?",
        nextAnswerId: "a-13-thread-count-vs-weave",
      },
    ],
  },

  "a-4-partner-temp-mismatch": {
    id: "a-4-partner-temp-mismatch",
    markdown: `# One sleeps hot, one sleeps cold — best bedding setup

You can solve this without compromising.

## Best approach: split the top layer
- Use **separate duvet inserts** (or separate blankets) so each person gets their preferred warmth
- Keep sheets neutral: breathable and comfortable for both

## Sheet choice (Sijo)
Aim for something that's **breathable** and doesn't trap heat. Then solve warmth with the top layer — it's the easiest lever.

## Bonus tip
If the mattress sleeps hot, a breathable mattress pad can help both of you feel more stable overnight.`,
    followUps: [
      {
        id: "fu-4-1",
        label: "What's the best 'neutral' sheet choice?",
        userMessage: "What's the best neutral sheet choice for both hot and cold sleepers?",
        nextAnswerId: "a-14-neutral-sheet-choice",
      },
      {
        id: "fu-4-2",
        label: "How do we do split duvets without it looking messy?",
        userMessage: "How do we do split duvets without it looking messy?",
        nextAnswerId: "a-15-split-duvet-neat",
      },
    ],
  },

  "a-5-percale-vs-linen": {
    id: "a-5-percale-vs-linen",
    markdown: `# Percale vs linen — which is cooler?

## In general
- **Linen** is often the most breathable and airy.
- **Percale** is crisp and cool-feeling with a smoother surface.

## Choose percale if you want
- Crisp "hotel" feel
- Smoother texture

## Choose linen if you want
- Maximum airflow
- A relaxed, textured feel`,
    followUps: [
      {
        id: "fu-5-1",
        label: "Which is easier to care for?",
        userMessage: "Which is easier to care for?",
        nextAnswerId: "a-16-care-easy",
      },
    ],
  },

  "a-6-thread-count-cooling": {
    id: "a-6-thread-count-cooling",
    markdown: `# Thread count for cooling sheets

Thread count matters less than **weave and material**.

## Practical guidance
- Avoid extremely high thread count if it feels dense — density can reduce airflow.
- Focus on a breathable weave (percale-like) if you run hot.

> If your sheets feel "heavy" or clingy, they'll usually sleep warmer — even with a high thread count.`,
    followUps: [
      {
        id: "fu-6-1",
        label: "What matters most: material or weave?",
        userMessage: "What matters most — material or weave?",
        nextAnswerId: "a-13-thread-count-vs-weave",
      },
    ],
  },

  "a-7-bamboo-vs-lyocell": {
    id: "a-7-bamboo-vs-lyocell",
    markdown: `# Bamboo vs lyocell for cooler sleep

They can be very similar in feel: smooth, drapey, and comfortable for hot sleepers.

## What to optimize for
- **Humidity/night sweats:** pick the one that feels best on your skin and stays breathable
- **Feel preference:** some people prefer a slightly more "crisp" hand-feel, others want silky

## The bigger win
Even perfect sheets can feel warm with a heavy duvet — pairing matters.`,
    followUps: [
      {
        id: "fu-7-1",
        label: "What duvet weight should I pair with this?",
        userMessage: "What duvet weight should I pair with this?",
        nextAnswerId: "a-1c-summer-weight",
      },
    ],
  },

  "a-8-night-sweats-first-fix": {
    id: "a-8-night-sweats-first-fix",
    markdown: `# Night sweats — what to change first

Start with the things that affect heat the most.

## 1) Top layer first
Swap to a lighter insert or quilt — this usually has the biggest impact.

## 2) Sheets second
Choose breathable + moisture-managing sheets that don't trap humidity.

## 3) Mattress third
If your mattress sleeps hot, add a breathable pad (avoid non-breathable barriers).`,
    followUps: [
      {
        id: "fu-8-1",
        label: "Can you recommend a full Sijo setup?",
        userMessage: "Can you recommend a full Sijo setup for hot sleeping?",
        nextAnswerId: "a-9-best-summer-combo",
      },
    ],
  },

  "a-9-best-summer-combo": {
    id: "a-9-best-summer-combo",
    markdown: `# Best Sijo summer combo for cool sleep

Here's a simple, high-confidence setup.

## The combo
- **Breathable sheets** (cool, airy feel)
- **Lightweight top layer** (quilt or light insert)
- Keep a second layer folded at the foot of the bed if you get chilly

## If you prefer crisp
Choose a percale-like sheet feel.

## If you prefer soft
Choose a smooth, moisture-managing sheet feel.`,
    followUps: [
      {
        id: "fu-9-1",
        label: "I want crisp. Show me the exact option.",
        userMessage: "I want crisp — what's the exact option?",
        nextAnswerId: "a-1a-crisp-hotel",
      },
      {
        id: "fu-9-2",
        label: "I want soft. Show me the exact option.",
        userMessage: "I want soft — what's the exact option?",
        nextAnswerId: "a-1b-soft-but-cool",
      },
    ],
  },

  "a-10-why-winter-bedding-hot": {
    id: "a-10-why-winter-bedding-hot",
    markdown: `# Why winter bedding feels hot in summer

Even if your room is cool, thick top layers trap heat and block airflow.

## Common causes
- Heavy duvet insert or high fill weight
- Dense blanket/quilt with low breathability
- Mattress protector that reduces airflow

## Fix
Keep your sheets breathable, then lighten the top layer — it's the fastest change.`,
    followUps: [
      {
        id: "fu-10-1",
        label: "Help me pick a lighter top layer.",
        userMessage: "Help me pick a lighter top layer.",
        nextAnswerId: "a-1c-summer-weight",
      },
    ],
  },

  "a-11-night-sweats-linen-vs-bamboo": {
    id: "a-11-night-sweats-linen-vs-bamboo",
    markdown: `# Linen vs bamboo for night sweats

## If your priority is airflow
**Linen** is extremely breathable and helps reduce that "trapped heat" feeling.

## If your priority is humidity + softness
**Bamboo-derived** fabric is often great at feeling smooth while managing moisture.

> If you hate texture, go bamboo. If you want max airflow, go linen.`,
    followUps: [
      {
        id: "fu-11-1",
        label: "I hate texture — which bamboo-style option?",
        userMessage: "I hate texture — which bamboo-style option should I pick?",
        nextAnswerId: "a-1b-soft-but-cool",
      },
    ],
  },

  "a-12-hate-scratchy": {
    id: "a-12-hate-scratchy",
    markdown: `# I hate scratchy sheets — what should I choose?

Go for **smooth and soft immediately**, then optimize cooling with your top layer.

## Why this works
If you dislike texture, you'll sleep worse even if the fabric is technically "cooler."

## Best direction (Sijo)
Choose a smooth, moisture-managing option and pair it with a lighter insert.`,
    followUps: [
      {
        id: "fu-12-1",
        label: "Ok — what's the soft-but-cool pick?",
        userMessage: "Ok — what's the soft-but-cool pick?",
        nextAnswerId: "a-1b-soft-but-cool",
      },
    ],
  },

  "a-13-thread-count-vs-weave": {
    id: "a-13-thread-count-vs-weave",
    markdown: `# What matters more: thread count or weave?

Weave is usually the bigger factor for cooling.

## Why
- Weave controls airflow and drape
- Dense fabrics can trap heat even with "nice" numbers

## Rule of thumb
If you run hot, prioritize a breathable weave first, then material, then thread count.`,
    followUps: [
      {
        id: "fu-13-1",
        label: "So what should I buy for cool sleep?",
        userMessage: "So what should I buy for cool sleep?",
        nextAnswerId: "a-1-hot-sleepers-overview",
      },
    ],
  },

  "a-14-neutral-sheet-choice": {
    id: "a-14-neutral-sheet-choice",
    markdown: `# Best "neutral" sheet choice for mixed sleepers

Pick something breathable and comfortable, then customize warmth with the top layer.

## Why it works
Sheets are shared — duvets don't have to be.

## Recommendation (Sijo)
Choose a breathable, non-clingy feel so the hot sleeper stays comfortable, then add warmth on one side with a heavier insert.`,
    followUps: [
      {
        id: "fu-14-1",
        label: "What's the split-top-layer setup again?",
        userMessage: "Remind me how to do split top layers.",
        nextAnswerId: "a-4-partner-temp-mismatch",
      },
    ],
  },

  "a-15-split-duvet-neat": {
    id: "a-15-split-duvet-neat",
    markdown: `# Split duvets without it looking messy

## The clean approach
- Use two inserts sized for each person
- Put both inside one duvet cover (if it fits well) OR use two neatly aligned top layers
- Keep the bed looking unified with a single throw or coverlet on top

## Why people like it
You get temperature control without nightly blanket battles.`,
    followUps: [
      {
        id: "fu-15-1",
        label: "Ok—what sheets should we start with?",
        userMessage: "Ok — what sheets should we start with?",
        nextAnswerId: "a-14-neutral-sheet-choice",
      },
    ],
  },

  "a-16-care-easy": {
    id: "a-16-care-easy",
    markdown: `# Care: what's easiest?

## Easiest feel-maintenance
Smooth, soft fabrics tend to feel great right away and stay consistent with basic care.

## Linen note
Linen is easy in a "low fuss" way, but it has a lived-in texture that changes over time.

> If you want predictable softness: go smooth. If you like relaxed texture: linen is great.`,
    followUps: [
      {
        id: "fu-16-1",
        label: "Back to cooling picks — what's best for me?",
        userMessage: "Back to cooling picks — what's best for me?",
        nextAnswerId: "a-1-hot-sleepers-overview",
      },
    ],
  },
};
