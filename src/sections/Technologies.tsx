import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'

/**
 * Builds a small gradient illustration encoded as a data URI for the technology cards.
 */
const createGradientImage = (accent: string, secondary: string) => {
  const _svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${accent}" />
        <stop offset="100%" stop-color="${secondary}" />
      </linearGradient>
      <radialGradient id="glow" cx="80%" cy="20%" r="80%">
        <stop offset="0%" stop-color="${secondary}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="200" fill="#0b1120" />
    <circle cx="92" cy="116" r="86" fill="url(#g)" opacity="0.92" />
    <circle cx="242" cy="58" r="74" fill="url(#glow)" opacity="0.8" />
    <path d="M0,200 C64,124 190,120 320,200 L320,0 L0,0 Z" fill="url(#g)" opacity="0.38" />
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(_svg)}`
}

/**
 * Technology storytelling cards displayed inside the horizontal scroller.
 */
const TECH_TOPICS = [
  {
    id: 'humanCoders',
    image: createGradientImage('#60a5fa', '#f472b6'),
    shadowClass: 'shadow-[0_0_32px_rgba(96,165,250,0.32)]',
  },
  {
    id: 'aiCoders',
    image: createGradientImage('#a855f7', '#22d3ee'),
    shadowClass: 'shadow-[0_0_30px_rgba(168,85,247,0.28)]',
  },
  {
    id: 'aiAutomations',
    image: createGradientImage('#34d399', '#22d3ee'),
    shadowClass: 'shadow-[0_0_30px_rgba(52,211,153,0.28)]',
  },
  {
    id: 'hybridAutomations',
    image: createGradientImage('#fde68a', '#38bdf8'),
    shadowClass: 'shadow-[0_0_30px_rgba(253,230,138,0.26)]',
  },
  {
    id: 'python',
    image: createGradientImage('#facc15', '#38bdf8'),
    shadowClass: 'shadow-[0_0_28px_rgba(250,204,21,0.28)]',
  },
  {
    id: 'typescript',
    image: createGradientImage('#3b82f6', '#38d0ff'),
    shadowClass: 'shadow-[0_0_28px_rgba(59,130,246,0.28)]',
  },
  {
    id: 'nodejs',
    image: createGradientImage('#4ade80', '#14b8a6'),
    shadowClass: 'shadow-[0_0_28px_rgba(74,222,128,0.28)]',
  },
  {
    id: 'fastApi',
    image: createGradientImage('#2dd4bf', '#22d1ee'),
    shadowClass: 'shadow-[0_0_28px_rgba(45,212,191,0.26)]',
  },
  {
    id: 'reactSmallApps',
    image: createGradientImage('#38bdf8', '#a855f7'),
    shadowClass: 'shadow-[0_0_30px_rgba(56,189,248,0.28)]',
  },
  {
    id: 'angularBigApps',
    image: createGradientImage('#f97316', '#ef4444'),
    shadowClass: 'shadow-[0_0_32px_rgba(239,68,68,0.28)]',
  },
] as const satisfies readonly {
  id:
    | 'humanCoders'
    | 'aiCoders'
    | 'aiAutomations'
    | 'hybridAutomations'
    | 'python'
    | 'typescript'
    | 'nodejs'
    | 'fastApi'
    | 'reactSmallApps'
    | 'angularBigApps'
  image: string
  shadowClass: string
}[]

/**
 * Horizontal showcase of core technologies and delivery modes we excel at.
 */
export const Technologies = () => {
  const { t: _t } = useTranslation('home')
  const _prefersReducedMotion = useReducedMotion()

  return (
    <Section
      id="technologies"
      title={_t('technologies.title')}
      description={_t('technologies.subtitle')}
      className="relative"
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/90 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/90 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          className="overflow-x-auto pb-6 sm:pb-8"
          initial={_prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={_prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="flex min-w-full snap-x snap-mandatory gap-6 pr-6 sm:gap-8">
            {TECH_TOPICS.map((topic, index) => (
              <motion.article
                key={topic.id}
                className={`group relative flex h-[22rem] w-[18rem] min-w-[18rem] snap-center flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.07] ${topic.shadowClass}`}
                initial={_prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={_prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: _prefersReducedMotion ? 0 : index * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <div className="flex-shrink-0 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={topic.image}
                    alt={_t(`technologies.cards.${topic.id}.alt`)}
                    className="h-36 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {_t(`technologies.cards.${topic.id}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/75">
                    {_t(`technologies.cards.${topic.id}.body`)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default Technologies
