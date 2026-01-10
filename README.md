## 🥗 Nutrino — About the Project

### Inspiration

Today, more people than ever care about their **protein intake**, calories, and overall nutrition.  
Whether it’s for fitness, weight management, or general well-being, tracking what we eat has become part of everyday conversation.

But actually, **keeping track of nutrition is extremely difficult**.

Most people eat home-cooked meals, regional dishes, or mixed plates that don’t come with nutrition labels. Tracking each ingredient quickly becomes frustrating and unsustainable.

We were inspired by this gap between **intent and execution**.

 *If so many people care about nutrition, why is tracking it still so hard?*

Nutrino was built to explore whether modern multimodal AI could remove this friction by understanding food the way people naturally describe and consume it, instead of forcing them into rigid logging systems.

---

### What We Built

Nutrino is a **personalized nutrition assistant** powered by **Google Gemini** that understands food through images, natural language, and user context.

Key features:
- **Smart Onboarding**: Collects age, height, weight, goals, dietary preferences, allergies, and region.
- **AI-driven Targets**: Gemini calculates BMR and TDEE and sets daily calorie & macro targets.
- **Flexible Food Logging**:
  -  Photo-based AI analysis (portion size + macros)
  -  Natural language text parsing
  -  Manual entry for precise labels
- **Region-aware Meal Suggestions**: Recipes and suggestions that respect local cuisines, user allergies, and ingredient availability.
- **Meal Details & Reasoning**: Ingredient lists, step-by-step instructions, and an AI-generated explanation of *why* the meal fits the user’s goals.
- **One-tap logging**: Add suggested meals directly to daily logs.

---

### How We Built It

Tech stack & architecture (high-level):
- **Next.js (App Router)** with Server Actions for secure AI calls  
- **React + TypeScript** for UI and type safety  
- **Tailwind CSS** for the “Organic Vitality” design system  
- **Google Gemini 2.0 Flash** for vision, NLP, and contextual reasoning  
- **localStorage** for lightweight persistence during MVP phase

### Development Flow

Nutrino was built through a fast, iterative workflow focused on solving a real problem effectively.

The idea was first validated through **market research**, identifying gaps in existing nutrition apps around manual effort, personalization, and regional food support. Core features and user flows were then **brainstormed using ChatGPT 5.2** to quickly refine scope and functionality.

UI screens were designed with **Google Stitch**, emphasizing a clean, mobile-first experience. Development was carried out using **Google Antigravity**, an agent-first IDE powered by **Gemini 3.0 Pro**, enabling rapid implementation and iteration.

The final prototype was **manually tested end-to-end** to ensure all core features worked smoothly and were ready for demo.

---

### What We Learned

- **AI is most useful when it reasons, not just generates.** Conditioning Gemini on user context (goals, region, allergies) yields far more useful outputs than simple text generation.
- **Small UX improvements have outsized impact.** Allowing photo or natural-language logging reduces friction dramatically compared to manual search-and-select workflows.
- **Cultural context matters.** Recipes that align with users’ regional food habits feel more realistic and are more likely to be adopted.

---

### Challenges We Faced

- **Ambiguity in photos and text.** Estimating portions and parsing casual descriptions required careful prompt design and validation.
- **Serverless cold starts.** Initial Gemini calls can be slow on first request; we mitigated this with clear loading states and by recommending a quick warm-up step before demos.
- **Balancing speed and accuracy.** We prioritized reliable, explainable outputs over aggressive optimization during the hackathon.

---

### Closing Thoughts

Nutrino is an attempt to make nutrition tracking **sustainable and human-friendly**. By combining multimodal AI with user context and regional awareness, we move closer to a tool that helps people eat better, without making them think harder.
