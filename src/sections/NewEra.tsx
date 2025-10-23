import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'

/**
 * Soft-focus aurora layers that paint the heavenly background in the New Era section.
 */
const CELESTIAL_LAYERS = [
  {
    id: 'dawn',
    className:
      'absolute -top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400/60 via-indigo-500/40 to-transparent blur-3xl',
    duration: 18,
    delay: 0,
  },
  {
    id: 'zenith',
    className:
      'absolute -bottom-24 right-[18%] h-[22rem] w-[22rem] rounded-full bg-gradient-to-tl from-cyan-300/55 via-violet-500/35 to-transparent blur-3xl',
    duration: 20,
    delay: 0.6,
  },
  {
    id: 'halo',
    className:
      'absolute top-1/4 left-[12%] h-[20rem] w-[20rem] rounded-[999px] bg-gradient-to-br from-amber-200/45 via-rose-200/20 to-transparent blur-3xl',
    duration: 24,
    delay: 1.1,
  },
] as const satisfies readonly {
  id: string
  className: string
  duration: number
  delay: number
}[]

/**
 * Floating light particles that reinforce the "splendid heaven" atmosphere.
 */
const STARFIELD = [
  { id: 'spark-1', top: '22%', left: '16%', size: '12px', duration: 6.2, delay: 0.2 },
  { id: 'spark-2', top: '42%', left: '68%', size: '16px', duration: 5.4, delay: 0.5 },
  { id: 'spark-3', top: '62%', left: '24%', size: '18px', duration: 7.1, delay: 0.8 },
  { id: 'spark-4', top: '18%', left: '78%', size: '14px', duration: 6.6, delay: 0.3 },
  { id: 'spark-5', top: '70%', left: '52%', size: '10px', duration: 5.8, delay: 1.1 },
] as const satisfies readonly {
  id: string
  top: string
  left: string
  size: string
  duration: number
  delay: number
}[]

/**
 * Identifiers used to fetch translated highlight copy for the New Era manifesto.
 */
const HIGHLIGHTS = ['velocity', 'craft', 'ownership'] as const

/**
 * Celestial themed manifesto inviting visitors into the new era of WGen services.
 */
export const NewEra = () => {
  const { t: _t } = useTranslation('home')
  const _prefersReducedMotion = useReducedMotion()

  return (
    <Section
      id="newEra"
      title={_t('newEra.title')}
      description={_t('newEra.subtitle')}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_60px_rgba(124,144,255,0.12)] sm:p-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {CELESTIAL_LAYERS.map((layer) => (
            <motion.div
              key={layer.id}
              className={layer.className}
              initial={_prefersReducedMotion ? { opacity: 0.45 } : { opacity: 0.2, scale: 0.9 }}
              animate={
                _prefersReducedMotion
                  ? undefined
                  : { opacity: [0.25, 0.55, 0.25], scale: [0.92, 1.05, 0.92], rotate: [0, 2, -1, 0] }
              }
              transition={{ duration: layer.duration, delay: layer.delay, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          ))}

          {STARFIELD.map((spark) => (
            <motion.span
              key={spark.id}
              className="absolute rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.3)]"
              style={{ top: spark.top, left: spark.left, width: spark.size, height: spark.size }}
              initial={_prefersReducedMotion ? { opacity: 0.65 } : { opacity: 0, scale: 0.8 }}
              animate={
                _prefersReducedMotion
                  ? undefined
                  : {
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.9, 1.2, 0.9],
                      y: [0, -12, 0],
                    }
              }
              transition={{ duration: spark.duration, delay: spark.delay, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0" aria-hidden="true" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <motion.div
            initial={_prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
            whileInView={_prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-6 text-center lg:text-left"
          >
            <p className="text-lg font-semibold uppercase tracking-[0.35em] text-white/70">
              {_t('newEra.manifestoEmphasis')}
            </p>
            <p className="text-3xl font-medium text-white sm:text-4xl">
              {_t('newEra.manifestoBody')}
            </p>
            <p className="text-base leading-relaxed text-white/75">
              {_t('newEra.context')}
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              initial={_prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={_prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              {_t('newEra.callToAction')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          </motion.div>

          <div className="grid gap-6">
            {HIGHLIGHTS.map((highlightId, index) => (
              <motion.div
                key={highlightId}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_24px_rgba(88,120,255,0.15)]"
                initial={_prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={_prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: _prefersReducedMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                  {_t(`newEra.highlights.${highlightId}.title`) as string}
                </p>
                <p className="mt-3 text-base leading-relaxed text-white/80">
                  {_t(`newEra.highlights.${highlightId}.body`) as string}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default NewEra
