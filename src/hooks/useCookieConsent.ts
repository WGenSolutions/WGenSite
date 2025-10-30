import { useCallback, useEffect, useState } from 'react'

/**
 * Signals whether the user accepted or rejected the use of non-essential cookies.
 */
export type CookieConsentStatus = 'accepted' | 'rejected'

/**
 * Groups the UI state and actions related to cookie consent handling.
 */
export interface CookieConsentController {
  status: CookieConsentStatus | null
  isBannerVisible: boolean
  accept: () => void
  reject: () => void
  open: () => void
  close: () => void
}

/**
 * Identifies the storage key used to persist cookie consent choices.
 */
const COOKIE_CONSENT_STORAGE_KEY = 'wgen-cookie-consent'

/**
 * Verifies whether a stored value is a supported cookie consent status.
 */
function isSupportedCookieConsentStatus(value: string | null): value is CookieConsentStatus {
  return value === 'accepted' || value === 'rejected'
}

/**
 * Centralizes cookie consent persistence, banner visibility, and action handlers.
 */
export function useCookieConsent(): CookieConsentController {
  const [_status, _setStatus] = useState<CookieConsentStatus | null>(null)
  const [_isBannerOpen, _setIsBannerOpen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const _storedValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (isSupportedCookieConsentStatus(_storedValue)) {
      _setStatus(_storedValue)
      _setIsBannerOpen(false)
      return
    }

    _setIsBannerOpen(true)
  }, [])

  const _persistStatus = useCallback((nextStatus: CookieConsentStatus) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, nextStatus)
      window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: nextStatus }))
    }

    _setStatus(nextStatus)
    _setIsBannerOpen(false)
  }, [])

  const _accept = useCallback(() => {
    _persistStatus('accepted')
  }, [_persistStatus])

  const _reject = useCallback(() => {
    _persistStatus('rejected')
  }, [_persistStatus])

  const _open = useCallback(() => {
    _setIsBannerOpen(true)
  }, [])

  const _close = useCallback(() => {
    _setIsBannerOpen(false)
  }, [])

  return {
    status: _status,
    isBannerVisible: _isBannerOpen,
    accept: _accept,
    reject: _reject,
    open: _open,
    close: _close,
  }
}
