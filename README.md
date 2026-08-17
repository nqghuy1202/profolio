# Portfolio — Huy Nguyen Quoc Gia

Personal portfolio site. Next.js 16 (App Router), TypeScript and Tailwind CSS v4, deployed on Vercel.

Live: _(add the URL once it is deployed)_

## Running it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The root path redirects to `/en`.

```bash
npm run build   # production build
npm run lint    # eslint
```

Environment variables are all optional — see `.env.example`. The site works without any of them.

## Structure

```
src/
├─ app/
│  ├─ [locale]/               # /en and /vi, both prerendered
│  │  ├─ layout.tsx           # fonts, metadata, header, footer
│  │  ├─ page.tsx             # home: hero + four sections
│  │  ├─ work/[slug]/page.tsx # one page per project
│  │  └─ opengraph-image.tsx
│  ├─ global-not-found.tsx    # 404, bilingual, renders its own document
│  ├─ fonts.ts                # shared next/font declarations
│  ├─ robots.ts · sitemap.ts
│  └─ globals.css             # design tokens + typographic primitives
├─ components/
│  ├─ layout/                 # Header, Footer
│  ├─ sections/               # Hero, WorkIndex, Skills, About, GitHubStats, Contact
│  └─ ui/                     # Container, Section, Reveal
├─ data/                      # profile, skills, projects, feature flags
├─ i18n/                      # en.json, vi.json, and the loader
└─ lib/                       # GitHub API client
```

Content and code are kept apart on purpose. Everything that reads as a sentence lives in `src/i18n/*.json`; everything that stays the same in both languages — technology names, links, URL slugs, project metadata — lives in `src/data/`.

## Design

The visual language is print editorial: paper background, ink text, one accent colour, structure carried by hairline rules and whitespace. Three rules hold it together — **no rounded corners, no drop shadows, and the accent is used to mark, never to fill.** Section rules run to the edge of the viewport while text stays inside the measure; that contrast is what makes a page read as typeset rather than assembled from cards.

Type is split three ways: Archivo for everything readable, IBM Plex Mono for labels and technical strings, and Instrument Serif italic for numerals only — the serif needs no Vietnamese diacritics because it never sets anything but digits.

## Engineering notes

**No i18n library.** Two languages and one route shape do not need one. The `[locale]` segment plus two JSON files covers it, and typing the dictionary map as `Record<Locale, Dictionary>` — where `Dictionary` is inferred from the English file — turns a missing translation into a compile error rather than a blank space on the page.

**Server Components by default.** The header is the only part of the page that runs in the browser, because the mobile menu is the only thing that needs state. It receives its text as props, so neither dictionary is shipped to the client.

**Design tokens in `:root`, bridged into Tailwind.** Colours, radii and widths are declared once as CSS custom properties and exposed through `@theme inline`. Hand-written CSS — the architecture diagram, the scrollbar, the underline animation — reads the same variables, so there is one source of truth instead of two.

**Everything is static.** `generateStaticParams` prerenders both locales and all fourteen project pages at build time, and `dynamicParams = false` means an unknown locale or slug falls through to a prerendered 404 rather than being rendered on demand. There is no API route and no server work at request time — every response is a file.

**Contact is three links, not a form.** A form needs an endpoint, an email provider, a key to keep secret and rate limiting to stop the key being abused. For three addresses that never change, the links carry the same information and none of the operational weight.

**The architecture diagram is inline SVG.** The system it describes is internal company software, so there is no screenshot to take. A diagram also explains something a screenshot could not: why the browser never calls the internal service directly.

## Licence

Source code is MIT. The written content, CV and personal images are not — please do not reuse them.
