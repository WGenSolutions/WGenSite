import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonEn from '../locales/en/common.json'
import homeEn from '../locales/en/home.json'
import commonPl from '../locales/pl/common.json'
import homePl from '../locales/pl/home.json'


const resources = {
  en: {
    common: commonEn,
    home: homeEn,
  },
  pl: {
    common: commonPl,
    home: homePl,
  },
}

const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  pl: 'pl_PL'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],
    defaultNS: 'common',
    ns: ['common', 'home'],
    detection: {
      order: ['localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'querystring'],
      caches: ['localStorage'],
      lookupLocalStorage: 'wgen-language',
      lookupSessionStorage: 'wgen-language',
    },
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  })
  .catch((error) => {
    console.error('i18next initialization failed', error)
  })

if (typeof window !== 'undefined') {
  const updateLanguageMetadata = (lng: string) => {
    const language = i18n.getFixedT(lng)('common:meta.title') ? lng : 'en'
    document.documentElement.setAttribute('lang', language)
    document.documentElement.dataset.locale = language
    const meta = document.querySelector("meta[property='og:locale']")
    if (meta) {
      meta.setAttribute('content', ogLocaleMap[language] ?? 'en_US')
    }
    localStorage.setItem('wgen-language', language)
  }

  i18n.on('languageChanged', updateLanguageMetadata)
  updateLanguageMetadata(i18n.language || 'en')
}

export default i18n
