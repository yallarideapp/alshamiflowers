# Al Shami Flowers — v2

A new Arabic-first, bilingual floral website, designed and implemented independently of the previous site.

## Website

https://yallarideapp.github.io/alshamiflowers/

GitHub Pages publishes the compiled `docs/` folder from the `v2` branch. Regenerate it after source changes with `npm run build:pages`, then commit the updated source and `docs/` together. The previous website remains in `main`.

## Open on your Mac

Double-click `START-V2.command`. It serves the included production build at http://127.0.0.1:5174 and opens it in your browser. Node.js 22.12+ is required. Close the Terminal window or press Control-C to stop it.

The `dist/` folder is included in the local delivery and ZIP. It is generated, so it is excluded from Git. To recreate it from GitHub:

```sh
npm ci
npm run build
```

## Develop

```sh
npm ci
npm run dev
```

`npm run build` creates the static production files. The build uses relative asset URLs, so it can be served from a repository subdirectory. Serve it over HTTP; opening `index.html` directly with a `file:` URL does not support module loading reliably.

## Features

- Arabic RTL and English LTR, with a saved language preference and explicit language navigation URLs.
- Animated headline entrance, floral image reveal, desktop scroll parallax, botanical line drawing, section reveals, and hover feedback. Reduced-motion preferences disable movement.
- Six floral designs, category and occasion filters, searchable design details, and a saved inspiration selection with quantity controls.
- Native accessible dialogs with keyboard focus, Escape dismissal, mobile navigation, and a skip link.
- Responsive layouts checked at 320, 390 and 1440 pixels.
- Arabic and English Privacy Policy and Terms pages.
- Self-hosted fonts and photographs; no remote embeds or tracking scripts.

## Scope and content

This version is a showcase and enquiry website, with phone and Instagram contact. Selections are saved only on the visitor’s device. Copying a selection does not submit an order. No customer accounts, live inventory, checkout, payment processing, or receiving backend are connected.

No prices, reviews, sales figures, opening hours, delivery guarantees, or commercial policies have been invented. The shop must confirm availability, price/currency, payment, delivery, substitutions, cancellations, returns, and its conversation-retention practices. The legal text should be reviewed by the owner before public launch. This is not legal advice; I’m not a lawyer.

The original business photos were sourced independently from the Instagram media archive for `@alshami.flowers`. The hero is newly generated illustrative floral art, identified as such in the site’s footer and Terms. Design names and editorial copy are new, illustrative writing. Fonts use their bundled open font licences; licence copies are in `licenses/`.

Business information: @alshami.flowers; Irbid, Jordan; +962 790 676 747. Public corroboration: https://www.bizmideast.com/JO/al-shami-flowers-07-7788-7108 . Jordan privacy source: https://modee.gov.jo/EN/Pages/Services . Direct Instagram fetching was restricted; existing original business media supplied the photos and business contact card.

Search indexing is disabled for this design version (`noindex`, `robots.txt`). A production sitemap and canonical URLs require the final public origin and should be generated when the owner launches the site. Privacy and Terms are real HTML entry points; language is selected with `?lang=ar` or `?lang=en`.

## Version separation

Local folder: `Al-Shami Flowers v2`, beside the previous project.

GitHub: `yallarideapp/alshamiflowers`, branch `v2`. The existing default branch is preserved. This branch contains the fresh v2 implementation.
