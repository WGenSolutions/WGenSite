import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import Section from '../components/Section'
import { CloudSun, Lightbulb } from 'lucide-react'

export const Hobby = () => {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="hobby" title={t('hobby.title')}>
      <motion.div
        className="grid gap-6 rounded-3xl border border-dashed border-accent/40 bg-background/70 p-8"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.5, ease: [0.24, 0.8, 0.25, 1] as const }}
      >
        <div className="flex flex-col gap-3 text-base text-foreground/90">
          <span className="inline-flex items-center gap-2 text-accent">
            <CloudSun className="h-5 w-5" aria-hidden="true" />
            {t('hobby.weather')}
          </span>
          <span className="inline-flex items-center gap-2 text-primary">
            <Lightbulb className="h-5 w-5" aria-hidden="true" />
            {t('hobby.next')}
          </span>
        </div>
        <a
          href="#propose"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-5 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:text-foreground"
        >
          {t('hero.secondaryCta')}
        </a>
      </motion.div>
    </Section>
  )
}

export default Hobby
