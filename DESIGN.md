---
name: Alliance Global — Paper Journey
description: A shared paper, photographic and tactile interface for international plans.
colors:
  primary: "#0D2734"
  primary-hover: "#174353"
  neutral-bg: "#F1EBDD"
  ink: "#0D2734"
  muted: "#59656A"
  surface: "#faf7ef"
  service-surface: "#fcfaf5"
  country-surface: "#faf8f0"
  field: "#eae5da"
  white: "#ffffff"
  secondary: "#B19365"
  secondary-hover: "#C6AA7C"
  secondary-ink: "#0D2734"
  soft: "#E9DDC9"
  soft-hover: "#DFCBA8"
  control-track: "#e4dece"
  control-thumb: "#fffdf8"
  footer: "#e6e3d7"
  error: "#a33327"
typography:
  display:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "clamp(54px, 6.5vw, 96px)"
    fontWeight: 700
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "clamp(36px, 4.7vw, 68px)"
    fontWeight: 600
    lineHeight: 1.09
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "clamp(28px, 3vw, 44px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  page-display:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "clamp(42px, 5.6vw, 84px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  page-headline:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "clamp(30px, 3.7vw, 54px)"
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "clamp(23px, 2.4vw, 34px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  reading:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.85
  body:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  lead:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  field: "18px"
  control-inner: "14px"
  surface-mobile: "28px"
  form: "32px"
  surface: "36px"
  pill: "999px"
spacing:
  control-gap: "4px"
  choice-gap: "8px"
  field-gap: "16px"
  card-gap: "24px"
  mobile-gutter: "22px"
  content-inset: "25px"
  group-gap: "28px"
  section-gap: "60px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "15px 25px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-ink}"
    rounded: "{rounded.pill}"
    padding: "15px 25px"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
  button-soft:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 25px"
  button-soft-hover:
    backgroundColor: "{colors.soft-hover}"
  page-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.surface}"
    padding: "clamp(25px, 2.8vw, 36px)"
  closing-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.surface}"
    padding: "clamp(30px, 5vw, 64px)"
  quiet-link:
    textColor: "{colors.primary}"
    padding: "10px 2px"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "15px 16px"
  field-focus:
    backgroundColor: "{colors.white}"
  service-selector:
    backgroundColor: "{colors.control-track}"
    rounded: "{rounded.pill}"
    padding: "5px"
  service-selector-selected:
    backgroundColor: "{colors.control-thumb}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  choice-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
  service-card:
    backgroundColor: "{colors.service-surface}"
    rounded: "{rounded.surface}"
  country-card:
    backgroundColor: "{colors.country-surface}"
    rounded: "{rounded.surface}"
  consultation-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.form}"
    padding: "clamp(24px, 3vw, 40px)"
---

# Design System: Alliance Global — Paper Journey

## Overview

**Creative North Star: "Paper Journey"**

Alliance Global combines warm, lightly textured paper with rounded physical controls, navy actions, muted gold details and real travel photography. Its spacious composition gives each choice a clear task and supports calm, personal international planning. The Apple reference appears in the controls, selected states and useful translucent header; the Idadu reference supplies the paper ground, source font assets and expressive editorial movement.

**Scope:** this world now governs the whole site: home, country catalogue and detail pages, services and service details, programs, company, approach, journal and articles, contacts, consultation, privacy and not-found views. PageKit reuses the homepage theme internally, SiteHeader shares the soft shell, SiteFooter reuses the homepage footer, and ConsultationForm delegates to QuickConsultation. Internal pages adapt the shared system to their content instead of retaining the former serif/GSAP scenes. The supplied Alliance Global logo and its Cormorant wordmark remain intact.

**Key Characteristics:**

- Warm paper with fine dots and restrained grain.
- Large sans-serif headings and short, readable supporting text.
- Rounded surfaces, pill actions and visibly selected controls.
- Photographic objects and responsive, user-controlled motion.
- Navy ink and actions with restrained gold emphasis.
- Visible server-rendered content, keyboard focus and complete reduced-motion alternatives.

The source of truth is the built CSS and TSX, especially HomeTheme, HomeJourney, QuickConsultation, PageKit, InnerHeader and PageMotion, not this document's sample snippets. Font and background provenance is recorded in `public/fonts/idadu/sources.json` and `public/images/idadu/sources.json`; font OFL files are stored beside the assets.

## Colors

The confirmed palette preserves warm paper and pairs deep navy actions with muted gold details across all routes. Frontmatter contains the normative values.

### Primary

- **Deep navy** (`primary`, `ink`, `secondary-ink`): headings, text emphasis, consultation actions, selected country/goal/filter controls, caret and focus indication.
- **Lifted navy** (`primary-hover`): primary action hover on a fine pointer.

### Secondary

- **Muted gold** (`secondary`): homepage secondary actions, hand-drawn underlines, list markers, active navigation and the action on a dark closing panel.
- **Lifted gold** (`secondary-hover`): gold-action hover.

### Neutral

- **Warm paper** (`neutral-bg`): the shared page ground and consultation section.
- **Slate gray** (`muted`): supporting copy and quieter labels.
- **Sand** (`soft`, `soft-hover`): internal secondary actions and quiet contextual controls.
- **Cream surfaces** (`surface`, `service-surface`, `country-surface`): separate functional containers from the paper.
- **Pressed paper** (`field`, `control-track`): inset fields and selector tracks.
- **Light thumb** (`control-thumb`, `white`): active service controls and focused inputs.
- **Footer paper** (`footer`): the shared closing navigation band.
- **Brick error** (`error`): invalid contact state and validation text only.

**The Functional Accent Rule.** Navy identifies action and selection; gold supports emphasis and orientation. Photography carries the wider color range. Colors inside supplied image assets do not become interface palette tokens.

## Typography

**Display and body:** the active stack is Work Sans, exposed as `Idadu Work Sans`, then Manrope, system UI and sans-serif. The downloaded Work Sans subset is Latin; Russian glyphs are rendered by Manrope. Both display and body use this stack. Preserve the loaded Manrope weights (400, 500, 600 and homepage 700).

**Reference faces:** Anton remains stored and declared, but inactive. IBM Plex Mono (`Idadu Mono`) now appears only in the small TRAVEL artwork label in the supplied Figma collage. It is not a body or heading role. The stored Anton subset lacks Cyrillic.

**Brand exception:** the unchanged logo wordmark uses Cormorant Garamond through the existing `--serif` token. Page headings across the site use the shared sans-serif stack.

The frontmatter hierarchy distinguishes homepage display/headline/title from the slightly smaller internal page-display/page-headline/page-title roles. Reading text uses a 760px maximum column with 17px type and 1.85 line-height, becoming 16px on mobile. Headings use tight tracking and balanced wrapping; supporting text remains regular weight. The hero lead is limited to 650px, section introductions to roughly 600px and card copy to roughly 370–580px. Consultation labels remain explicit above fields. Useful country, service and article metadata follows its heading; it is not a decorative pre-heading kicker.

At 760px and below, internal h1 becomes `clamp(34px, 9.3vw, 52px)`. The homepage hero becomes `clamp(36px, 9.6vw, 58px)`, with 1.1 line-height and -0.04em tracking. General section headings become `clamp(32px, 8vw, 45px)`; individual sections have local adjustments. At 360px and below, the hero uses 34px. Keep field text at 16px on mobile. The consultation title has its own larger, medium-weight treatment.

**The Cyrillic Continuity Rule.** Judge headings with Russian content. Work Sans asset presence must never be mistaken for Cyrillic coverage.

## Layout

The site uses normal document scrolling, centered introductions and wide photographic surfaces. Horizontal padding is fluid (`clamp(22px, 5vw, 88px)`), becoming 22px on mobile and 18px at 360px. Main containers vary with their content: hero copy 1180px, service surface 1160px, country surface 1280px and consultation content 1160px maximum. Internal hero, section and closing containers share a 1300px maximum with the same fluid gutters; reading content stays narrower. Avoid imposing one universal card grid.

Desktop homepage service, purpose, process and consultation content use two columns. Internal photographic heroes split copy and image; plain heroes center the copy. Internal card collections use three columns, two at 1000px and one at 760px. At 760px internal heroes stack, and their copy, section introductions and actions align left. At 760px the homepage scenes stack; consultation becomes one column at 900px and its paired fields stack at 560px. Country choices scroll horizontally without a visible scrollbar; goals wrap. The mobile hero has independently positioned and scaled objects rather than a shrunken desktop arrangement.

The header occupies 84px on desktop and 72px on mobile. Its inner pill is capped at 1380px. Internal desktop navigation changes to a native dialog below 1150px. Sections provide anchor offsets so the header does not obscure headings. Footer links are three groups on desktop, two columns on mobile.

The service scene uses sticky content during native scrolling: 210svh on desktop and 185svh on mobile. Compact viewports remove the sticky runway (desktop height at most 760px, mobile height at most 720px). Reduced motion also makes the scene ordinary flow. Manual selection or drag takes precedence over automatic scroll selection.

**The User Control Rule.** Preserve wheel, touch, keyboard and anchor navigation. Motion must not take ownership of document scrolling.

## Elevation & Depth

Depth comes from tonal layers, soft local shadows and the overlap of photographs. Most text sits directly on the paper; shared internal cards are flat cream surfaces. Use elevation to explain a raised control, a photographic object or a distinct working surface.

The ground uses 1px navy dots on a 26px grid and `paper-grain.svg` at 0.42 opacity with multiply blending. The consultation section deliberately returns to a plain paper-color ground.

The header is transparent at the top. After 30px of scroll its inner pill gains a translucent cream fill, blur (20px), saturation (1.15), a diffuse shadow and an inset highlight. Reduced transparency replaces that treatment with opaque cream; the mobile menu backdrop also loses its blur.

### Shadow Vocabulary

- **Surface ambient:** `0 20px 60px #584b3212` on the service surface; the country surface uses the lighter `#584b3210` alpha.
- **Form ambient:** `0 16px 48px -32px #24232233`.
- **Raised thumb:** `0 2px 8px #524a3520` on the selected service control.
- **Photo slip:** `0 20px 50px #4b433728`; cutout objects use their own drop shadows.
- **Menu elevation:** `0 24px 90px #0d27343d` on the native mobile dialog.

**The Useful Glass Rule.** Apply translucency to navigation layers that preserve page context. Keep forms and information surfaces opaque.

## Shapes

Large surfaces have generous continuous-feeling corners: service, country and internal card containers use the surface radius, the form and desktop menu use the form radius, and mobile surfaces use the smaller surface-mobile radius. Inputs use the field radius; contact-method segments nest the control-inner radius inside an 18px track. Actions and selection chips are fully pill-shaped.

Containers and filter controls normally separate through fill rather than strong borders. Editorial notes, FAQ and mobile-menu links may use quiet dividers. Focus, validation and increased-contrast states add explicit outlines. Photography can rotate slightly or overlap in the hero and purpose scene; functional controls stay upright.

## Components

### Buttons and quiet links

Primary actions use white medium-weight text on navy. The hero action has the frontmatter dimensions; the header action is smaller, the form action is 56px minimum, and compact route actions are 44–48px minimum. Homepage secondary actions use gold; internal secondary actions use sand. The occasional navy closing panel carries a gold action. Quiet links are underlined with an offset rather than enclosed in a surface.

Fine-pointer hover brightens the primary fill. Press scales regular pills to 0.97; form actions use 0.98. Focus remains visible and does not depend on movement. Shared paper-surface focus is a 3px navy outline with 5px offset; the form supplies its own dark outline treatments.

### Selection controls

Services use a light raised thumb in a paper track. Countries, goals and regional filters use a navy selected pill with white text. Selected state is exposed through `aria-pressed`; related content uses polite live regions. The contact method uses native radio inputs within a rounded two-part control. Country filter/reset controls explicitly remove native button borders. Search has a visible label, inset field, clear action and container focus outline; empty results offer explicit next actions.

Motion 14.4.0 animates shared selection thumbs with a spring (stiffness 320, damping 34, mass 0.9). Keyboard selection and reduced motion resolve immediately. Service dragging respects vertical touch scrolling and springs back after a selection. Use the existing controls, rather than turning informational copy into clickable cards.

### Cards and photographic surfaces

Service cards place photography beside text on desktop and above it on mobile. Destination cards put the wide image above a text/action row. Purpose imagery is a separate, slightly rotated rounded photograph. Preserve visible text and working detail links during image transitions. Internal PageCard surfaces support text alone or a photograph above copy, with the heading first, useful metadata below it, then description and an ordinary detail link. Internal cards have no ambient resting shadow; fine-pointer hover can enlarge only their image slightly.

Reuse PageShell, PageHero, PageSection, PageCard, PageLink, PageReading and PageClosing for internal pages, adapting density to catalogues, company information, service detail and reading. FAQ uses native details/summary and article contents uses ordinary anchor links.

### Inputs and consultation

Fields have a warm inset fill, a transparent resting border and visible labels. Focus changes the fill to white, adds an ink border and a soft dark outline. Errors pair a brick-colored border with readable text. Increased contrast adds explicit field and selector borders.

QuickConsultation is the single short form on home and the consultation route; ConsultationForm supplies contextual country and goal. It contains task, country, one contact method, an optional expandable comment and a separate unchecked consent. The full-width action is followed by quiet explanatory copy. The prototype's status and download action extend the form using the same type and spacing; never replace them with a fabricated sent state.

### Header and footer

All pages use the same soft header shell, preserved logo and consultation action. The homepage header contains only the logo and action. It has no primary navigation or mobile-menu trigger. At 360px and below only the logo symbol is shown, preserving space for the action.

Internal pages add desktop navigation and a native mobile dialog. Active links use a gold underline. Dialog close, Escape, focus restoration and route changes preserve native behavior.

The shared footer carries three groups of ordinary links, the preserved logo and restrained company context on a darker paper band. Its navigation remains usable on mobile; it is not removed with the header navigation.

### Motion and travel objects

The current Figma hero has nine local image layers: the red print, Kathmandu tag, Everest photo, tape, handwritten note, Lukla tag, travelers, approval stamp and aircraft. `HeroCollage` preserves the supplied 390 × 304.19 composition, including each asset's rotation and overlap. The original files and slot/source evidence live in `public/images/home-figma/manifest.json`.

Fresh Idadu observations on 21 October 2026 replace the earlier mobile-amplitude assumption. Outgoing collage transforms are now desktop-only (1024px and up); phone and portrait-tablet compositions stay assembled during native scrolling. Separate inner wrappers own arrivals: place (400/310ms), drop (470/390ms), rise (450/390ms), press (380/280ms), write (340/260ms), desktop/mobile respectively. The stamp's press curve `cubic-bezier(.3,1.5,.5,1)` is an intentional reference-derived exception for this supplied artwork, not a control default. Asset sequencing starts after image decoding with a 2-second fallback; the consultation offer never waits for the collage.

Heading words arrive behind clipping masks. Large photos open from the observed Gino quadrilateral into their actual rectangular frame; gold Figma underlines reveal left to right. These editorial entrances run once and keep visible default HTML. Changes to selected copy use 280ms CSS starting-style transitions, with instant keyboard/reduced-motion paths. The existing selection springs and drag velocity handoff remain unchanged. Reduced motion cancels queued/current entrances, restores the collage, and removes service pinning; focusing a form unobserves its entrance before it can start.

PageMotion reuses these one-shot word masks and photo-clip entrances on internal routes. PagePhotoMotion adds small photo-only native-scroll displacement (24px total travel, scale 1.07) within the clipped frame. Entrances and parallax use separate wrappers, with one transform owner per element. Its server and client initially produce the same transform; CSS removes that transform for reduced motion.

The homepage uses an SSR-consistent reduced-motion subscription with a stable server snapshot and reacts to preference changes after hydration. Reduced motion removes decorative transforms, transitions, photo parallax and sticky scene progression while preserving choices, links and content. Increased contrast and reduced transparency have dedicated material fallbacks.

**The Visible First Rule.** Content and controls remain readable in server-rendered HTML. Motion progressively enhances real text, native navigation and photography.

## Do's and Don'ts

### Do:

- **Do** extend the shared paper, navy and gold world across all routes.
- **Do** preserve the existing brand mark and the Cyrillic-safe active font stack.
- **Do** pair selection styling with semantic state, visible focus and usable touch targets of at least 44px.
- **Do** keep mobile compositions and reduced-motion flow fully authored.
- **Do** use real supplied imagery and short, functional Russian copy.
- **Do** reuse PageKit and QuickConsultation while adapting density to the page task.
- **Do** keep useful metadata below its heading.

### Don't:

- **Don't** introduce decorative slogans, chapter counters, redundant kickers or diagonal arrows into this world.
- **Don't** add primary navigation to the homepage header.
- **Don't** revive green action controls or legacy serif page headings on internal routes.
- **Don't** promote the TRAVEL artwork type to body/headings or describe Anton as active.
- **Don't** use glass on form fields or replace native scrolling with scroll hijacking.
- **Don't** invent proof, performance counters or a successful form submission.
