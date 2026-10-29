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

Branch dev2 starts from feature/dev-website-updates at 6c47539. Routes and interactive flows come from that branch; education now follows the hero.
Headings and supporting copy were subsequently edited at the user’s request: no
commas in headings, concise task-led language and fewer repetitions.
The visual language comes from dev at f9887a5: ivory and paper, navy and gold,
light serif headings, fine rules and architectural imagery. The user-selected
soft capsule button system refines the controls in dev2.

This system covers the homepage, all internal pages, shared header and footer,
FAQ, country controls and the single shared consultation form.

## Visual foundations

- Use Cormorant Garamond 400 for display and editorial headings. The homepage
  offer uses navy on both lines, following the user-supplied reference.
- Use locally bundled Manrope 400/500/600/700 for body and interface text.
- Background is ivory #F8F6F0; surfaces are paper #FFFEFA. Navy #102F3E anchors
  actions, the destination scene and footer. Ink is #163846; gold is #A88A5C.
- Supporting reading text uses #617176 for contrast. Fine dividers use #DCDED7.
- Text cards retain restrained borders. Photo frames use a shared 24px radius
  on desktop and 18px on mobile; image cards follow the same crop.
  Action buttons are capsules with a trailing circular icon; fields have a 10px
  radius and icon controls are circular. The primary hero photograph keeps the
  architectural arch from dev, with a fine offset frame.
- Do not add the former paper dot pattern, grain, travel collage or handwritten
  underline. Section accents are simple gold hairlines.
- Keep generous responsive gutters, balanced headings, real photography, visible
  focus rings, 44px minimum selection targets and predictable hover states.

## Homepage composition and behavior

1. Hero: “Ваше будущее — без границ” is the user-supplied two-line headline.
   Supporting copy names grounds and documents for visas, residence and citizenship. The USP
   is a contractual guarantee of meeting deadlines for the agency’s own work.
   The main CTA opens consultation and the quieter link opens services. The Roman
   photograph keeps its arch and rounded lower corners. Its outline follows the same
   geometry with an even 10px gap (8px on mobile).
   A scoped GSAP entrance runs once on mount: title fades up 20px over 0.7s,
   description and guarantee follow with a short stagger, then the primary CTA
   fades in without moving its clickable area. Mobile uses shorter delays.
   Focus or a press on a hero action immediately completes the entrance. Reduced
   motion skips it entirely; changing the preference to reduce finishes it.
   These targets no longer use the shared browser entrance. Other sections and
   the existing arch/photo motion retain their current behavior. There is no route
   ring in the active hero.
2. Country finder: three light rounded cards follow the supplied reference in a
   1:2:1 desktop composition. The wide centre contains a real country search above
   its heading; it opens the catalogue with the query already applied. Smaller
   study and preparation cards use a route illustration and linked process nodes.
   On mobile the search comes first, followed by two side-by-side cards. There is
   no marquee below the block.
3. Services: the existing three-choice selector, live content and detail links.
   The scene follows its content height; manual selection and swipe remain.
   Services no longer change automatically while the visitor scrolls.
4. Destinations: the existing seven-country selector and detail link, presented
   on a navy ground. Gold identifies the selected country.
5. Purpose: the existing six goals, default education selection and program link.
6. Quick consultation: the same task/country/contact/comment/consent flow, with a
   centred heading above a centred form of at most 820px.

## Shared and internal pages

The homepage and internal pages share the full desktop navigation and native
mobile dialog. The homepage header CTA opens its consultation section. Both use a capsule-shaped header container and keep the compact-on-scroll shell and
persistent RU/EN selection. The footer retains the feature branch navigation.

PageKit preserves each page's structure and applies serif hierarchy, restrained
text cards, rounded photographic crops and navy closing panels. Catalogue
search and region filters, FAQ disclosure states and selected controls stay visible.

The programmes catalogue presents all six goals in a compact disclosure grid.
The page has no photos, including its hero. Introductory text, supporting sections
and closing actions use a centred composition. Cards centre their titles, disclosure controls, descriptions,
preparation tips and consultation links. Each card opens in place. Native details support keyboard use and work without
JavaScript; the opening motion respects reduced-motion preferences. Redundant
count headings above the programmes and services catalogues are removed.
The former large campus/study block is removed. Education remains the first
card at /programs#education and keeps its prefilled consultation link. The
header has no separate education item. Legacy education URLs still work.

Thin 44px connector rows link adjacent sections on the homepage and programmes
page.

Standalone panels, text cards, callouts and closing CTAs use a shared panel
radius of 32px, reduced to 24px on mobile. Full-width separator bands retain
their edge-to-edge geometry. Headings name the client task or useful outcome;
counts always correspond to actual content.

Only the detailed /services/residence H1 reads “Вид на жительство”. Catalogue
labels and other mentions of “ВНЖ и ПМЖ” remain unchanged.

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

## Density and photography

Main section padding is 20–28px per side vertically, with 12–24px inside related
groups. No section reserves multiple viewport heights for a short interaction.
Shared internal hero/section padding is 24–28px. Readable article line height and
44px control targets remain. Photos crop inside rounded containers rather than
rounding individual animated image layers.


## Services and about overviews

The user-supplied reference governs compact icon-and-copy rows on /services and /about. Service links form three cards followed by two wider cards on desktop, two columns on tablet and one on mobile. Four informational cards on /about describe what the visitor will understand before applying. Cards use 22px corners, gold line icons and short body copy. These two pages use 48px photo corners on desktop and 28px on mobile, with an explicit rounded clipping mask and inherited corners through the moving layers. Their copy speaks to the visitor’s task and next step. Other page copy remains unchanged. New blocks reuse useJourneyMotion with a capped sibling delay; native links, focus, reduced motion and visible server HTML remain intact.
