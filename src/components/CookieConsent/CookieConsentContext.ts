import { createContext, useContext } from 'react'
import type { CookieConsentController } from '../../hooks/useCookieConsent'

/**
 * Holds the current cookie consent controller so UI elements can react to user choices.
 */
const CookieConsentContext = createContext<CookieConsentController | null>(null)

/**
 * Exposes the cookie consent controller stored in the closest provider.
 */
export function useCookieConsentContext(): CookieConsentController | null {
  return useContext(CookieConsentContext)
}

export default CookieConsentContext
