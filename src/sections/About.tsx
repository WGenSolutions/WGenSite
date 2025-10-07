import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import { X } from 'lucide-react'

export const About = () => {
  const { t } = useTranslation(['home', 'common'])
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[]
  const apps = t('about.apps', { returnObjects: true }) as string[]

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <Section id="about" title={t('about.title')}>
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-card/80 p-8 shadow-glow">
        <div className="space-y-4 text-base leading-relaxed text-foreground/90">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-background/70 px-5 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:text-foreground"
        >
          {t('about.cta')}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="selected-apps-title"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-background/95 p-8 shadow-xl"
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.24, 0.8, 0.25, 1] as const }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 id="selected-apps-title" className="text-2xl font-semibold text-foreground">
                  {t('about.cta')}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={t('common:actions.close')}
                  ref={closeButtonRef}
                  className="rounded-full border border-white/10 p-2 text-muted transition hover:border-primary hover:text-primary"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-foreground/90">
                {apps.map((app) => (
                  <li
                    key={app}
                    className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3"
                  >
                    {app}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  )
}

export default About
