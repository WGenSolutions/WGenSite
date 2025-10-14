import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import Section from '../components/Section'
import { CloudSun } from 'lucide-react'

export const Hobby = () => {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="hobby" title={t('hobby.title')}>
      <motion.div
        className="grid gap-6 rounded-3xl border border-accent/40 bg-background/70 p-8 md:grid-cols-[minmax(0,260px)_1fr] md:items-center"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.24, 0.8, 0.25, 1] as const }}
      >
        <div className="flex justify-center">
          <motion.img
            src="/images/widget-logo.png"
            alt={t('hobby.widgetAlt')}
            className="max-h-32 w-full max-w-[320px] object-contain"
            loading="lazy"
            whileHover={{ scale: 1.08, filter: 'drop-shadow(0 12px 24px rgba(56, 189, 248, 0.35))' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          />
        </div>
        <div className="flex flex-col gap-3 text-base text-foreground/90">
          <span className="inline-flex items-center gap-2 text-accent">
            <CloudSun className="h-5 w-5" aria-hidden="true" />
            {t('hobby.weather')}
          </span>
        </div>
      </motion.div>
    </Section>
  )
}

export default Hobby
