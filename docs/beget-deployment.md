# Beget deployment

Primary site: `https://allianceglobal.online`.
The former `denide0m.beget.tech` domain is unlinked from this site.
Beget manages the Let's Encrypt certificate and HTTP-to-HTTPS redirect.

The application uses Next.js 16, React 19 and Node.js 24.15.0. Apache
Passenger starts the deployment's `server.cjs` in production mode.
Builds run in Beget's Docker environment, with `CIRCLE_NODE_TOTAL=2` to
limit Next.js build workers. Each release is built separately before
switching `PassengerAppRoot` and the public asset symlinks.

## CDN

Dedicated service: `Alliance Global CDN`.
Service ID: `33c9629f-ebbe-47ba-8778-8c6ed5710b6a`.
Endpoint: `https://quoswobenoukeru.begetcdn.cloud`.
Origin: `allianceglobal.online`, HTTP with origin redirect following enabled.
The origin redirects to HTTPS. The CDN uses Beget's global nearest-node
routing, including European points of presence; there is no Europe-only
priority setting exposed by this service.

Use these variables both during the build and in the production process:

```sh
NEXT_PUBLIC_SITE_URL=https://allianceglobal.online
NEXT_PUBLIC_CDN_URL=https://quoswobenoukeru.begetcdn.cloud
```

`assetPrefix` routes Next.js JavaScript, CSS and bundled fonts through CDN.
`images.path` routes optimized image requests through CDN. Public assets
referenced directly by `/images/...` and social preview images remain
available on the primary domain. Page navigation and form state use the
primary domain. Without `NEXT_PUBLIC_CDN_URL`, assets use the origin.

CDN caching keeps query parameters distinct, including image `url`, `w`
and `q`. CORS allows the primary domain and its www alias. Compression,
HTTPS delivery and stale delivery on origin failures are enabled.
CDN traffic is billed separately by Beget.

Enable the CDN variable only after the endpoint serves assets successfully.
After switching a release, verify HTML, optimized images, CSS, fonts,
JavaScript, canonical/Open Graph URLs and browser console errors.
