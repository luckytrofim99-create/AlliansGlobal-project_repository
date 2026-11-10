# Button UI review — dev2

## Scope

The user explicitly invoked six skills to correct inconsistent buttons. The user selected
«Мягкий — капсулы с тактильным откликом» from three working prototypes.
That system is integrated across dev2, replacing scattered implementations.

## Authoritative skills restored locally

Skills live in `.agents/skills/`, which is ignored by Git. These are the current
author versions, not the unknown historical ASG bundle revision.

| Skill | Author source |
| --- | --- |
| design-taste-frontend | https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill |
| impeccable | https://github.com/pbakaus/impeccable/tree/main/.claude/skills/impeccable |
| emil-design-eng | https://github.com/emilkowalski/skills/tree/2d228630ba1446365f614a108cb8252f1feda202/skills/emil-design-eng |
| apple-design | https://github.com/emilkowalski/skills/tree/2d228630ba1446365f614a108cb8252f1feda202/skills/apple-design |
| pick-ui-library | https://github.com/emilkowalski/skills/tree/2d228630ba1446365f614a108cb8252f1feda202/skills/pick-ui-library |
| prototype | https://github.com/emilkowalski/skills/tree/2d228630ba1446365f614a108cb8252f1feda202/skills/prototype |

The Impeccable launcher did not execute because the archive omitted its executable
permission. Its documented fallback was used: PRODUCT.md, DESIGN.md, the polish
playbook and craft floor were read directly. No global tool or skill installation
was required. The explicit taste component exception preserves the incumbent
brand and skips a random page-direction draw.

## Findings and correction

| Before | Implemented | Why |
| --- | --- | --- |
| Five independently styled CTA implementations | One shared button/link system | Same action should look and respond consistently |
| 12–15px labels and 44–56px heights vary by location | Consistent default and deliberate compact size | Hierarchy and legibility |
| Secondary actions mix gold fills and outline controls | A coherent primary, secondary and quiet hierarchy | Distinguish role from placement |
| Separate hover colors and inconsistent feedback | Pointer-down response, keyboard focus, touch-safe hover and reduced motion | Predictability and accessibility |

No new dependency is needed for button feedback. Use CSS for simple hover/press
and the installed Motion library only where an existing layout interaction
requires a spring. Keep native button/link/form semantics.

## Isolated directions

- Тихий: compact and restrained, softer corners, centered label.
- Чёткий: rectilinear editorial composition, left label and horizontal arrow.
- Мягкий: tactile capsule controls and grouped selected-state feedback.

All directions preserve the current palette, Cormorant headings, Manrope UI copy,
working local interactions and responsive behavior. Picker chrome is copied from
the prototype skill verbatim; variants switch instantly and URL selection persists.

The temporary prototype route was removed after selection, as required by the
prototype skill. Production preview: http://127.0.0.1:3002/

## Verification before selection

- ESLint on app/prototypes/buttons: passed.
- TypeScript (noEmit, incremental false): passed.
- Next production build including /prototypes/buttons: passed.
- All three variants rendered and switched in the browser.
- URL selection survived reload; exactly one picker choice is current.
- Local tab arrow navigation does not switch prototype variants.
- Form contact and consent errors, valid state and enabled draft control checked.
- 320px: all three variants have no horizontal page overflow; 390px also checked.
- Browser error log was empty. Temporary viewport override was reset.

## Integrated coverage

- Shared ActionLink and ActionButton supply primary, secondary, light and quiet roles.
- Homepage hero, services, destinations, goals and process use the shared system.
- Header and mobile menu, PageKit links and closing panels, catalogue reset and
  consultation submit/download actions use the same system.
- Language, service, country, goal and catalogue selections have rounded shapes;
  contact controls and fields use a consistent 10px radius.
- Text, hrefs, selected-state logic, translations, validation and draft behavior
  are preserved. Cards and editorial page structure remain unchanged.
- Full-width form and dialog placements have explicit parent specificity so CSS
  load order cannot override their width.

## Final verification

- Full ESLint and TypeScript checks passed.
- Next production build passed; the temporary prototype route is absent.
- Route smoke checks passed: 27 page requests, 29 assets and four not-found routes.
- Browser checks covered service/country/goal selection, contact and consent
  validation, valid local-draft feedback, catalogue empty-state reset, mobile menu
  open/close, Escape focus return, and translated header/menu actions.
- Homepage and form checked at 320px and 390px with no horizontal page overflow.
- Shared default/compact action heights, capsule radii and light-on-dark action
  colors verified from computed browser styles.
- Browser error log was empty. Viewport override reset; main dev2 preview remains
  open. Test form input cleared by navigation; prototype tab closed.
- Screenshots saved: dev2-soft-buttons-desktop.png and dev2-soft-buttons-mobile.png
  in the task visualization folder.
