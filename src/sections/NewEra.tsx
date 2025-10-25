import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'

/**
 * Floating light particles that reinforce the "splendid heaven" atmosphere.
 */
const STARFIELD = [
  {
    id: 'spark-1',
    top: '18%',
    left: '18%',
    size: '14px',
    duration: 6.2,
    delay: 0.2,
    color: 'linear-gradient(135deg, rgba(56,189,248,0.9), rgba(167,139,250,0.7))',
  },
  {
    id: 'spark-2',
    top: '46%',
    left: '68%',
    size: '18px',
    duration: 5.4,
    delay: 0.5,
    color: 'linear-gradient(135deg, rgba(244,114,182,0.85), rgba(251,191,36,0.7))',
  },
  {
    id: 'spark-3',
    top: '66%',
    left: '28%',
    size: '20px',
    duration: 7.1,
    delay: 0.8,
    color: 'linear-gradient(135deg, rgba(34,211,238,0.85), rgba(59,130,246,0.65))',
  },
  {
    id: 'spark-4',
    top: '22%',
    left: '78%',
    size: '16px',
    duration: 6.6,
    delay: 0.3,
    color: 'linear-gradient(135deg, rgba(251,191,36,0.8), rgba(248,113,113,0.7))',
  },
  {
    id: 'spark-5',
    top: '74%',
    left: '52%',
    size: '12px',
    duration: 5.8,
    delay: 1.1,
    color: 'linear-gradient(135deg, rgba(167,243,208,0.8), rgba(56,189,248,0.65))',
  },
] as const satisfies readonly {
  id: string
  top: string
  left: string
  size: string
  duration: number
  delay: number
  color: string
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
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1025]/80 p-8 shadow-[0_0_80px_rgba(88,97,255,0.2)] sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.25),transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.3),transparent_60%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 -z-10">
          {STARFIELD.map((spark) => (
            <motion.span
              key={spark.id}
              className="absolute rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.3)]"
              style={{ top: spark.top, left: spark.left, width: spark.size, height: spark.size, backgroundImage: spark.color }}
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

          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-300/10 via-transparent to-sky-200/5" aria-hidden="true" />
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
              className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-[0_12px_40px_-18px_rgba(56,189,248,0.8)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
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
                className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(14,116,144,0.35),rgba(124,58,237,0.18))] p-6 shadow-[0_0_30px_rgba(79,70,229,0.25)]"
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
