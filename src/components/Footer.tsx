import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { useCookieConsentContext } from './CookieConsent'

export const Footer = () => {
  const { t: _t } = useTranslation('common')
  const _prefersReducedMotion = useReducedMotion()
  const _cookieConsent = useCookieConsentContext()

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-background/80 py-12 text-sm">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(92,109,253,0.18),_transparent_70%)] opacity-40"
        animate={
          _prefersReducedMotion
            ? { opacity: 0.4 }
            : {
                opacity: [0.25, 0.55, 0.25],
                scale: [0.95, 1.05, 0.95],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-x-[-10%] top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={
          _prefersReducedMotion
            ? { opacity: 0.3 }
            : {
                opacity: [0.1, 0.35, 0.1],
                scaleX: [0.6, 1, 0.6],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex flex-col gap-2 text-muted">
          <p>{_t('footer.rights', { year: new Date().getFullYear() })}</p>
        </div>

        <div className="flex flex-col gap-4 text-foreground sm:flex-row sm:items-center">
          <nav
            aria-label={_t('footer.social')}
            className="flex items-center gap-3 text-sm font-medium"
          >
            <a
              href="https://github.com/WGenSolutions"
              target="_blank"
              rel="noreferrer noopener"
              className="transition hover:text-primary"
            >
              {_t('footer.github')}
            </a>
          </nav>
          {_cookieConsent !== null && (
            <button
              type="button"
              className="text-sm font-medium text-muted underline-offset-4 transition hover:text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={_cookieConsent.open}
            >
              {_t('cookieConsent.manage')}
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
