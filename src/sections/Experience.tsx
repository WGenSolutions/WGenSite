import Section from '../components/Section'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'

export const Experience = () => {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="experience" title={t('experience.title')}>
      <motion.div
        className="grid gap-6 rounded-3xl bg-background/75 p-8 ring-1 ring-inset ring-white/10"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
  transition={{ duration: 0.6, ease: [0.24, 0.8, 0.25, 1] as const }}
      >
        <p className="text-lg leading-relaxed text-foreground/90">{t('experience.body')}</p>
        <p className="text-base font-medium text-accent">{t('experience.focus')}</p>
      </motion.div>
    </Section>
  )
}

export default Experience
