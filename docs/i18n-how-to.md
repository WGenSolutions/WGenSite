# i18n How-To

## Folder structure

```
src/
  i18n/
    index.ts          # i18next configuration + language detector wiring
  locales/
    en/
      common.json     # shared UI strings
      home.json       # page-specific content
    pl/
      common.json
      home.json
    fr/
      common.json
      home.json
```

## Adding copy

1. Place shared UI strings (navigation, labels, meta) in `common.json`.
2. Place page/section copy in `home.json`.
3. Keep key namespaces consistent across locales.
4. Use interpolation when dynamic values are needed (e.g. `{{year}}`).

## Loading resources

- `src/i18n/index.ts` imports all JSON files and registers them with i18next.
- `LanguageDetector` checks `localStorage` (`wgen-language`), `sessionStorage`, query string, tag attributes, and browser preferences.

## Using translations in components

- Call `useTranslation(['common', 'home'])` (or specific namespace). Example:
  ```tsx
  const { t } = useTranslation("home");
  const headline = t("hero.title");
  ```
- Access cross-namespace strings via the `namespace:key` syntax (e.g. `t('common:actions.theme')`).
- For arrays, request objects: `t('about.apps', { returnObjects: true })`.

## Persisting language selection

- The language is stored in `localStorage` under `wgen-language`.
- Switching languages via `LanguageSwitcher` triggers `i18n.changeLanguage`, persists the choice, updates `<html lang>` and `og:locale`, and refreshes meta tags.

## Adding a new language

1. Duplicate one locale folder (e.g. `en`) into `src/locales/<new>/`.
2. Translate both `common.json` and `home.json`.
3. Register the new language in `SUPPORTED_LANGS` inside `LanguageSwitcher.tsx` and in the `supportedLngs` array inside `src/i18n/index.ts`.
4. Update README and marketing assets if needed.

## SEO considerations

- `App.tsx` watches language changes to update the document title, description, and OpenGraph meta tags.
- `i18n/index.ts` synchronises `html[lang]` and `meta[property='og:locale']` with the active locale.
