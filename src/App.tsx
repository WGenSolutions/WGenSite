import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HomePage from './pages/HomePage'

const SUPPORTED_LANGUAGES = ['en', 'pl'] as const
const DEFAULT_LANGUAGE = 'en'
const SUPPORTED_LANGUAGE_SET = new Set<string>(SUPPORTED_LANGUAGES)

/**
 * Configures application-level language handling via the `lang` query parameter.
 */
function App() {
  return (
    <Routes>
      <Route path="*" element={<LocalizedRoute />} />
    </Routes>
  )
}

/**
 * Synchronizes the `lang` query parameter with the i18next instance.
 */
function LocalizedRoute() {
  const { i18n: _i18n } = useTranslation()
  const _navigate = useNavigate()
  const _location = useLocation()
  const [_searchParams] = useSearchParams()
  const _langParam = (_searchParams.get('lang') ?? '').toLowerCase()
  const _isSupportedLanguage = SUPPORTED_LANGUAGE_SET.has(_langParam)
  const _activeLanguage = (_i18n.resolvedLanguage || _i18n.language || DEFAULT_LANGUAGE).split('-')[0]

  useEffect(() => {
    if (_isSupportedLanguage) {
      return
    }

    const _preferredLanguage = SUPPORTED_LANGUAGE_SET.has(_activeLanguage)
      ? _activeLanguage
      : DEFAULT_LANGUAGE
    const _nextSearchParams = new URLSearchParams(_location.search)
    _nextSearchParams.set('lang', _preferredLanguage)
    const _searchString = _nextSearchParams.toString()
    _navigate(
      {
        pathname: _location.pathname || '/',
        search: _searchString.length > 0 ? `?${_searchString}` : '',
        hash: _location.hash,
      },
      { replace: true },
    )
  }, [_activeLanguage, _isSupportedLanguage, _location.hash, _location.pathname, _location.search, _navigate])

  useEffect(() => {
    if (!_isSupportedLanguage) {
      return
    }

    if (_activeLanguage === _langParam) {
      return
    }

    _i18n.changeLanguage(_langParam).catch((_error) => {
      console.error('Failed to change language', _error)
    })
  }, [_activeLanguage, _i18n, _isSupportedLanguage, _langParam])

  return <HomePage />
}

export default App
