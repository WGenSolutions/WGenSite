# WGen — Software · AI Automation · Web Dev# React + TypeScript + Vite

> Production-ready, multilingual landing page for the WGen team.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

The site is built with React, Vite (Rolldown), and Tailwind CSS. It features bilingual navigation (English/Polish with French fallback), a neon gradient theme, smooth section scrolling, and a validated "Propose an app" form.Currently, two official plugins are available:

## ✨ Highlights- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- Sticky, scroll-aware navigation with active section highlighting- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- Light/dark/system theming with persistence and reduced-motion aware animations

- Complete English, Polish, and French translations with automatic language detection## React Compiler

- CTA-driven sections covering Offer, Products, Experience, About, Hobby, and Proposal form

- Form validation powered by Zod + React Hook Form with optional Formspree integrationThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- Accessibility-friendly focus states, aria labels, and semantic structure

- Ready-to-run Husky pre-commit hook (lint + typecheck) and Prettier formatting## Expanding the ESLint configuration

## 🧱 Project structureIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js

src/export default defineConfig([

  components/        # Header, Footer, cards, shared UI pieces  globalIgnores(['dist']),

  sections/          # Hero → ProposeForm section components  {

  hooks/             # useActiveSection intersection observer    files: ['**/*.{ts,tsx}'],

  i18n/              # i18next initialisation    extends: [

  locales/           # en/pl/fr translation bundles      // Other configs...

  styles/globals.css # Tailwind base + CSS variables

public/      // Remove tseslint.configs.recommended and replace with this

  favicon.svg      tseslint.configs.recommendedTypeChecked,

  logo.svg      // Alternatively, use this for stricter rules

```      tseslint.configs.strictTypeChecked,

      // Optionally, add this for stylistic rules

Additional documentation is available in [`docs/architecture-overview.md`](./docs/architecture-overview.md) and [`docs/i18n-how-to.md`](./docs/i18n-how-to.md).      tseslint.configs.stylisticTypeChecked,



## 🚀 Getting started      // Other configs...

    ],

> Requires [Node.js](https://nodejs.org/) ≥ 18 and [pnpm](https://pnpm.io/) ≥ 8 (`npm install -g pnpm`).    languageOptions: {

      parserOptions: {

```powershell        project: ['./tsconfig.node.json', './tsconfig.app.json'],

pnpm install        tsconfigRootDir: import.meta.dirname,

pnpm dev      },

# open http://localhost:5173      // other options...

```    },

  },

## 📦 Scripts])

```

| Script | Purpose |

| --- | --- |You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

| `pnpm dev` | Start the Vite dev server |

| `pnpm build` | Type-check (`tsc -b`) and build the production bundle |```js

| `pnpm preview` | Preview the built site locally |// eslint.config.js

| `pnpm lint` | Run ESLint with zero-warning policy |import reactX from 'eslint-plugin-react-x'

| `pnpm typecheck` | Run TypeScript in `--noEmit` mode |import reactDom from 'eslint-plugin-react-dom'

| `pnpm format` | Format all supported files with Prettier |

export default defineConfig([

The Husky `pre-commit` hook runs `pnpm lint-staged` followed by `pnpm typecheck`.  globalIgnores(['dist']),

  {

## 🌐 Environment variables    files: ['**/*.{ts,tsx}'],

    extends: [

| Variable | Description |      // Other configs...

| --- | --- |      // Enable lint rules for React

| `VITE_FORMSPREE_FORM_ID` | Optional Formspree form ID (`https://formspree.io/f/<id>`). When omitted, submissions are mocked and logged to the console.      reactX.configs['recommended-typescript'],

      // Enable lint rules for React DOM

Create a `.env` file in the project root if you want to submit to a live Formspree endpoint:      reactDom.configs.recommended,

    ],

```dotenv    languageOptions: {

VITE_FORMSPREE_FORM_ID=your-form-id      parserOptions: {

```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

## 🌍 Internationalisation      },

- i18next auto-detects the browser language and persists the manual choice in `localStorage`.      // other options...

- The `<html lang>` attribute, `og:locale`, document title, and meta description update whenever the language changes.    },

- Translation keys are namespaced (`common`, `home`). See [`docs/i18n-how-to.md`](./docs/i18n-how-to.md) for guidance on adding copy.  },

])

## 🧪 Quality checks```

- ESLint (TypeScript + React Hooks + Prettier) enforced via script and pre-commit hook
- TypeScript strict mode (`tsconfig.app.json`)
- Tailwind CSS with custom design tokens and reduced-motion guardrails

## 📄 Deployment
1. `pnpm build`
2. Deploy the generated `dist/` directory to your static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).
3. Ensure `VITE_FORMSPREE_FORM_ID` is configured in your deployment environment if you plan to capture submissions.

## 📘 Credits
- Logo adapted for this project (`public/logo.svg`).
- Icons provided by [lucide.dev](https://lucide.dev/).
````
