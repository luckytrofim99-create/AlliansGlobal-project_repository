---
name: Alliance Global — Dev2 Editorial
description: The feature branch journeys and copy with the architectural visual language of dev.
colors:
  background: "#F8F6F0"
  surface: "#FFFEFA"
  primary: "#102F3E"
  ink: "#163846"
  gold: "#A88A5C"
  body-muted: "#617176"
  line: "#DCDED7"
typography:
  display: '"Cormorant Garamond", Georgia, serif'
  body: '"Manrope", Arial, sans-serif'
---

# Alliance Global — Dev2 Editorial

## Sources and scope

Branch dev2 starts from feature/dev-website-updates at 6c47539. The section order, routes and interactive flows come from that branch.
Headings and supporting copy were subsequently edited at the user’s request: no
commas in headings, concise task-led language and fewer repetitions.
The visual language comes from dev at f9887a5: ivory and paper, navy and gold,
light serif headings, fine rules and architectural imagery. The user-selected
soft capsule button system refines the controls in dev2.

This system covers the homepage, all internal pages, shared header and footer,
FAQ, country controls and the single shared consultation form.

## Visual foundations

- Use Cormorant Garamond 400 for display and editorial headings. Italic gold
  emphasis is used on the existing second line of the homepage offer.
- Use locally bundled Manrope 400/500/600/700 for body and interface text.
- Background is ivory #F8F6F0; surfaces are paper #FFFEFA. Navy #102F3E anchors
  actions, the destination scene and footer. Ink is #163846; gold is #A88A5C.
- Supporting reading text uses #617176 for contrast. Fine dividers use #DCDED7.
- Cards and photographic crops retain square corners and restrained borders.
  Action buttons are capsules with a trailing circular icon; fields have a 10px
  radius and icon controls are circular. The primary hero photograph keeps the
  architectural arch from dev, with a fine offset frame.
- Do not add the former paper dot pattern, grain, travel collage or handwritten
  underline. Section accents are simple gold hairlines.
- Keep generous responsive gutters, balanced headings, real photography, visible
  focus rings, 44px minimum selection targets and predictable hover states.

## Homepage composition and behavior

1. Hero: the unchanged offer, supporting text, consultation and services links.
   Copy and the Roman architectural photograph form two columns on desktop and
   stack on mobile. A small scroll drift respects reduced-motion preferences.
2. Services: the existing three-choice selector, live content and detail links.
   The scroll scene, manual selection, swipe and keyboard behavior are retained.
3. Destinations: the existing seven-country selector and detail link, presented
   on a navy ground. Gold identifies the selected country.
4. Purpose: the existing six goals, default education selection and program link.
5. Process: the same three steps and links, with thin rules and a navy aside.
6. Quick consultation: the same task/country/contact/comment/consent flow.

## Shared and internal pages

The homepage retains its minimal header and hash CTA. Internal pages retain their
navigation and native mobile dialog. Both use a capsule-shaped header container and keep the compact-on-scroll shell and
persistent RU/EN selection. The footer retains the feature branch navigation.

PageKit preserves each page's structure and applies serif hierarchy, outlined
rectangular cards, straight photographic crops and navy closing panels. Catalogue
search and region filters, FAQ disclosure states and selected controls stay visible.

## Shared actions

`components/actions/Action.tsx` owns action appearance and native link/button
semantics. Default actions are 54px tall with 13px Manrope labels and a 38px
trailing icon circle. Header actions use the deliberate 44px compact size. Navy
primary actions, navy outlines, ivory actions on dark panels and quiet underlined
links establish hierarchy. Placement modules control only width and spacing.
Selection controls use rounded groups with visible selected states.

Press feedback starts on pointer down at scale .97 with an 80ms response; hover
is limited to fine pointers. Focus remains visible and reduced motion disables
transforms. No additional UI or motion dependency is installed.

## Motion and accessibility

Motion remains owned by the existing feature components. All content is visible
in server HTML. Native anchors, restored scroll, keyboard focus and reduced motion
must keep all text and actions usable. Presentation must not change aria-pressed,
aria-controls, live regions, form semantics or the mobile dialog's close behavior.

## Content and form boundaries

Product facts and service boundaries remain from feature/dev-website-updates.
The user-authorized editorial pass shortens headings and copy. Do not
invent contacts, prices, partners, reviews or outcomes. The form remains a local
prototype, validates the contact and initially unchecked consent, preserves input
and offers a local draft download. It does not submit to an external service.

## Local previews

- dev: http://127.0.0.1:3000
- feature/dev-website-updates: http://127.0.0.1:3001
- dev2: http://127.0.0.1:3002
