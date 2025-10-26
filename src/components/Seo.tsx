import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://wgen.it/'
const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  pl: 'pl_PL',
}
const LANGUAGE_ROUTE_SEGMENTS: Record<string, string> = {
  en: 'en',
  pl: 'pl',
}
const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/wgensolutions',
  'https://github.com/WGenSolutions',
]
const DEFAULT_EMAIL = 'wgen.solutions@gmail.com'
const sharedImage = `${SITE_URL}images/logo.svg`
const GA_MEASUREMENT_ID = 'G-3690LFEG71'

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
  const _canonicalUrl = useMemo(() => {
    const _pathSegments = _location.pathname.split('/').filter(Boolean)
    const _slugSegments = _pathSegments.slice(1)
    const _languageSegment = LANGUAGE_ROUTE_SEGMENTS[_language] ?? LANGUAGE_ROUTE_SEGMENTS.en
    const _slug = _slugSegments.join('/')
    const _baseUrl = `${SITE_URL}${_languageSegment}`
    if (_slug.length === 0) {
      return `${_baseUrl}/`
    }
    return `${_baseUrl}/${_slug.replace(/\/+$/, '')}/`
  }, [_language, _location.pathname])
  const _locale = OG_LOCALE[_language] ?? OG_LOCALE.en
  const _alternateLinks = useMemo(
    () =>
      Object.entries(LANGUAGE_ROUTE_SEGMENTS).map(([lng, segment]) => ({
        hrefLang: lng,
        href: `${SITE_URL}${segment}/`,
      })),
    [],
  )

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
      {_ogImageAlt && <meta property="og:image:alt" content={_ogImageAlt} />}
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={_title} />
      <meta name="twitter:description" content={_description} />
      <meta name="twitter:image" content={sharedImage} />
      {_twitterHandle && <meta name="twitter:creator" content={_twitterHandle} />}
      <link rel="canonical" href={_canonicalUrl} />
      {_alternateLinks.map((link) => (
        <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}`} />
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
