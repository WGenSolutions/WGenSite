import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import { Sparkles } from 'lucide-react'

export const Products = () => {
  const { t } = useTranslation('home')
  const features = t('products.automationCenter.features', { returnObjects: true }) as string[]
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="products" title={t('products.title')}>
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-primary/20 via-background/80 to-background/95 p-8 shadow-lg"
        initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.24, 0.8, 0.25, 1] as const }}
      >
        <div
          className="absolute right-0 -top-0 hidden w-1/3 md:block"
          aria-hidden="true"
        >
          <img
            src="/images/product_automation_center.png"
            alt={t('products.automationCenter.headline')}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative flex flex-col gap-6 md:w-3/5">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-background/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        {t('products.automationCenter.headline')}
          </div>
          <p className="text-lg text-muted">{t('products.automationCenter.description')}</p>
          <ul className="grid gap-3 text-sm text-muted sm:grid-cols-2">
        {features.map((feature) => (
          <motion.li
            key={feature}
            className="flex items-start gap-2 rounded-2xl border border-white/10 bg-background/70 p-4 text-left"
            whileHover={
          prefersReducedMotion
            ? undefined
            : {
            scale: 1.02,
            x: 4,
              }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.24, 0.8, 0.25, 1] as const }}
          >
            <span
          className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-accent shadow-[0_0_12px_rgba(54,230,255,0.6)]"
          aria-hidden="true"
            />
            <span className="leading-relaxed text-foreground/90">{feature}</span>
          </motion.li>
        ))}
          </ul>
        </div>
      </motion.div>
    </Section>
  )
}

export default Products
