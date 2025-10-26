import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'

/** Renders the Products section with a layered hero and animated feature grid. */
export const Products = () => {
  const { t: _t } = useTranslation('home')
  const _features = _t('products.automationCenter.features', { returnObjects: true }) as string[]
  const _prefersReducedMotion = useReducedMotion()

  return (
    <Section id="products" title={_t('products.title')}>
      <motion.div
        className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-primary/15 via-background/85 to-background/95 p-8 shadow-2xl backdrop-blur"
        initial={_prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
        whileInView={_prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.24, 0.8, 0.25, 1] as const }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-primary/35 blur-[120px]" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent)]" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.55fr),minmax(0,0.45fr)] lg:gap-14">
          <div className="flex h-full flex-col gap-10">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.24em] text-primary/90">
                {_t('products.automationCenter.headline')}
              </span>
              <p className="text-lg leading-relaxed text-muted">
                {_t('products.automationCenter.description')}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-background/60 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/5" />
              <img
                src="/images/product_automation_center.png"
                alt={_t('products.automationCenter.headline')}
                className="h-full w-full object-cover mix-blend-luminosity"
              />
            </div>
          </div>

          <motion.ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1" initial={false}>
            {_features.map((feature, index) => (
              <motion.li
                key={feature}
                className="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-background/80 via-background/70 to-background/90 p-6 text-left shadow-lg transition-shadow duration-300 hover:shadow-primary/30"
                initial={_prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={_prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={
                  _prefersReducedMotion
                    ? undefined
                    : {
                        rotateX: 4,
                        rotateY: -4,
                        translateY: -6,
                        scale: 1.02,
                      }
                }
                whileTap={_prefersReducedMotion ? undefined : { scale: 0.98 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: [0.24, 0.8, 0.25, 1] as const }}
              >
                <span className="text-xs font-medium uppercase tracking-[0.32em] text-primary/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="leading-relaxed text-foreground/90">{feature}</span>
                <span className="pointer-events-none absolute inset-px rounded-[1.45rem] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </Section>
  )
}

export default Products
