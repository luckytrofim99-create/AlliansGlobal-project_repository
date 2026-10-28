# Education and homepage interlude — 28 October 2026

## Delivered

- Moved the campus photograph, study introduction, three preparation rows and consultation action from the homepage to `/education`.
- Linked education from the shared navigation, footer, related goals, programmes and country pages. Legacy `/#education` links redirect to the new page.
- Added a compact navy homepage separator with an architectural backdrop, three preparation checks and a scrolling topic row. The former large process block was removed to avoid repeating the same preparation content.
- Changed only the detailed `/services/residence` H1 to «Вид на жительство». Service catalogue labels, metadata and other mentions remain unchanged.

## Verification

- ESLint, TypeScript and production build pass.
- Production smoke check passes: 36 page requests, 37 assets and four expected not-found routes.
- Browser review at 1440, 768, 390 and 320 CSS pixels: no horizontal overflow. The education page has one H1 and the campus photograph uses 48px desktop / 28px mobile corners.
- The education action opens consultation with Education selected.
- Catalogue label remains «ВНЖ и ПМЖ»; detailed page H1 reads «Вид на жительство».
- Marquee pause freezes its transform; the native button resumes it with the Space key. It also pauses when the band is outside the viewport.
- The accessible topic list occurs once. Repeated moving copies are decorative and contain no links. The pause target is 44px with a visible focus ring.
- Reduced-motion CSS reviewed: animation is removed, one topic group wraps as static text and the pause control is hidden. OS reduced-motion emulation was not available in the current browser tools.

Composition follows the existing PRODUCT.md / DESIGN.md and the local impeccable layout, motion and craft guidance. The unavailable impeccable launcher was not used; verification was performed manually and with the existing project checks.
