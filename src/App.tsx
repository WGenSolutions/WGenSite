import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HomePage from './pages/HomePage'

const SUPPORTED_LANGUAGES = ['en', 'pl'] as const
const DEFAULT_LANGUAGE = 'en'
const SUPPORTED_LANGUAGE_SET = new Set<string>(SUPPORTED_LANGUAGES)

/**
 * Configures route-level language handling and delegates to localized pages.
 */
function App() {
  return (
    <Routes>
      <Route index element={<LanguageRedirect />} />
      <Route path=":lng/*" element={<LocalizedRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

/**
 * Redirects the user to the best-fit language route based on i18next detection.
 */
function LanguageRedirect() {
  const { i18n: _i18n } = useTranslation()
  const _detectedLanguage = (_i18n.resolvedLanguage || _i18n.language || DEFAULT_LANGUAGE).split('-')[0]
  const _targetLanguage = SUPPORTED_LANGUAGE_SET.has(_detectedLanguage) ? _detectedLanguage : DEFAULT_LANGUAGE
  return <Navigate to={`/${_targetLanguage}/`} replace />
}

/**
 * Synchronizes the language route segment with the i18next instance.
 */
function LocalizedRoute() {
  const { i18n: _i18n } = useTranslation()
  const _navigate = useNavigate()
  const _location = useLocation()
  const { lng: _lngParam } = useParams<{ lng: string }>()

  useEffect(() => {
    if (!_lngParam) {
      return
    }

    if (!_location.pathname.endsWith('/')) {
      _navigate(`${_location.pathname}/${_location.search}${_location.hash}`, { replace: true })
    }
  }, [_lngParam, _location.hash, _location.pathname, _location.search, _navigate])

  useEffect(() => {
    if (!_lngParam) {
      _navigate('/', { replace: true })
      return
    }

    const _normalizedLanguage = _lngParam.toLowerCase()
    if (!SUPPORTED_LANGUAGE_SET.has(_normalizedLanguage)) {
      _navigate('/', { replace: true })
      return
    }

    const _activeLanguage = (_i18n.resolvedLanguage || _i18n.language || DEFAULT_LANGUAGE).split('-')[0]
    if (_activeLanguage !== _normalizedLanguage) {
      _i18n.changeLanguage(_normalizedLanguage).catch((_error) => {
        console.error('Failed to change language', _error)
      })
    }
  }, [_i18n, _lngParam, _navigate])

  if (!_lngParam || !SUPPORTED_LANGUAGE_SET.has(_lngParam.toLowerCase())) {
    return null
  }

  return <HomePage />
}

export default App
