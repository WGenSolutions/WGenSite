import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Section from '../components/Section'

const CONTACT_EMAIL = 'wgen.solutions@gmail.com'

export const Contact = () => {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  const points = useMemo(() => {
    const items = t('contact.points', { returnObjects: true })
    return Array.isArray(items) ? (items as string[]) : []
  }, [t])

  return (
    <Section id="contact" title={t('contact.title')} description={t('contact.body')}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center">
        <motion.div
          className="space-y-6"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="grid gap-3 text-base text-muted">
            <p className="text-lg text-foreground">
              <span className="font-medium text-muted">
                {t('contact.emailLabel')}
              </span>{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary transition hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>{t('contact.responseTime')}</p>
          </div>

          {points.length ? (
            <ul className="space-y-3 text-base text-muted">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <motion.a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:bg-primary/90"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            <span>{t('contact.cta')}</span>
          </motion.a>
        </motion.div>

        <motion.figure
          className="relative mx-auto max-w-sm overflow-hidden bg-card/70 lg:justify-self-center"
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          animate={prefersReducedMotion ? undefined : { y: [0, -12, 0], rotate: [0, 1.2, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
                  scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
                  y: {
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  },
                  rotate: {
                    duration: 12,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  },
                }
          }
        >
          <img
            src="/images/contact_us.png"
            alt={t('contact.imageAlt')}
            className="block h-auto w-full object-cover"
            loading="lazy"
          />
        </motion.figure>
      </div>
    </Section>
  )
}

export default Contact
