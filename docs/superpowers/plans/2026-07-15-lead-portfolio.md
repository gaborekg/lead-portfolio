# Lead Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a leadership-focused personal portfolio as a two-page static site that reproduces the existing site's look and feel exactly.

**Architecture:** Two hand-written static HTML pages (`index.html`, `legal.html`) sharing one stylesheet (`styles.css`). No build step, no JavaScript, no framework. The whole visual system is one repeating "label/content grid" pattern driven by three CSS custom-property color tokens and self-hosted IBM Plex Mono.

**Tech Stack:** HTML5, CSS3 (custom properties, CSS grid), self-hosted IBM Plex Mono (woff2). Hosted free on Netlify.

## Global Constraints

Every task's requirements implicitly include these. Values copied verbatim from the spec.

- Plain HTML + CSS only. No JavaScript framework, no build tooling, no CMS, no analytics, no cookies, no contact form, no reCAPTCHA.
- Font: **IBM Plex Mono**, self-hosted as woff2 (regular + italic). SIL OFL.
- Color tokens (define once on `:root`, never hardcode a color twice):
  - `--bg: #F7F8F9;`
  - `--text: #5B6174;`
  - `--accent: #DB5E27;`
- Email everywhere is **`gaborgaya@gmail.com`**. The address `info@gaborgaya.com` must appear **nowhere** in any file.
- Signature pattern: two-column grid — small *italic* accent label (left), slate content (right). On mobile it stacks (label above content).
- Semantic HTML landmarks (`header`, `nav`, `main`, `section`, `footer`); logical heading order; visible keyboard focus states; descriptive `alt` text.
- Content is authored directly in HTML. Verbatim role copy lives in the spec: `docs/superpowers/specs/2026-07-15-lead-portfolio-design.md` §6.
- Project is self-contained; do not reference or import from any other project.

---

## File Structure

```
lead-portfolio/
├── index.html          # Tasks 2–5: hero, experience, contact, nav, footer
├── legal.html          # Task 6: Impressum / Privacy Policy
├── styles.css          # Task 1–7: single shared stylesheet
├── cv.pdf              # already present (provided)
├── favicon.svg         # Task 7
├── assets/
│   └── portrait.jpg    # placeholder in Task 2; real image swapped in when provided
└── fonts/              # Task 1: self-hosted IBM Plex Mono
    ├── IBMPlexMono-Regular.woff2
    └── IBMPlexMono-Italic.woff2
```

---

## Task 1: Foundation — fonts, tokens, base styles

**Files:**
- Create: `fonts/IBMPlexMono-Regular.woff2`, `fonts/IBMPlexMono-Italic.woff2`
- Create: `styles.css`
- Create: `index.html` (temporary smoke-test content, replaced in Task 2)

**Interfaces:**
- Produces: the CSS token names `--bg`, `--text`, `--accent`; the `IBM Plex Mono` font-family; base `body` typography that all later tasks inherit.

- [ ] **Step 1: Fetch the self-hosted font files**

```bash
cd /Users/gabor/lead-portfolio
mkdir -p fonts assets
curl -fsSL -o fonts/IBMPlexMono-Regular.woff2 \
  https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2
curl -fsSL -o fonts/IBMPlexMono-Italic.woff2 \
  https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-italic.woff2
```

Fallback if the CDN is unreachable: download IBM Plex Mono from https://fonts.google.com/specimen/IBM+Plex+Mono (Regular 400 + Italic 400), convert the `.ttf` to `.woff2`, and place with the exact filenames above.

- [ ] **Step 2: Verify the font files are real woff2 binaries**

Run:
```bash
file fonts/IBMPlexMono-Regular.woff2 fonts/IBMPlexMono-Italic.woff2
```
Expected: each line reports `Web Open Font Format (Version 2)` (or `WOFF2`). If it says `HTML` or `ASCII text`, the download failed — re-fetch.

- [ ] **Step 3: Write `styles.css` foundation**

```css
/* ---- Fonts ---------------------------------------------------------- */
@font-face {
  font-family: "IBM Plex Mono";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("fonts/IBMPlexMono-Regular.woff2") format("woff2");
}
@font-face {
  font-family: "IBM Plex Mono";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("fonts/IBMPlexMono-Italic.woff2") format("woff2");
}

/* ---- Tokens --------------------------------------------------------- */
:root {
  --bg: #F7F8F9;
  --text: #5B6174;
  --accent: #DB5E27;

  --measure: 60rem;          /* max content width */
  --label-col: 7.5rem;       /* label column width on desktop */
  --row-gap: 2.75rem;        /* vertical rhythm between rows */
  --mono: "IBM Plex Mono", ui-monospace, "Cascadia Mono", Menlo, monospace;
}

/* ---- Reset / base --------------------------------------------------- */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--mono);
  font-size: 1.0625rem;      /* ~17px */
  line-height: 1.75;
  padding: clamp(1.5rem, 5vw, 4rem);
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
img { max-width: 100%; display: block; }
```

- [ ] **Step 4: Write a temporary smoke-test `index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lead Portfolio — smoke test</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <p><em style="color:var(--accent)">Hey!</em> The quick brown fox — Gábor Gayà, á í ü é.</p>
  <p>1234567890 — background #F7F8F9, text #5B6174, accent #DB5E27.</p>
</body>
</html>
```

- [ ] **Step 5: Verify in a browser**

Open `index.html` in a browser (e.g. `open index.html` on macOS). Confirm:
- Text renders in a **monospaced** typeface (all glyphs equal width), not the system default.
- The word "Hey!" is **burnt orange** and italic; body text is muted slate; page background is near-white.
- Accented characters (á, í, ü, é) display correctly.

- [ ] **Step 6: Commit**

```bash
git add fonts styles.css index.html
git commit -m "Add font, color tokens, and base styles"
```

---

## Task 2: Signature label/content grid + About hero

**Files:**
- Modify: `styles.css` (append grid + hero + portrait styles)
- Modify: `index.html` (replace smoke-test body with real hero)
- Create: `assets/portrait.jpg` (placeholder)

**Interfaces:**
- Consumes: tokens and base body from Task 1.
- Produces: the reusable classes `.wrap`, `.row`, `.row__label`, `.row__body`, `.portrait`, and the `<section id="about">` structure that Tasks 3–5 reuse.

- [ ] **Step 1: Create a placeholder portrait**

```bash
cd /Users/gabor/lead-portfolio
# 240x240 solid-tint placeholder so layout can be verified before the real photo arrives
printf '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="240" height="240" fill="%23DB5E27" opacity="0.5"/></svg>' > assets/portrait.svg
```
Note: reference `assets/portrait.svg` in HTML for now; swap to `assets/portrait.jpg` when Gábor provides the real duotone photo (update the `src` and `alt`).

- [ ] **Step 2: Append grid + hero CSS to `styles.css`**

```css
/* ---- Layout container ---------------------------------------------- */
.wrap { max-width: var(--measure); margin: 0 auto; }

/* ---- Signature label/content grid ---------------------------------- */
.row {
  display: grid;
  grid-template-columns: var(--label-col) 1fr;
  gap: 0 1.5rem;
  margin-bottom: var(--row-gap);
}
.row__label {
  font-style: italic;
  color: var(--accent);
  white-space: nowrap;
}
.row__body > * { margin: 0 0 1rem; }
.row__body > *:last-child { margin-bottom: 0; }

/* ---- Portrait ------------------------------------------------------- */
.portrait {
  width: 92px; height: 92px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2.5rem;
}

/* ---- Hero sizing ---------------------------------------------------- */
#about .row:first-of-type .row__body { font-size: 1.25rem; line-height: 1.5; }

/* ---- Mobile: stack the grid ---------------------------------------- */
@media (max-width: 640px) {
  .row { grid-template-columns: 1fr; gap: 0.25rem 0; }
  .row__label { margin-bottom: 0.25rem; }
}
```

- [ ] **Step 3: Replace `index.html` body with the real hero**

Use the exact copy from spec §6.1. Full markup:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gábor Gayà — Product & Strategy Lead</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="wrap">
    <section id="about">
      <img class="portrait" src="assets/portrait.svg" alt="Portrait of Gábor Gayà">

      <div class="row">
        <div class="row__label">Hey!</div>
        <div class="row__body">
          <p>I'm Gábor Gayà,<br>Product &amp; Strategy Lead.</p>
        </div>
      </div>

      <div class="row">
        <div class="row__label">About</div>
        <div class="row__body">
          <p>I bring over a decade of entrepreneurial experience, driven by a passion for innovative problem-solving and strategic thinking.</p>
          <p>My strengths lie in navigating ambiguity, connecting people around a shared vision, and turning complex challenges into practical solutions.</p>
        </div>
      </div>

      <div class="row">
        <div class="row__label">Before</div>
        <div class="row__body"><p>Conceptual Artist &amp; Vermibus Studio Founder (12 yrs)</p></div>
      </div>

      <div class="row">
        <div class="row__label">Now</div>
        <div class="row__body"><p>Track Lead at Spiced Academy &amp; Neue Fische</p></div>
      </div>

      <div class="row">
        <div class="row__label">Where</div>
        <div class="row__body"><p>Berlin, Germany</p></div>
      </div>
    </section>
  </main>
</body>
</html>
```

- [ ] **Step 4: Verify against the reference screenshot**

Open `index.html`. Confirm it matches the About screenshot: labels (`Hey!`, `About`, `Before`, `Now`, `Where`) in italic orange on the left, slate content on the right, circular portrait on top, generous spacing. Resize the window narrow (<640px) and confirm labels stack above their content.

- [ ] **Step 5: Commit**

```bash
git add styles.css index.html assets/portrait.svg
git commit -m "Add label/content grid and About hero"
```

---

## Task 3: Header, navigation, and page shell

**Files:**
- Modify: `index.html` (add `<header>`/`<nav>` above `<main>`)
- Modify: `styles.css` (nav styles)

**Interfaces:**
- Consumes: tokens from Task 1; `.wrap` from Task 2.
- Produces: anchor targets `#about`, `#experience`, `#contact` that Tasks 4–5 must define as section `id`s; the `.nav` styling reused by `legal.html`.

- [ ] **Step 1: Append nav CSS**

```css
/* ---- Top navigation ------------------------------------------------- */
.nav {
  max-width: var(--measure);
  margin: 0 auto 3.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  font-style: italic;
}
.nav a { color: var(--accent); }
```

- [ ] **Step 2: Add the header/nav to `index.html`**

Insert immediately after `<body>`, before `<main>`:

```html
  <header>
    <nav class="nav" aria-label="Primary">
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#contact">Contact</a>
      <a href="cv.pdf">CV</a>
    </nav>
  </header>
```

- [ ] **Step 3: Verify**

Open `index.html`. Confirm the nav appears at the top with four orange italic links. Click **About** → page stays at hero (anchor resolves). Click **CV** → the PDF opens. (Experience/Contact anchors are wired in Tasks 4–5.)

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add top navigation and page header"
```

---

## Task 4: Experience & Impact section

**Files:**
- Modify: `index.html` (add `<section id="experience">` after About)
- Modify: `styles.css` (role-entry spacing, sub-blocks)

**Interfaces:**
- Consumes: `.row`, `.row__label`, `.row__body` from Task 2.
- Produces: `#experience` anchor target used by the nav.

Content is verbatim from spec §6.2. Reuse the `.row` pattern for every field. A role is a `<section class="role">` containing rows for **Company · Summary · Key Outcomes · Leadership Scope** (plus **Speaking** for Vermibus).

- [ ] **Step 1: Append role CSS**

```css
/* ---- Experience ----------------------------------------------------- */
#experience { margin-top: 5rem; }
.section-title { font-style: italic; color: var(--accent); margin: 0 0 2.5rem; font-weight: 400; }
.role { margin-bottom: 4.5rem; padding-top: 3rem; border-top: 1px solid var(--accent); }
.role h3 { color: var(--text); font-weight: 400; font-size: 1.15rem; margin: 0 0 2rem; }
.role ul { margin: 0; padding-left: 1.25rem; }
.role li { margin-bottom: 0.75rem; }
.role li:last-child { margin-bottom: 0; }
.scope-item { margin-bottom: 1.25rem; }
.scope-item strong { color: var(--text); }
```

- [ ] **Step 2: Add the Experience section HTML**

Insert after the closing `</section>` of `#about`, inside `<main>`. Full markup with real content:

```html
    <section id="experience">
      <h2 class="section-title">Experience &amp; Impact</h2>

      <!-- Role 1 -->
      <section class="role">
        <h3>Neue Fische &amp; Spiced Academy — UX/UI Department Lead</h3>
        <div class="row"><div class="row__label">Company</div>
          <div class="row__body"><p>Neue Fische is a German tech bootcamp delivering intensive, career-focused training in digital and technology disciplines.</p></div></div>
        <div class="row"><div class="row__label">Summary</div>
          <div class="row__body"><p>Led the UX/UI department following the merger of Spiced Academy and Neue Fische, focusing on organizational stability, operational excellence, and AI-driven educational innovation.</p></div></div>
        <div class="row"><div class="row__label">Key Outcomes</div>
          <div class="row__body"><ul>
            <li>Led a department of 12 core team members &amp; 8 freelancers through a post-restructuring phase, stabilizing operations, improving team performance, and rebuilding team cohesion.</li>
            <li>Rebuilt 50% of the department through strategic hiring, optimizing team structure across a €650k+ budget.</li>
            <li>Defined &amp; launched an AI-native educational product, aligning eight cross-functional teams.</li>
          </ul></div></div>
        <div class="row"><div class="row__label">Leadership Scope</div>
          <div class="row__body">
            <p class="scope-item"><strong>Strategy &amp; Department Leadership</strong><br>Define the department's strategic direction, growth priorities, and operational roadmap, aligning initiatives with broader business objectives.</p>
            <p class="scope-item"><strong>People &amp; Organizational Development</strong><br>Lead workforce planning, hiring, performance management, and coaching while building a resilient, high-performing teaching organization.</p>
            <p class="scope-item"><strong>Operations &amp; Financial Management</strong><br>Co-manage a €650k+ departmental budget, overseeing operations, resource planning, tooling, and administrative processes.</p>
            <p class="scope-item"><strong>Curriculum &amp; Learning Strategy</strong><br>Oversee curriculum architecture, new content initiatives, and pedagogical development, ensuring quality, consistency, and long-term scalability across programs.</p>
            <p class="scope-item"><strong>Operational Excellence</strong><br>Provide final oversight on curriculum quality and educational systems while supporting program delivery when operational needs require.</p>
          </div></div>
      </section>

      <!-- Role 2 -->
      <section class="role">
        <h3>Spiced Academy — Cohort Lead</h3>
        <div class="row"><div class="row__label">Company</div>
          <div class="row__body"><p>Spiced Academy is a brand from Neuefische. We train, upskill and reskill new tech talents every day, helping professionals translate their previous experiences and strengths to practice-oriented, in-demand digital skills.</p></div></div>
        <div class="row"><div class="row__label">Summary</div>
          <div class="row__body"><p>Combined teaching, mentoring, and operational leadership to deliver high-quality UX/UI education while creating new learning experiences and improving program scalability.</p></div></div>
        <div class="row"><div class="row__label">Key Outcomes</div>
          <div class="row__body"><ul>
            <li>Developed and launched the "AI for UX/UI Designers" module, establishing the curriculum framework used by multiple instructors to train 250+ students.</li>
            <li>Led and mentored 100+ students, supporting professional growth and career development.</li>
          </ul></div></div>
        <div class="row"><div class="row__label">Leadership Scope</div>
          <div class="row__body">
            <p class="scope-item"><strong>Student Experience &amp; Cohort Leadership</strong><br>Own cohort delivery, mentoring, facilitation, conflict resolution, and student success throughout the learning journey.</p>
            <p class="scope-item"><strong>Operations &amp; Quality Management</strong><br>Manage daily cohort operations, student communication, evaluations, documentation, and continuous program improvements.</p>
            <p class="scope-item"><strong>Curriculum &amp; Learning Development</strong><br>Drive curriculum iterations, LMS improvements, and educational content development to improve program quality and scalability.</p>
            <p class="scope-item"><strong>Team Collaboration &amp; Development</strong><br>Support onboarding and coordination of teaching assistants and junior staff while reviewing feedback quality and teaching consistency across instructors.</p>
          </div></div>
      </section>

      <!-- Role 3 -->
      <section class="role">
        <h3>BeatSquares — UX Lead</h3>
        <div class="row"><div class="row__label">Company</div>
          <div class="row__body"><p>BeatSquares is a B2B SaaS startup helping local journalists increase the reach and impact of their investigations by connecting stories with relevant audiences and delivery formats.</p></div></div>
        <div class="row"><div class="row__label">Summary</div>
          <div class="row__body"><p>Led UX for the initial product, translating the founder's vision into a validated solution by shaping product direction, defining user needs, and supporting early customer adoption.</p></div></div>
        <div class="row"><div class="row__label">Key Outcomes</div>
          <div class="row__body"><ul>
            <li>Led UX for the initial product, contributing to the product foundation that supported the acquisition of NOZ and Süddeutsche Zeitung as the company's first clients.</li>
            <li>Designed validation frameworks, analyzed user insights, and prioritized product opportunities to guide decision-making.</li>
          </ul></div></div>
        <div class="row"><div class="row__label">Leadership Scope</div>
          <div class="row__body">
            <p class="scope-item"><strong>Product Discovery &amp; Strategy</strong><br>Defined user hypotheses, validated assumptions, and translated insights into product priorities.</p>
            <p class="scope-item"><strong>UX Leadership</strong><br>Owned UX direction for the initial product, shaping user flows, experiences, and design decisions.</p>
            <p class="scope-item"><strong>Research &amp; Validation</strong><br>Conducted user research with journalists to identify opportunities and refine the product strategy.</p>
          </div></div>
      </section>

      <!-- Role 4 — Vermibus (adds Speaking) -->
      <section class="role">
        <h3>Vermibus Studio</h3>
        <div class="row"><div class="row__label">Company</div>
          <div class="row__body"><p>Vermibus Studio is an independent creative practice founded and led by artist Vermibus, focused on large-scale public interventions and cultural projects across Europe.</p></div></div>
        <div class="row"><div class="row__label">Summary</div>
          <div class="row__body"><p>Built and managed an independent creative venture, leading large-scale projects from concept to execution while developing partnerships, managing stakeholders, and growing an internationally recognized brand.</p></div></div>
        <div class="row"><div class="row__label">Key Outcomes</div>
          <div class="row__body"><ul>
            <li>Built an internationally recognized creative brand from the ground up, with work showcased in museums, galleries, and cultural institutions across Europe and the US.</li>
            <li>Led end-to-end project strategy and execution, managing partnerships, budgets, logistics, communications, and brand development.</li>
            <li>Managed complex stakeholder networks including press, cultural institutions, galleries, and private collectors while delivering projects in dynamic environments.</li>
          </ul></div></div>
        <div class="row"><div class="row__label">Leadership Scope</div>
          <div class="row__body">
            <p class="scope-item"><strong>Entrepreneurial &amp; Strategic Leadership</strong><br>Owned the vision, positioning, and long-term development of an independent creative brand.</p>
            <p class="scope-item"><strong>Stakeholder &amp; Partnership Management</strong><br>Built and maintained relationships with cultural institutions, galleries, media, collectors, and collaborators.</p>
            <p class="scope-item"><strong>Project &amp; Operations Management</strong><br>Managed complex projects from concept development through execution, balancing creative direction, logistics, budgets, and timelines.</p>
          </div></div>
        <div class="row"><div class="row__label">Speaking</div>
          <div class="row__body"><p>Delivered conferences and masterclasses at institutions and events including Museum Reina Sofía (Madrid), See Conference (Wiesbaden), Forward Festivals (Hamburg &amp; Vienna), Design Matters (Breda &amp; The Hague), In4Art (Amsterdam), La Casa Encendida (Madrid), and Moniker Art Fair (London &amp; NYC).</p></div></div>
      </section>

      <!-- Role 5 — Selected Early Experiences (grouped roundup) -->
      <section class="role">
        <h3>Selected Early Experiences</h3>
        <div class="row"><div class="row__label">Companies</div>
          <div class="row__body"><ul>
            <li><strong>Tekkr</strong> — a B2B SaaS startup providing playbooks and resources for leaders in VC-backed technology companies.</li>
            <li><strong>Ironhack</strong> — an intensive tech bootcamp providing hands-on B2C courses in high-demand tech skills.</li>
            <li><strong>Junges Netzwerk</strong> — a non-profit organization fostering cultural connections between Germany and South America.</li>
          </ul></div></div>
        <div class="row"><div class="row__label">Summary</div>
          <div class="row__body"><p>Supported early-stage startups, non-profits, and tech education initiatives through UX research, MVP development, product discovery, and stakeholder collaboration.</p></div></div>
        <div class="row"><div class="row__label">Key Outcomes</div>
          <div class="row__body">
            <p class="scope-item"><strong>Tekkr &amp; Junges Netzwerk</strong><br>Conceptualized diverse products from idea to MVP; identified critical flaws and outdated assumptions, redirecting project direction; conducted multiple user interviews with end users, SMEs &amp; decision-makers.</p>
            <p class="scope-item"><strong>Ironhack</strong><br>Supported UX/UI education delivery through workshops, one-on-one sessions, and design reviews, providing personalized feedback to improve student understanding.</p>
          </div></div>
      </section>
    </section>
```

- [ ] **Step 3: Verify content and structure**

Run this check to confirm all five roles and the special blocks are present:
```bash
cd /Users/gabor/lead-portfolio
grep -c 'class="role"' index.html          # expect 5
grep -c 'Leadership Scope' index.html       # expect 4 (roles 1-4; role 5 has no Scope)
grep -c '>Speaking<' index.html             # expect 1 (Vermibus only)
```
Then open `index.html`: scroll to Experience, confirm each role shows Company/Summary/Key Outcomes/Leadership Scope in the label grid, Vermibus has a Speaking block, and "Selected Early Experiences" groups the three companies. Click nav **Experience** → jumps to the section.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add Experience & Impact section with all five roles"
```

---

## Task 5: Contact section + footer

**Files:**
- Modify: `index.html` (add `<section id="contact">` and `<footer>`)
- Modify: `styles.css` (footer style)

**Interfaces:**
- Consumes: `.row` pattern; `#contact` anchor from nav.
- Produces: footer with link to `legal.html` (created in Task 6).

- [ ] **Step 1: Append footer CSS**

```css
/* ---- Contact & footer ---------------------------------------------- */
#contact { margin-top: 5rem; }
footer {
  max-width: var(--measure);
  margin: 5rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid var(--accent);
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: space-between;
  font-style: italic;
}
```

- [ ] **Step 2: Add Contact section + footer to `index.html`**

Insert the Contact `<section>` after `#experience` (still inside `<main>`), and the `<footer>` after the closing `</main>`. LinkedIn URL is not yet provided — use `#` and add a `TODO` comment so it is unmissable at review; replace when Gábor supplies it.

```html
    <section id="contact">
      <h2 class="section-title">Contact</h2>
      <div class="row"><div class="row__label">Email</div>
        <div class="row__body"><p><a href="mailto:gaborgaya@gmail.com">gaborgaya@gmail.com</a></p></div></div>
      <!-- TODO: replace href="#" with real LinkedIn URL when provided -->
      <div class="row"><div class="row__label">LinkedIn</div>
        <div class="row__body"><p><a href="#">linkedin.com/in/…</a></p></div></div>
      <div class="row"><div class="row__label">CV</div>
        <div class="row__body"><p><a href="cv.pdf">Download CV (PDF)</a></p></div></div>
    </section>
  </main>

  <footer class="wrap">
    <span>© <span>Gábor Gayà</span> 2026</span>
    <a href="legal.html">Legal</a>
  </footer>
```

- [ ] **Step 3: Verify**

Open `index.html`. Confirm the Contact section shows Email / LinkedIn / CV rows. Click the email → opens a mail composer to `gaborgaya@gmail.com`. Click CV → opens the PDF. Footer shows copyright and a Legal link (will 404 until Task 6). Confirm the LinkedIn `TODO` comment is present in the source.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add Contact section and footer"
```

---

## Task 6: Legal page

**Files:**
- Create: `legal.html`

**Interfaces:**
- Consumes: `styles.css` (all styling), `.nav`, `.wrap`.
- Produces: the `legal.html` page the footer links to.

Content is the Impressum/Privacy Policy Gábor provided, with the two mandated adaptations (spec §6.4): (a) hosting section rewritten from Squarespace to **Netlify**; (b) Google reCAPTCHA and contact-form paragraphs **removed** (the site has neither). Email everywhere is `gaborgaya@gmail.com`.

- [ ] **Step 1: Append minimal legal-page CSS**

```css
/* ---- Legal page ----------------------------------------------------- */
.legal { max-width: 46rem; margin: 0 auto; }
.legal h1 { font-weight: 400; font-size: 1.4rem; color: var(--text); }
.legal h2 { font-style: italic; color: var(--accent); font-weight: 400; font-size: 1.1rem; margin-top: 2.5rem; }
.legal p { margin: 0 0 1rem; }
.legal a { word-break: break-word; }
```

- [ ] **Step 2: Create `legal.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Legal — Gábor Gayà</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav class="nav" aria-label="Primary">
      <a href="index.html">← Back</a>
    </nav>
  </header>

  <main class="legal">
    <h1>Impressum</h1>

    <h2>Responsible party</h2>
    <p>Gabor Gaya<br>Berlinickestr. 4<br>12165 Berlin<br>Phone: +49 15251697425<br>Email: <a href="mailto:gaborgaya@gmail.com">gaborgaya@gmail.com</a></p>
    <p>Information according to § 5 TMG. The responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of processing personal data.</p>

    <h2>Privacy Policy — At a Glance</h2>
    <p>The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data refers to all data that can be used to personally identify you.</p>
    <p>This website is a static portfolio. It does not run analytics, does not set non-essential cookies, and has no contact form. Data is only processed to the extent technically necessary to deliver the pages (see Hosting).</p>

    <h2>Hosting</h2>
    <p>We host this website with the following provider: <strong>Netlify</strong>. The provider is Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA (hereinafter “Netlify”).</p>
    <p>When you visit this website, technical access data (e.g. IP address, browser type, operating system, and time of access) is processed on Netlify’s servers to enable the reliable and secure delivery of the site. Personal data may be transmitted to the USA in this context.</p>
    <p>The use of Netlify is based on Article 6(1)(f) GDPR. We have a legitimate interest in the most reliable possible display of our website. Data transfer to the USA is based on the EU Commission’s standard contractual clauses. We have concluded a Data Processing Agreement (DPA) with the provider as required by the GDPR.</p>

    <h2>General Information and Mandatory Notices</h2>
    <p>The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this Privacy Policy. We would like to point out that data transmission on the internet (e.g. when communicating by email) can have security vulnerabilities. Complete protection of data from access by third parties is not possible.</p>
    <p><strong>Storage period.</strong> Unless a more specific storage period is stated in this Privacy Policy, your personal data remains with us until the purpose for the data processing no longer applies. If you assert a legitimate request for erasure or revoke consent, your data is erased unless we have other legally permissible grounds for storing it.</p>

    <h2>Your Rights</h2>
    <p>You have the right at any time to obtain, free of charge, information about the origin, recipient, and purpose of your stored personal data, and to demand its rectification or erasure. If you have given consent, you can revoke it at any time for the future. You may request restriction of processing, and you have the right to data portability. You also have the right to lodge a complaint with the competent supervisory authority.</p>
    <p><strong>Right to object (Article 21 GDPR).</strong> Where processing is based on Article 6(1)(e) or (f) GDPR, you have the right to object at any time, for reasons arising from your particular situation, to the processing of your personal data.</p>

    <h2>SSL / TLS Encryption</h2>
    <p>For security reasons and to protect the transmission of confidential content, this site uses SSL/TLS encryption. You can recognize an encrypted connection by the “https://” prefix and the lock icon in your browser’s address bar.</p>

    <h2>Objection to Promotional Emails</h2>
    <p>We hereby object to the use of contact data published within the scope of the imprint obligation for sending unsolicited advertising and informational materials. The operators of these pages expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information (e.g. spam emails).</p>

    <h2>Copyright</h2>
    <p>All content published on this site is protected by copyright. Use, reproduction, and distribution of the content requires express permission.</p>

    <h2>EU Dispute Resolution</h2>
    <p>The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</a>. You can find our email address in the responsible-party section above.</p>
    <p>We are not willing or obliged to participate in dispute-resolution proceedings before a consumer arbitration board.</p>

    <p style="margin-top:2.5rem">Source basis: e-recht24.de, adapted for this site.</p>
  </main>
</body>
</html>
```

- [ ] **Step 3: Verify accuracy and the email rule**

Run:
```bash
cd /Users/gabor/lead-portfolio
grep -ri 'info@gaborgaya' . --include=*.html && echo "FAIL: info@ found" || echo "OK: no info@ address"
grep -ci 'squarespace\|recaptcha' legal.html   # expect 0
grep -ci 'netlify' legal.html                  # expect >=1
```
Expected: "OK: no info@ address"; the second command prints `0`; the third prints `1` or more. Then open `legal.html`, confirm it is styled like the site, the "← Back" link returns to `index.html`, and the footer Legal link on `index.html` now resolves here.

- [ ] **Step 4: Commit**

```bash
git add legal.html styles.css
git commit -m "Add adapted legal page (Netlify hosting, no form/reCAPTCHA)"
```

---

## Task 7: Accessibility, meta, favicon, and final polish

**Files:**
- Create: `favicon.svg`
- Modify: `index.html`, `legal.html` (meta tags, favicon link)
- Modify: `styles.css` (contrast fix if needed)

**Interfaces:**
- Consumes: everything from Tasks 1–6.

- [ ] **Step 1: Create a minimal favicon**

```bash
cd /Users/gabor/lead-portfolio
printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="%23F7F8F9"/><text x="16" y="23" font-family="monospace" font-size="20" fill="%23DB5E27" text-anchor="middle">g</text></svg>' > favicon.svg
```

- [ ] **Step 2: Add meta + favicon to both pages**

In the `<head>` of `index.html` and `legal.html`, add after the viewport line:

```html
  <meta name="description" content="Gábor Gayà — Product & Strategy Lead based in Berlin. Leadership experience across education, product, and creative ventures.">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
```

- [ ] **Step 3: Contrast check**

The body color `--text: #5B6174` on `--bg: #F7F8F9` gives a contrast ratio of ~5.9:1, which passes WCAG AA for normal text (≥4.5:1). No change needed. If a future visual tweak lightens the text, re-check with any contrast calculator and keep it ≥4.5:1.

- [ ] **Step 4: Full accessibility + structural verification**

Run:
```bash
cd /Users/gabor/lead-portfolio
grep -c 'alt=' index.html          # expect >=1 (portrait has alt text)
grep -c '<main' index.html legal.html   # each page has a main landmark
```
Then, in a browser, press **Tab** repeatedly through `index.html`: confirm every link shows a visible orange focus outline and the tab order is top-to-bottom. Confirm both pages show the favicon in the browser tab.

- [ ] **Step 5: Final side-by-side check against reference screenshots**

Open `index.html` next to Gábor's desktop and mobile screenshots. Confirm typography, color, spacing rhythm, and the label/content alignment match. Note any deltas for a follow-up tweak (exact pixel-match to Wix is not a goal; matching the feel is).

- [ ] **Step 6: Commit**

```bash
git add favicon.svg index.html legal.html styles.css
git commit -m "Add meta tags, favicon, and accessibility polish"
```

---

## Deployment (after Task 7, on request)

1. Swap the placeholder `assets/portrait.svg` for the real duotone photo (`assets/portrait.jpg`) and update the `<img>` `src`/`alt`.
2. Replace the LinkedIn `href="#"` with the real URL.
3. Deploy: drag the `lead-portfolio/` folder onto https://app.netlify.com/drop (or connect the git repo). No build command; publish directory is the project root.
4. Confirm the live Legal page's hosting section still names the actual host.

---

## Self-Review

**Spec coverage:**
- §4 Architecture (two pages, no build) → Tasks 1–6. ✅
- §5 Visual system (tokens, IBM Plex Mono self-hosted, label/content grid, portrait) → Tasks 1–2. ✅
- §6.1 About hero → Task 2. ✅
- §6.2 Experience, all 5 roles incl. Variation A (Speaking) + Variation B (grouped) → Task 4. ✅
- §6.3 Contact (gmail, LinkedIn, CV) → Task 5. ✅
- §6.4 Legal, adapted (Netlify, no reCAPTCHA/form), gmail everywhere → Task 6. ✅
- §7 Responsive stacking → Task 2 (media query). ✅
- §8 Accessibility → Task 7. ✅
- §9 Hosting → Deployment section. ✅
- §10 Open items (portrait, LinkedIn, screenshots, host) → handled as placeholders + Deployment steps. ✅

**Placeholder scan:** The only intentional placeholders are the portrait image and LinkedIn URL — both flagged as open items in the spec, wired with a visible `TODO` and a placeholder asset, and listed in the Deployment section. No vague "add error handling"-style gaps.

**Type/name consistency:** Class names `.wrap`, `.row`, `.row__label`, `.row__body`, `.role`, `.scope-item`, `.section-title`, `.nav`, `.legal`, `.portrait` are defined in Tasks 1–2/6 and reused consistently. Anchor ids `#about`/`#experience`/`#contact` defined in Tasks 2/4/5 match the nav from Task 3.
