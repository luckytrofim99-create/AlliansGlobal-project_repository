/** Run against a running local build: npm test -- http://localhost:3001 */
import assert from "node:assert/strict";
const base = process.argv[2] || "http://localhost:3000";
const routes = [
  "/",
  "/about",
  "/approach",
  "/consultation",
  "/consultation?country=canada",
  "/contacts",
  "/countries",
  "/programs",
  "/services",
  "/journal",
  "/privacy",
  ...["visas", "residence", "citizenship", "consulting", "complex-cases"].map(
    (s) => `/services/${s}`,
  ),
  ...[
    "canada",
    "usa",
    "europe",
    "uk",
    "australia",
    "new-zealand",
    "south-korea",
  ].map((s) => `/countries/${s}`),
  ...[
    "uk-student-visa",
    "us-b1-b2-visa",
    "canada-express-entry",
    "schengen-visa",
    "australia-skilled-visas",
    "new-zealand-aewv",
    "south-korea-k-eta",
    "eu-blue-card-germany",
    "where-to-start",
    "first-consultation",
    "moving-with-family",
    "clear-scope",
  ].map((s) => `/journal/${s}`),
];
const assets = new Set();
const stylesheets = new Set();
for (let i = 0; i < routes.length; i += 5) {
  await Promise.all(
    routes.slice(i, i + 5).map(async (route) => {
      const response = await fetch(new URL(route, base));
      assert.equal(response.status, 200, `${route}: HTTP status`);
      const html = await response.text();
      assert.equal(
        (html.match(/<h1[ >]/g) || []).length,
        1,
        `${route}: exactly one h1`,
      );
      assert.match(html, /<html[^>]+lang="ru"/, `${route}: Russian language`);
      assert.match(
        html,
        /<meta name="robots" content="noindex, nofollow"/,
        `${route}: prototype stays out of search`,
      );
      for (const match of html.matchAll(/(?:src|href)="([^"\s]+)"/g)) {
        const url = new URL(match[1].replaceAll("&amp;", "&"), base);
        if (url.origin === new URL(base).origin) {
          if (
            /\.(?:jpg|png|svg|woff2|docx)$/.test(url.pathname) ||
            url.pathname === "/_next/image"
          )
            assets.add(url.href);
          if (url.pathname.endsWith(".css")) stylesheets.add(url.href);
        }
      }
      if (route === "/consultation?country=canada")
        assert.ok(
          html.includes('"initialCountry":"canada"') ||
            html.includes('\\"initialCountry\\":\\"canada\\"'),
          "Country context is passed to the interactive form",
        );
    }),
  );
}
await Promise.all(
  [...stylesheets].map(async (url) => {
    const response = await fetch(url);
    assert.equal(response.status, 200, `Stylesheet: ${url}`);
    const css = await response.text();
    for (const match of css.matchAll(/url\(["']?([^"')]+\.woff2)["']?\)/g))
      assets.add(new URL(match[1], url).href);
  }),
);
await Promise.all(
  [...assets].map(async (url) => {
    const response = await fetch(url);
    assert.equal(response.status, 200, `Asset: ${url}`);
  }),
);
for (const route of [
  "/not-a-route",
  "/services/unknown",
  "/countries/unknown",
  "/journal/unknown",
]) {
  const response = await fetch(new URL(route, base));
  assert.equal(
    response.status,
    404,
    `${route}: unknown routes should return 404`,
  );
}
console.log(
  `PASS: ${routes.length} page requests, ${assets.size} assets, 4 not-found routes.`,
);
