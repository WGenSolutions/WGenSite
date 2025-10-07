# Architecture Overview

## Tech stack

- **Framework:** React 19 + Vite (Rolldown) with TypeScript strict mode.
- **Styling:** Tailwind CSS 3 with CSS custom properties for theming.
- **Animations:** framer-motion with prefers-reduced-motion safeguards.
- **Internationalisation:** i18next with browser language detection and React bindings.
- **Forms & Validation:** React Hook Form wired to Zod via `@hookform/resolvers`.
- **Icons:** lucide-react.

## Application layout

- `App.tsx` orchestrates theming, internationalisation metadata, navigation state, and renders the one-page sections.
- `components/Header.tsx` renders the sticky navigation with active link tracking, theme toggle, and language selector. Mobile navigation uses animated expansion.
- `components/Footer.tsx` repeats quick-access controls and provides legal/social links.
- `components/Section.tsx` standardises section spacing, scroll offset, and entry animation.
- `components/Card.tsx` provides consistent service/product cards.
- `components/LanguageSwitcher.tsx` encapsulates locale selection for reuse.

## Sections

Each section lives in `src/sections/` and focuses on scoped copy + layout:

- `Hero` draws attention with CTA buttons, gradient background, and animated ambient shapes.
- `Offer` lists main services using `Card` components.
- `Products` emphasises the Automation Center product with feature bullets and CTA.
- `Experience` and `About` provide narrative content and a modal for selected apps.
- `Hobby` teases side projects and funnels to the proposal form.
- `ProposeForm` handles validated user input and submission feedback.

## Hooks

- `useActiveSection` observes section intersections to highlight the current navigation item.

## Theming

- CSS variables (`--color-*`) define the neon gradient palette.
- `App.tsx` resolves the preferred theme (`light`, `dark`, `system`) and applies the `dark` class to the `html` element for Tailwind. Preference persists in `localStorage`.

## Asset pipeline

- Custom logo and favicon live in `public/`.
- Fonts are fetched from Google Fonts (`Plus Jakarta Sans`).

## Build & quality gates

- Tailwind compiled via PostCSS.
- Husky pre-commit hook runs ESLint (with Prettier) and TypeScript type-check (`pnpm lint-staged`, `pnpm typecheck`).
- Scripts in `package.json` cover dev server, build, preview, lint, typecheck, and formatting.
