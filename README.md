# Portfolio — Huy Nguyen Quoc Gia

Personal portfolio site. Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4, deployed on Vercel.

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
│  ├─ [locale]/            # /en and /vi, both prerendered at build time
│  │  ├─ layout.tsx        # root layout: fonts, metadata, header, footer
│  │  ├─ page.tsx          # composes the five sections
│  │  └─ opengraph-image.tsx
│  ├─ api/contact/         # contact form endpoint
│  └─ globals.css          # design tokens + base styles
├─ components/
│  ├─ layout/              # Header, Footer
│  ├─ sections/            # Hero, Skills, Projects, About, GitHubStats, Contact
│  └─ ui/                  # Container, Section, icons
├─ data/                   # language-neutral content: profile, skills, projects
├─ i18n/                   # en.json, vi.json, and the loader
└─ lib/                    # GitHub API client
```

Content and code are kept apart on purpose. Everything that reads as a sentence lives in `src/i18n/*.json`; everything that stays the same in both languages — technology names, links, project metadata — lives in `src/data/`.

## Design decisions

**No i18n library.** Two languages and one route do not need one. The `[locale]` segment plus two JSON files covers it, and the `Record<Locale, Dictionary>` type turns a missing translation into a compile error rather than a blank space on the page.

**Server Components by default.** Only two components run in the browser: the header, because the mobile menu needs state, and the contact form. Both receive their text as props, so neither dictionary is shipped to the client.

**Design tokens in `:root`, bridged into Tailwind.** Colours, radii and the content width are declared once as CSS custom properties, then exposed to Tailwind through `@theme inline`. Hand-written CSS — the architecture diagram, the scrollbar — reads the same variables, so there is a single source of truth rather than two.

**Both pages are static.** `generateStaticParams` prerenders `/en` and `/vi` at build time. No server runs when someone opens the site, and the content is in the HTML for anyone reading it without JavaScript.

**Validation happens twice.** The contact form checks input in the browser for fast feedback, and the API route checks it again — the endpoint can be called directly, so the browser's answer is not evidence.

**The architecture diagram is inline SVG.** The system it describes is internal company software, so there is no screenshot to take. A diagram also explains something a screenshot could not: why the browser never calls the internal service directly.

## Licence

Source code is MIT. The written content, CV and personal images are not — please do not reuse them.
