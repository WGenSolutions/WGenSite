import type { ReactNode } from 'react'
import { useCookieConsent } from '../../hooks/useCookieConsent'
import CookieConsentContext from './CookieConsentContext'

/**
 * Properties accepted by the cookie consent provider component.
 */
interface CookieConsentProviderProps {
  children: ReactNode
}

/**
 * Provides descendants with access to cookie consent actions and state.
 */
export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const _controller = useCookieConsent()
  return <CookieConsentContext.Provider value={_controller}>{children}</CookieConsentContext.Provider>
}
