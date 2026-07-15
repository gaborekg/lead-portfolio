# Lead Portfolio — Design Document

**Date:** 2026-07-15
**Status:** Draft for review

---

## 1. Overview

A personal portfolio website for Gábor Gayà, framed around **leadership roles and
impact** (hence "Lead Portfolio"). It is a polished, credibility-focused home base —
the kind of link you put in a LinkedIn bio or share with peers — not a hard "hire me"
funnel and not a gallery of project case studies.

The site is a single, quiet, top-to-bottom read (About → Experience → Contact) plus a
separate Legal page. Visually it reproduces the look and feel of Gábor's existing site
exactly: monospaced type, a two-column label/content grid, muted slate text on a cool
off-white background, with a single burnt-orange accent.

This project is **fully self-contained** and independent of any other project.

## 2. Goals

- Establish who Gábor is and what he does, credibly and at a glance.
- Present five leadership experiences in a consistent, scannable structure.
- Reproduce the existing visual identity precisely.
- Be something Gábor (an early-stage coder) can read, understand, and maintain — no
  build step, no framework.
- Host for free and load fast.

## 3. Non-Goals

- No project case studies (deliberately dropped from the old site).
- No contact form, no analytics, no reCAPTCHA, no cookies, no JavaScript framework.
- No CMS or dynamic data — content is authored directly in HTML.

## 4. Architecture

Two static pages, no build step:

- `index.html` — the entire narrative on one scrolling page.
- `legal.html` — Impressum, Privacy Policy, and legal notice.

A slim top navigation offers quick jumps: **About · Experience · Contact · CV**.

```
lead-portfolio/
├── index.html          # main scrolling page
├── legal.html          # Impressum / Privacy Policy
├── styles.css          # single shared stylesheet
├── cv.pdf              # downloadable CV (provided by Gábor)
├── assets/
│   └── portrait.jpg    # circular duotone portrait (provided by Gábor)
└── fonts/              # self-hosted IBM Plex Mono (woff2)
    ├── IBMPlexMono-Regular.woff2
    └── IBMPlexMono-Italic.woff2
```

**Why plain HTML/CSS:** the site is content-first with no dynamic behavior. A framework
would insert build tools and abstractions between the author and the rendered page,
which adds learning overhead and no benefit here. What you write is what the browser
runs.

## 5. Visual System (locked to the existing site)

Extracted precisely from a screenshot of the current site.

### Design tokens

| Token            | Value      | Use                                          |
|------------------|------------|----------------------------------------------|
| `--bg`           | `#F7F8F9`  | cool off-white page background               |
| `--text`         | `#5B6174`  | muted slate-blue, all body/content copy      |
| `--accent`       | `#DB5E27`  | burnt orange — italic labels and links       |

Defined as CSS custom properties on `:root` so a color is never hardcoded twice.

### Typography

- **Font:** IBM Plex Mono (SIL Open Font License), **self-hosted** as woff2 (regular +
  italic). Self-hosting guarantees the exact match and avoids any external dependency.
- Monospaced throughout. Labels are set in *italic*; content is regular.
- Generous line-height and vertical spacing between blocks; everything left-aligned.

### Signature pattern — the label/content grid

The entire site is built from **one repeating pattern**: a two-column row where a short
*italic orange label* sits on the left and slate content sits on the right. This single
pattern — used for the hero facts and for every experience field — is what makes the
site feel like one designed system rather than assembled parts.

- Implemented with CSS grid (e.g. a narrow label column + a flexible content column).
- The portrait is a circle with a warm-orange duotone tint, sitting above the hero.

## 6. Page Content & Structure

### 6.1 About (hero) — reproduces the screenshot exactly

Circular duotone portrait, then label/content rows:

- **Hey!** — I'm Gábor Gayà, Product & Strategy Lead.
- **About** —
  > I bring over a decade of entrepreneurial experience, driven by a passion for
  > innovative problem-solving and strategic thinking.
  >
  > My strengths lie in navigating ambiguity, connecting people around a shared vision,
  > and turning complex challenges into practical solutions.
- **Before** — Conceptual Artist & Vermibus Studio Founder (12 yrs)
- **Now** — Track Lead at Spiced Academy & Neue Fische
- **Where** — Berlin, Germany

### 6.2 Experience & Impact

Each role reuses the label/content grid with the labels **Company · Summary ·
Key Outcomes · Leadership Scope**. There is one primary pattern and two graceful
variations, producing a natural rhythm (four deep entries, then a lighter closing
roundup).

**Primary pattern** — used by roles 1–3. Full content below.

**Variation A (Vermibus Studio)** — adds a `Speaking` label block after Leadership
Scope for the selected speaking engagements.

**Variation B (Selected Early Experiences)** — a lighter "roundup": a grouped set of
companies under one Summary, with Key Outcomes split by company name. Closes the section
on a quieter note.

---

#### Role 1 — Neue Fische & Spiced Academy · UX/UI Department Lead

**Company** — Neue Fische is a German tech bootcamp delivering intensive,
career-focused training in digital and technology disciplines.

**Summary** — Led the UX/UI department following the merger of Spiced Academy and Neue
Fische, focusing on organizational stability, operational excellence, and AI-driven
educational innovation.

**Key Outcomes**
- Led a department of 12 core team members & 8 freelancers through a post-restructuring
  phase, stabilizing operations, improving team performance, and rebuilding team cohesion.
- Rebuilt 50% of the department through strategic hiring, optimizing team structure
  across a €650k+ budget.
- Defined & launched an AI-native educational product, aligning eight cross-functional
  teams.

**Leadership Scope**
- **Strategy & Department Leadership** — Define the department's strategic direction,
  growth priorities, and operational roadmap, aligning initiatives with broader business
  objectives.
- **People & Organizational Development** — Lead workforce planning, hiring, performance
  management, and coaching while building a resilient, high-performing teaching
  organization.
- **Operations & Financial Management** — Co-manage a **€650k+ departmental budget**,
  overseeing operations, resource planning, tooling, and administrative processes.
- **Curriculum & Learning Strategy** — Oversee curriculum architecture, new content
  initiatives, and pedagogical development, ensuring quality, consistency, and long-term
  scalability across programs.
- **Operational Excellence** — Provide final oversight on curriculum quality and
  educational systems while supporting program delivery when operational needs require.

#### Role 2 — Spiced Academy · Cohort Lead

**Company** — Spiced Academy is a brand from Neuefische. We train, upskill and reskill
new tech talents every day, helping professionals translate their previous experiences
and strengths to practice-oriented, in-demand digital skills.

**Summary** — Combined teaching, mentoring, and operational leadership to deliver
high-quality UX/UI education while creating new learning experiences and improving
program scalability.

**Key Outcomes**
- Developed and launched the "AI for UX/UI Designers" module, establishing the
  curriculum framework used by multiple instructors to train 250+ students.
- Led and mentored 100+ students, supporting professional growth and career development.

**Leadership Scope**
- **Student Experience & Cohort Leadership** — Own cohort delivery, mentoring,
  facilitation, conflict resolution, and student success throughout the learning journey.
- **Operations & Quality Management** — Manage daily cohort operations, student
  communication, evaluations, documentation, and continuous program improvements.
- **Curriculum & Learning Development** — Drive curriculum iterations, LMS improvements,
  and educational content development to improve program quality and scalability.
- **Team Collaboration & Development** — Support onboarding and coordination of teaching
  assistants and junior staff while reviewing feedback quality and teaching consistency
  across instructors.

#### Role 3 — BeatSquares · UX Lead

**Company** — BeatSquares is a B2B SaaS startup helping local journalists increase the
reach and impact of their investigations by connecting stories with relevant audiences
and delivery formats.

**Summary** — Led UX for the initial product, translating the founder's vision into a
validated solution by shaping product direction, defining user needs, and supporting
early customer adoption.

**Key Outcomes**
- Led UX for the initial product, contributing to the product foundation that supported
  the acquisition of NOZ and Süddeutsche Zeitung as the company's first clients.
- Designed validation frameworks, analyzed user insights, and prioritized product
  opportunities to guide decision-making.

**Leadership Scope**
- **Product Discovery & Strategy** — Defined user hypotheses, validated assumptions, and
  translated insights into product priorities.
- **UX Leadership** — Owned UX direction for the initial product, shaping user flows,
  experiences, and design decisions.
- **Research & Validation** — Conducted user research with journalists to identify
  opportunities and refine the product strategy.

#### Role 4 — Vermibus Studio *(Variation A: adds Speaking)*

**Company** — Vermibus Studio is an independent creative practice founded and led by
artist Vermibus, focused on large-scale public interventions and cultural projects
across Europe.

**Summary** — Built and managed an independent creative venture, leading large-scale
projects from concept to execution while developing partnerships, managing stakeholders,
and growing an internationally recognized brand.

**Key Outcomes**
- Built an internationally recognized creative brand from the ground up, with work
  showcased in museums, galleries, and cultural institutions across Europe and the US.
- Led end-to-end project strategy and execution, managing partnerships, budgets,
  logistics, communications, and brand development.
- Managed complex stakeholder networks including press, cultural institutions,
  galleries, and private collectors while delivering projects in dynamic environments.

**Leadership Scope**
- **Entrepreneurial & Strategic Leadership** — Owned the vision, positioning, and
  long-term development of an independent creative brand.
- **Stakeholder & Partnership Management** — Built and maintained relationships with
  cultural institutions, galleries, media, collectors, and collaborators.
- **Project & Operations Management** — Managed complex projects from concept development
  through execution, balancing creative direction, logistics, budgets, and timelines.

**Speaking** — Delivered conferences and masterclasses at institutions and events
including Museum Reina Sofía (Madrid), See Conference (Wiesbaden), Forward Festivals
(Hamburg & Vienna), Design Matters (Breda & The Hague), In4Art (Amsterdam), La Casa
Encendida (Madrid), and Moniker Art Fair (London & NYC).

#### Role 5 — Selected Early Experiences *(Variation B: grouped roundup)*

**Companies**
- **Tekkr** — a B2B SaaS startup providing playbooks and resources for leaders in
  VC-backed technology companies.
- **Ironhack** — an intensive tech bootcamp providing hands-on B2C courses in
  high-demand tech skills.
- **Junges Netzwerk** — a non-profit organization fostering cultural connections between
  Germany and South America.

**Summary** — Supported early-stage startups, non-profits, and tech education
initiatives through UX research, MVP development, product discovery, and stakeholder
collaboration.

**Key Outcomes**
- *Tekkr & Junges Netzwerk* — Conceptualized diverse products from idea to MVP;
  identified critical flaws and outdated assumptions, redirecting project direction;
  conducted multiple user interviews with end users, SMEs & decision-makers.
- *Ironhack* — Supported UX/UI education delivery through workshops, one-on-one
  sessions, and design reviews, providing personalized feedback to improve student
  understanding.

### 6.3 Contact

Label/content rows in the same style:

- **Email** — `gaborgaya@gmail.com` (mailto link, in accent color).
- **LinkedIn** — link *(URL to be provided by Gábor).*
- **CV** — downloadable PDF (`cv.pdf`) *(file to be provided by Gábor).*

### 6.4 Legal (`legal.html`)

Same styling as the main page, a comfortable single-column reading measure. Contains the
Impressum, Privacy Policy, and legal notice text provided by Gábor, with two deliberate
adaptations so the document describes the *actual* site:

- **Hosting section:** rewritten from Squarespace to **Netlify** (the intended host).
  The exact provider entity/address is finalized at deploy time. If a different host is
  chosen, this paragraph is updated to match before going live.
- **Removed:** the Google reCAPTCHA and contact-form paragraphs — the site has neither.

The **"responsible party" block** is kept as the official legal record, with the email
updated to the single address used across the whole site:

> Gabor Gaya · Berlinickestr. 4 · 12165 Berlin · Phone: +49 15251697425 ·
> Email: gaborgaya@gmail.com

**One email everywhere:** `gaborgaya@gmail.com` is used for both the Contact section and
the legal responsible-party block. The alternate address from the original legal text is
**not** used anywhere on the site.

> **Not legal advice.** This reproduces and lightly adapts text Gábor supplied. Gábor is
> responsible for the legal accuracy of the final Impressum/Privacy Policy.

## 7. Responsive Behavior

- **Desktop:** two-column label/content grid as shown in the reference.
- **Mobile:** the grid **stacks** — each label sits directly above its content — keeping
  the monospaced lines readable without horizontal scrolling. Final breakpoint tuning is
  confirmed against Gábor's mobile screenshot.
- Fluid measure with sensible `max-width` so long lines never sprawl on wide screens.

## 8. Accessibility

- Semantic HTML landmarks (`header`, `nav`, `main`, `section`, `footer`) and a logical
  heading order.
- Portrait image has descriptive `alt` text.
- Check text/background contrast for the slate `--text` on `#F7F8F9`; darken slightly if
  it does not meet WCAG AA for body text.
- Nav quick-jumps are real in-page anchor links; keyboard focus states are visible.

## 9. Hosting & Deployment

- Static files hosted free on **Netlify** (drag-and-drop deploy) or GitHub Pages.
- No secrets, no environment configuration, no server.
- The chosen host is reflected in the Legal page's hosting paragraph before launch.

## 10. Open Items (assets Gábor will provide)

- ~~CV PDF (`cv.pdf`)~~ ✅ provided — in project root.
- Portrait image (for `assets/portrait.jpg`).
- LinkedIn profile URL.
- Desktop full-page + mobile screenshots (to fine-tune spacing/breakpoints).
- Confirmation of the final host (default: Netlify).
