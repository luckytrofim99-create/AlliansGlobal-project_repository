# Copy and UI review — 28 October 2026

Reader: a Russian-speaking visitor comparing a visa, study or relocation route, often without a chosen country.
First-screen argument: visa and relocation preparation produces a sequence of actions; the page shows the service scope and leads to a request for a case review.
Evidence: contractual deadlines for the agency's own work, five service areas, six relocation goals, seven destinations, six preparation stages and sourced journal articles. No invented prices, turnaround times, success rates, clients or partner logos.
Next action: describe the situation and prepare a consultation request. The prototype must continue to disclose that sending is not connected.

## Editorial decisions

- Home: «Визы и переезд с планом действий»; the supporting sentence names grounds, documents and client goals. Primary link: «Разобрать мою ситуацию».
- Services: «Документы для визы и переезда» and «5 задач перед переездом»; show what each service helps the visitor prepare.
- Programmes: «Документы для учёбы и переезда»; embed the study section before five other goals. Remove the separate education page and navigation item; redirect old URLs to /programs#education.
- About: «Условия переезда в договоре»; explain scope, deadlines and family considerations.
- Approach: «6 этапов вашего обращения»; make responsibilities and limits visible.
- Countries: preserve actual destination names and specific preparation questions; use «7 направлений для переезда» for the catalogue rather than calling Europe a country.
- Journal: shorten long topic headings while retaining the supplied article body text, dates and sources. Replace generic surrounding calls to action with a clear request for a case review.
- Contacts and form: explain how to prepare the request without implying an actual submission.

## Visual decisions

Retain the navy/ivory/gold system and soft capsules. Use a quiet light icon-and-type marquee inspired by the supplied logo strip; the marks represent real relocation goals, not affiliations. Match the hero outline to the photograph with an even gap. Apply shared rounded-panel tokens to closing panels, text cards, callouts and the form. Centre the form heading above the form.

## Client journey review

- Where am I? The first screen names visas and relocation, then grounds, documents and client goals.
- What will help me? Service scope, destination selectors and goal sections explain what to prepare and what needs individual checking.
- What can I learn? Seven destinations, six goals, five service areas and twelve practical articles offer specific paths rather than repeated slogans.
- Why trust it? Contractual preparation deadlines, visible scope and costs, the government-decision FAQ and dated article sources. No invented partners, client counts or success claims.
- What next? The same case-review action leads to the short form; education and country links retain context. The prototype remains explicit about the lack of sending and offers a local draft.

## Verification

- ESLint, TypeScript and production build passed.
- Production smoke check: 36 page requests, 37 assets, four expected 404 routes. The legacy education route returns a 307 to /programs#education.
- Browser review covered 1440px desktop and 390px / 320px mobile. The programmes and about pages have no headings over two lines at 320px after shortening copy. Main hero occupies two headline lines at 390px. No horizontal overflow was observed on the reviewed pages.
- Hero crop and outline use matching circular crowns with an even 10px gap on desktop and 8px on mobile.
- The consultation heading and form share the same 820px centred measure on desktop. Closing panels use 32px desktop / 24px mobile corners.
- Supplied article body paragraphs, sources, source files, dates and all non-heading data were compared with HEAD and remain identical.
- Marquee keeps its native pause button, one accessible topic list and decorative repeated marks. Reduced-motion CSS renders a single static wrapped group. No new dependency was installed.
