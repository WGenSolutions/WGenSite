import { useTranslation } from 'react-i18next'
import { useCookieConsentContext } from './CookieConsentContext'

/**
 * Presents an accessible cookie consent banner that lets visitors accept or reject all cookies.
 */
function CookieConsent() {
  const { t: _t } = useTranslation('common')
  const _controller = useCookieConsentContext()

  if (_controller === null) {
    return null
  }

  const {
    status: _status,
    isBannerVisible: _isBannerVisible,
    accept: _accept,
    reject: _reject,
    close: _close,
  } = _controller

  const _currentStatusLabel =
    _status === 'accepted'
      ? _t('cookieConsent.status.accepted')
      : _status === 'rejected'
        ? _t('cookieConsent.status.rejected')
        : null

  if (!_isBannerVisible) {
    return null
  }

  return (
    <section
      className="fixed bottom-6 left-1/2 z-50 w-[min(90vw,32rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-background/95 p-6 shadow-2xl backdrop-blur-md"
      role="dialog"
      aria-live="assertive"
      aria-label={_t('cookieConsent.title')}
    >
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{_t('cookieConsent.title')}</h2>
          <p className="text-sm text-muted">{_t('cookieConsent.description')}</p>
          {_currentStatusLabel !== null && (
            <p className="text-xs text-muted">{_t('cookieConsent.current', { choice: _currentStatusLabel })}</p>
          )}
          <p className="text-xs text-muted">{_t('cookieConsent.legal')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={_accept}
          >
            {_t('cookieConsent.accept')}
          </button>
          <button
            type="button"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={_reject}
          >
            {_t('cookieConsent.reject')}
          </button>
          {_status !== null && (
            <button
              type="button"
              className="ml-auto text-sm font-medium text-muted underline-offset-4 transition hover:text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={_close}
            >
              {_t('actions.close')}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default CookieConsent
