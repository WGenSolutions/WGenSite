import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const SUPPORTED_LANGS: Array<{ value: string; labelKey: `common:languages.${string}` }> = [
  { value: 'en', labelKey: 'common:languages.en' },
  { value: 'pl', labelKey: 'common:languages.pl' },
]

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation(['common'])
  const current = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]

  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span className="flex items-center gap-1 text-foreground">
        <Globe className="h-4 w-4" aria-hidden="true" />
      </span>
      <select
        className="rounded-xl border border-white/10 bg-background/80 px-3 py-1 text-sm text-foreground transition hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        value={current}
        onChange={(event) => {
          void i18n.changeLanguage(event.target.value)
        }}
        aria-label={t('actions.language')}
      >
        {SUPPORTED_LANGS.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {t(lang.labelKey)}
          </option>
        ))}
      </select>
    </label>
  )
}

export default LanguageSwitcher
