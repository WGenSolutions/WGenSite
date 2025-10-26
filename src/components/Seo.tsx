import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://wgen.it/'
const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  pl: 'pl_PL',
}
const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/wgensolutions',
  'https://github.com/WGenSolutions',
]
const DEFAULT_EMAIL = 'wgen.solutions@gmail.com'
const sharedImage = `${SITE_URL}images/logo.svg`
const GA_MEASUREMENT_ID = 'G-3690LFEG71'

/**
 * Renders localized SEO metadata to expose all language variants to crawlers.
 */
export function Seo() {
  const { t: _t, i18n: _i18n } = useTranslation(['common'])
  const _location = useLocation()
  const _language = (_i18n.resolvedLanguage || _i18n.language || 'en').split('-')[0]
  const _title = _t('common:meta.title')
  const _description = _t('common:meta.description')
  const _keywords = _t('common:meta.keywords', { defaultValue: '' })
  const _siteName = _t('common:brand.name')
  const _ogImageAlt = _t('common:meta.ogImageAlt', { defaultValue: '' })
  const _twitterHandle = _t('common:meta.twitterHandle', { defaultValue: '' })
  // Derives the localized slug for reuse across canonical and alternate URLs.
  const _slug = useMemo(() => {
    const _normalizedPath = _location.pathname.replace(/^\/+/u, '').replace(/\/+$/u, '')
    return _normalizedPath
  }, [_location.pathname])
  const _canonicalBase = useMemo(() => {
    if (_slug.length === 0) {
      return SITE_URL
    }
    return `${SITE_URL}${_slug}/`
  }, [_slug])
  const _canonicalUrl = useMemo(() => {
    const _encodedLanguage = encodeURIComponent(_language)
    return `${_canonicalBase}?lang=${_encodedLanguage}`
  }, [_canonicalBase, _language])
  const _locale = OG_LOCALE[_language] ?? OG_LOCALE.en
  // Builds hreflang-aware alternates for every supported language.
  const _alternateLinks = useMemo(
    () =>
      Object.entries(OG_LOCALE).map(([_lng, _ogLocaleCode]) => {
        const _encodedLanguage = encodeURIComponent(_lng)
        const _href = `${_canonicalBase}?lang=${_encodedLanguage}`
        return {
          hrefLang: _lng,
          href: _href,
          ogLocale: _ogLocaleCode ?? OG_LOCALE.en,
        }
      }),
    [_canonicalBase],
  )
  // Ensures search engines treat the English variant as the default language.
  const _xDefaultAlternate = useMemo(() => {
    const _englishAlternate = _alternateLinks.find((_link) => _link.hrefLang === 'en')
    return _englishAlternate?.href ?? `${SITE_URL}`
  }, [_alternateLinks])

  const _structuredData = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: _siteName,
        url: _canonicalUrl,
        description: _description,
        logo: `${SITE_URL}logo.svg`,
        sameAs: SOCIAL_PROFILES,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: DEFAULT_EMAIL,
            availableLanguage: ['en', 'pl'],
          },
        ],
      }),
    [_canonicalUrl, _description, _siteName],
  )

  return (
    <Helmet>
      <html lang={_language} data-locale={_language} />
      <title>{_title}</title>
      <meta name="description" content={_description} />
      {_keywords && <meta name="keywords" content={_keywords} />}
      <meta name="robots" content="index,follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />
      <meta property="og:url" content={_canonicalUrl} />
      <meta property="og:site_name" content={_siteName} />
      <meta property="og:locale" content={_locale} />
      <meta property="og:image" content={sharedImage} />
      {_alternateLinks
        .filter((_link) => _link.ogLocale !== _locale)
        .map((_link) => (
          <meta key={`og-locale-${_link.hrefLang}`} property="og:locale:alternate" content={_link.ogLocale} />
        ))}
      {_ogImageAlt && <meta property="og:image:alt" content={_ogImageAlt} />}
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={_title} />
      <meta name="twitter:description" content={_description} />
      <meta name="twitter:image" content={sharedImage} />
      {_twitterHandle && <meta name="twitter:creator" content={_twitterHandle} />}
      <link rel="canonical" href={_canonicalUrl} />
      {_alternateLinks.map((_link) => (
        <link key={_link.hrefLang} rel="alternate" hrefLang={_link.hrefLang} href={_link.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={_xDefaultAlternate} />
      <script type="application/ld+json">{_structuredData}</script>
      {GA_MEASUREMENT_ID ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: [
                'window.dataLayer = window.dataLayer || [];',
                'function gtag(){dataLayer.push(arguments);}',
                "gtag('js', new Date());",
                `gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`,
              ].join('\n'),
            }}
          />
        </>
      ) : null}
    </Helmet>
  )
}

export default Seo
