---
name: Alliance Global — Homepage
description: Tactile controls and photographic travel objects on a warm paper ground.
colors:
  primary: "#23533c"
  primary-hover: "#326b4e"
  neutral-bg: "#f1ebdd"
  ink: "#171717"
  muted: "#68645d"
  surface: "#faf7ef"
  service-surface: "#fcfaf5"
  country-surface: "#faf8f0"
  field: "#eae5da"
  white: "#ffffff"
  secondary: "#e5e9df"
  secondary-ink: "#1b4932"
  control-track: "#e4dece"
  control-thumb: "#fffdf8"
  footer: "#e6e3d7"
  error: "#a33327"
  annotation: "#a3ff00"
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
  art-label:
    fontFamily: '"Idadu Mono", monospace'
    fontSize: "3.33cqw"
    fontWeight: 700
    lineHeight: 1.3
  label:
    fontFamily: '"Idadu Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  imported-photo: "8px"
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

# Design System: Alliance Global — Homepage

## Overview

**Creative North Star: "Paper Journey"**

The implemented homepage combines warm, lightly textured paper with rounded physical controls, quiet green accents and real travel photography. Its spacious composition gives each choice a clear task. The Apple reference appears in the controls, selected states and useful translucent header; the Idadu reference supplies the paper ground, source font assets and expressive mobile movement.

**Scope:** these rules govern route `/`, `components/home/*`, and the homepage branches in `SiteHeader.tsx` and `SiteFooter.tsx`. They do not replace the existing inner-page system in `app/globals.css`: those routes retain ivory/navy/gold, Cormorant Garamond headings, their navigation and GSAP scenes. The existing Alliance Global logo and its serif wordmark remain intact.

**Key Characteristics:**

- Warm paper with fine dots and restrained grain.
- Large sans-serif headings and short, readable supporting text.
- Rounded surfaces, pill actions and visibly selected controls.
- Photographic objects and responsive, user-controlled motion.
- Visible keyboard focus and complete reduced-motion alternatives.

The source of truth is the homepage CSS and TSX, not this document's sample snippets. Font and background provenance is recorded in `public/fonts/idadu/sources.json` and `public/images/idadu/sources.json`; font OFL files are stored beside the assets.

## Colors

The palette pairs warm paper neutrals with a restrained forest-green action color. Frontmatter contains the normative values.

### Primary

- **Forest green** (`primary`): consultation actions, selected country/goal controls, caret and homepage focus indication.
- **Lifted forest** (`primary-hover`): primary action hover on a fine pointer.
- **Soft sage** (`secondary`) and **deep leaf** (`secondary-ink`): secondary route actions.

### Neutral

- **Warm paper** (`neutral-bg`): the homepage ground and consultation section.
- **Near-black** (`ink`): headings, body emphasis and field text.
- **Warm stone** (`muted`): supporting copy and quieter labels.
- **Cream surfaces** (`surface`, `service-surface`, `country-surface`): separate functional containers from the paper.
- **Pressed paper** (`field`, `control-track`): inset fields and selector tracks.
- **Light thumb** (`control-thumb`, `white`): active service controls and focused inputs.
- **Footer paper** (`footer`): the homepage's closing navigation band.
- **Brick error** (`error`): invalid contact state and validation text only.

**The Functional Accent Rule.** Green identifies an action or selection; photographs carry the broader color range. Do not add decorative accent colors to homepage controls.

## Typography

**Display and body:** the active stack is Work Sans, exposed as `Idadu Work Sans`, then Manrope, system UI and sans-serif. The downloaded Work Sans subset is Latin; Russian glyphs are rendered by Manrope. Both display and body use this stack. Preserve the loaded Manrope weights (400, 500, 600 and homepage 700).

**Reference faces:** Anton remains stored and declared, but inactive. IBM Plex Mono (`Idadu Mono`) now appears only in the small TRAVEL artwork label in the supplied Figma collage. It is not a body or heading role. The stored Anton subset lacks Cyrillic.

**Brand exception:** the unchanged logo wordmark uses Cormorant Garamond through the existing `--serif` token. This does not authorize serif headings in the new homepage.

The frontmatter hierarchy describes the general desktop roles. Headings use tight tracking and balanced wrapping; supporting text remains regular weight. The hero lead is limited to 650px, section introductions to roughly 600px and card copy to roughly 370–580px. Consultation labels remain explicit above fields.

At 760px and below, the hero becomes `clamp(36px, 9.6vw, 58px)`, with 1.1 line-height and -0.04em tracking. General section headings become `clamp(32px, 8vw, 45px)`; individual sections have local adjustments. At 360px and below, the hero uses 34px. Keep field text at 16px on mobile. The consultation title has its own larger, medium-weight treatment.

**The Cyrillic Continuity Rule.** Judge headings with Russian content. Work Sans asset presence must never be mistaken for Cyrillic coverage.

## Layout

The page uses normal document scrolling, centered introductions and wide photographic surfaces. Horizontal padding is fluid (`clamp(22px, 5vw, 88px)`), becoming 22px on mobile and 18px at 360px. Main containers vary with their content: hero copy 1180px, service surface 1160px, country surface 1280px and consultation content 1160px maximum. Avoid imposing one universal card grid.

Desktop service content, purpose content, process content and consultation content use two columns. At 760px the homepage scenes stack; consultation becomes one column at 900px and its paired fields stack at 560px. Country choices scroll horizontally without a visible scrollbar; goals wrap. The mobile hero has independently positioned and scaled objects rather than a shrunken desktop arrangement.

The header occupies 84px on desktop and 72px on mobile. Its inner pill is capped at 1380px. Sections provide anchor offsets so the header does not obscure headings. Footer links are three groups on desktop, two columns on mobile.

The service scene uses sticky content during native scrolling: 210svh on desktop and 185svh on mobile. Compact viewports remove the sticky runway (desktop height at most 760px, mobile height at most 720px). Reduced motion also makes the scene ordinary flow. Manual selection or drag takes precedence over automatic scroll selection.

**The User Control Rule.** Preserve wheel, touch, keyboard and anchor navigation. Homepage motion must not take ownership of document scrolling.

## Elevation & Depth

Depth comes from tonal layers, soft local shadows and the overlap of photographs. Most text sits directly on the paper. Use elevation to explain a raised control, a photographic object or a distinct working surface.

The ground uses 1px ink dots on a 26px grid and `paper-grain.svg` at 0.42 opacity with multiply blending. The consultation section deliberately returns to a plain paper-color ground.

The header is transparent at the top. After 30px of scroll its inner pill gains a translucent cream fill, blur (20px), saturation (1.15), a diffuse shadow and an inset highlight. Reduced transparency replaces that treatment with opaque cream.

### Shadow Vocabulary

- **Surface ambient:** `0 20px 60px #584b3212` on the service surface; the country surface uses the lighter `#584b3210` alpha.
- **Form ambient:** `0 16px 48px -32px #24232233`.
- **Raised thumb:** `0 2px 8px #524a3520` on the selected service control.
- **Photo slip:** `0 20px 50px #4b433728`; cutout objects use their own drop shadows.

**The Useful Glass Rule.** Apply glass to the scrolled header, where it maintains context over page content. Keep forms and information surfaces opaque.

## Shapes

Large surfaces have generous continuous-feeling corners: the service and country containers use the surface radius, the form its form radius, and mobile surfaces the smaller surface-mobile radius. Inputs use the field radius; contact-method segments nest the control-inner radius inside an 18px track. Actions and selection chips are fully pill-shaped.

Containers normally separate through fill and shadow rather than strong borders. Focus, validation and increased-contrast states add explicit outlines. Photography can rotate slightly or overlap in the hero and purpose scene; functional controls stay upright.

## Components

### Buttons and quiet links

Primary actions use white medium-weight text on forest green. The hero action has the frontmatter dimensions; the header action is smaller, the form action is 56px minimum, and compact route actions are 44–48px minimum. Secondary actions use soft sage. Quiet links are underlined with an offset rather than enclosed in a surface.

Fine-pointer hover brightens the primary fill. Press scales regular pills to 0.97; form actions use 0.98. Focus remains visible and does not depend on movement. Homepage surface focus is a 3px green outline with 5px offset; the form supplies its own dark outline treatments.

### Selection controls

Services use a light raised thumb in a paper track. Countries and goals use a green selected pill with white text. Selected state is exposed through `aria-pressed`; related content uses polite live regions. The contact method uses native radio inputs within a rounded two-part control.

Motion 14.4.0 animates shared selection thumbs with a spring (stiffness 320, damping 34, mass 0.9). Keyboard selection and reduced motion resolve immediately. Service dragging respects vertical touch scrolling and springs back after a selection. Use the existing controls, rather than turning informational copy into clickable cards.

### Cards and photographic surfaces

Service cards place photography beside text on desktop and above it on mobile. Destination cards put the wide image above a text/action row. Purpose imagery is a separate, slightly rotated rounded photograph. Preserve visible text and working detail links during image transitions.

### Inputs and consultation

Fields have a warm inset fill, a transparent resting border and visible labels. Focus changes the fill to white, adds an ink border and a soft dark outline. Errors pair a brick-colored border with readable text. Increased contrast adds explicit field and selector borders.

The short form contains task, country, one contact method, an optional expandable comment and a separate unchecked consent. The full-width action is followed by quiet explanatory copy. The prototype's status and download action extend the form using the same type and spacing; never replace them with a fabricated sent state.

### Header and footer

The homepage header contains the preserved logo and one consultation action. It has no primary navigation or mobile-menu trigger. At 360px and below only the logo symbol is shown, preserving space for the action.

The footer carries three groups of ordinary links, the preserved logo and restrained company context on a darker paper band. Its navigation remains usable on mobile; it is not removed with the header navigation.

### Motion and travel objects

The current Figma hero has nine local image layers: the red print, Kathmandu tag, Everest photo, tape, handwritten note, Lukla tag, travelers, approval stamp and aircraft. `HeroCollage` preserves the supplied 390 × 304.19 composition, including each asset's rotation and overlap. The original files and slot/source evidence live in `public/images/home-figma/manifest.json`.

Fresh Idadu observations on 21 October 2026 replace the earlier mobile-amplitude assumption. Outgoing collage transforms are now desktop-only (1024px and up); phone and portrait-tablet compositions stay assembled during native scrolling. Separate inner wrappers own arrivals: place (400/310ms), drop (470/390ms), rise (450/390ms), press (380/280ms), write (340/260ms), desktop/mobile respectively. The stamp's press curve `cubic-bezier(.3,1.5,.5,1)` is an intentional reference-derived exception for this supplied artwork, not a control default. Asset sequencing starts after image decoding with a 2-second fallback; the consultation offer never waits for the collage.

Heading words arrive behind clipping masks. Large photos open from the observed Gino quadrilateral into their actual rectangular frame; green Figma underlines reveal left to right. These editorial entrances run once and keep visible default HTML. Changes to selected copy use 280ms CSS starting-style transitions, with instant keyboard/reduced-motion paths. The existing selection springs and drag velocity handoff remain unchanged. Reduced motion cancels queued/current entrances, restores the collage, and removes service pinning; focusing a form unobserves its entrance before it can start.

The homepage owns its Motion scenes; the shared GSAP component exits early on `/`. Reduced motion removes decorative transforms, transitions and sticky scene progression while preserving choices, links and content. Increased contrast and reduced transparency have dedicated material fallbacks.

## Do's and Don'ts

### Do:

- **Do** scope these rules to the homepage and its conditional header/footer.
- **Do** preserve the existing brand mark and the Cyrillic-safe active font stack.
- **Do** pair selection styling with semantic state, visible focus and usable touch targets of at least 44px.
- **Do** keep mobile compositions and reduced-motion flow fully authored.
- **Do** use real supplied imagery and short, functional Russian copy.

### Don't:

- **Don't** introduce decorative slogans, chapter counters or diagonal arrows into the homepage.
- **Don't** add primary navigation to the homepage header.
- **Don't** apply the legacy navy/gold/serif screen language to new homepage sections.
- **Don't** promote the TRAVEL artwork type to body/headings or describe Anton as active.
- **Don't** use glass on form fields or replace native scrolling with scroll hijacking.
- **Don't** invent proof, performance counters or a successful form submission.
