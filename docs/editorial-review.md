# Capsule menu and editorial pass — dev2

The header container now uses a 999px capsule radius on the homepage and internal
pages, including its compact scroll state. The native mobile menu keeps its
layout with rounded 28px corners and the concise title “Меню”.

Headings identify a client task, preparation step or question. Commas were removed
by rewriting sentences. Decorative metaphors, introductory phrases and repeated
instructions were shortened across the homepage, service and country pages,
programmes, journal, consultation, contacts, company and process pages.

| Before | After | Purpose |
| --- | --- | --- |
| Новые координаты вашей жизни | Выберите страну для переезда | Choose a destination |
| Не просто документы. Начало новой главы | Подготовьте документы под цель поездки | Explain visa preparation |
| Рядом на каждом этапе | Узнайте порядок работы | Lead to the support process |
| Понимать, как мы движемся вместе | Уточните условия до начала работы | Resolve scope uncertainty |
| Переезд начинается с цели, а не со страны | Как выбрать страну для переезда | State the guide’s question |

Country heroes no longer repeat generic preparation and approach labels. The
homepage omits redundant introductory text. The form retains its real validation
and local-draft behaviour with shorter status messages. Existing routes, query
prefill, selectors and service limitations remain; no outcomes or commercial
terms were invented. Corresponding existing English copy was updated.

Used Impeccable clarify and polish guides. The context launcher could not execute
because its local executable permission is absent, so PRODUCT.md and DESIGN.md
were read directly under the documented fallback.

Validation:

- Full lint, TypeScript and production build passed.
- Smoke checks: 27 page requests, 29 assets and four unknown-route responses passed.
- A rendered HTML audit covered 425 headings across 27 routes, including 404;
  no heading contains a comma. Content data titles and FAQ questions also passed.
- Desktop 1440px and mobile 320px/390px checked. Representative long service and
  country headings fit without horizontal page overflow.
- The compact header measured 680×56px with a 999px radius.
- Mobile menu opens and closes with Escape; focus returns to its trigger.
- Revised homepage copy responds to RU/EN selection. Existing server-rendered
  localisation limitations are outside this editorial pass.
