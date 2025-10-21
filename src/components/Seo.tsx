import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://wgen.it/'
const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  pl: 'pl_PL',
}
const ALTERNATE_URLS: Record<string, string> = {
  en: SITE_URL,
  pl: `${SITE_URL}?lng=pl`,
}
const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/wgensolutions',
  'https://github.com/WGenSolutions',
]
const DEFAULT_EMAIL = 'wgen.solutions@gmail.com'
const sharedImage = `${SITE_URL}images/widget-logo.png`
const GA_MEASUREMENT_ID = 'G-3690LFEG71'

export function Seo() {
  const { t, i18n } = useTranslation(['common'])
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
  const title = t('common:meta.title')
  const description = t('common:meta.description')
  const keywords = t('common:meta.keywords', { defaultValue: '' })
  const siteName = t('common:brand.name')
  const ogImageAlt = t('common:meta.ogImageAlt', { defaultValue: '' })
  const twitterHandle = t('common:meta.twitterHandle', { defaultValue: '' })
  const canonicalUrl = ALTERNATE_URLS[language] ?? SITE_URL
  const locale = OG_LOCALE[language] ?? OG_LOCALE.en

  const structuredData = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: canonicalUrl,
        description,
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
    [canonicalUrl, description, siteName],
  )

  return (
    <Helmet>
      <html lang={language} data-locale={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index,follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={sharedImage} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={sharedImage} />
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={ALTERNATE_URLS.en} />
      <link rel="alternate" hrefLang="pl" href={ALTERNATE_URLS.pl} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      <script type="application/ld+json">{structuredData}</script>
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
