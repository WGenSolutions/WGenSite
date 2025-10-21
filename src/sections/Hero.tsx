import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/**
 * Animated diagram (Vite-style) to visualize:
 * Shop Floor <-> Office <-> Management
 */
function Diagram({ reduced, className = '' }: { reduced: boolean; className?: string }) {
  const { t } = useTranslation('home');

  const A = { x: 90,  y: 130, label: t('nodes.labelShopFloor') }
  const B = { x: 260, y: 70,  label: t('nodes.labelOffice') }
  const C = { x: 430, y: 130, label: t('nodes.labelManagement') }

  const connections = [
    [A, B],
    [B, C],
    [A, C],
  ] as const

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show:  { pathLength: 1, opacity: 1 },
  }

  return (
    <div
      className={`relative mx-auto w-full max-w-[520px] overflow-visible bg-background/40 p-4 sm:p-6 md:ml-auto ${className}`}
      aria-label="Information flow between shop floor, office, and management"
    >
      {/* Soft gradient background blobs */}
      {!reduced && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-400/20 blur-3xl"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: [0.25, 0.4, 0.25], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -bottom-12 right-0 h-56 w-56 rounded-full bg-gradient-to-tr from-fuchsia-500/30 to-amber-400/20 blur-3xl"
            initial={{ opacity: 0.25, scale: 0.9 }}
            animate={{ opacity: [0.2, 0.35, 0.2], scale: [0.95, 1.1, 0.95] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            aria-hidden
          />
        </>
      )}

      <svg
        className="mx-auto block h-[320px] w-full"
        viewBox="0 0 520 240"
        role="img"
        aria-labelledby="diagramTitle"
      >        
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(220 90% 60%)" />
            <stop offset="100%" stopColor="hsl(280 90% 65%)" />
          </linearGradient>
        </defs>

        {/* Draw animated connecting lines */}
        {connections.map(([from, to], i) => {
          // Default: bend upward slightly
          let controlY = Math.min(from.y, to.y) - 45

          // For the Shop Floor <-> Management line, bend downward
          const isShopToMgmt =
            (from.label === t('nodes.labelShopFloor') && to.label === t('nodes.labelManagement')) ||
            (from.label === t('nodes.labelManagement') && to.label === t('nodes.labelShopFloor'))
          if (isShopToMgmt) controlY = Math.max(from.y, to.y) + 60

          const d = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${controlY} ${to.x} ${to.y}`

          return (
            <motion.path
              key={`line-${i}`}
              d={d}
              stroke="url(#strokeGrad)"
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              filter="url(#glow)"
              variants={draw}
              initial={reduced ? undefined : 'hidden'}
              animate={reduced ? undefined : 'show'}
              transition={{
                duration: 1.2,
                delay: i * 0.15 + 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              markerEnd="url(#arrow)"
              opacity={0.9}
            />
          )
        })}


        {/* Bidirectional signal orbs */}
        {!reduced &&
          connections.map(([from, to], i) => {
            // Use the same control point logic as the paths
            let controlY = Math.min(from.y, to.y) - 45
            const isShopToMgmt =
              (from.label === t('nodes.labelShopFloor') && to.label === t('nodes.labelManagement')) ||
              (from.label === t('nodes.labelManagement') && to.label === t('nodes.labelShopFloor'))
            if (isShopToMgmt) controlY = Math.max(from.y, to.y) + 60

            // Quadratic Bezier helpers (same control point as the line)
            const cx = (t: number) =>
              (1 - t) * (1 - t) * from.x +
              2 * (1 - t) * t * ((from.x + to.x) / 2) +
              t * t * to.x
            const cy = (t: number) =>
              (1 - t) * (1 - t) * from.y +
              2 * (1 - t) * t * controlY +
              t * t * to.y

            const dur = 2.8 + i * 0.3

            return (
              <g key={`orbs-${from.label}-${to.label}-${i}`} style={{ isolation: 'isolate' }}>
                {/* forward direction */}
                <motion.circle
                  r="4"
                  fill="white"
                  style={{ filter: 'url(#glow)' }}
                  initial={{ opacity: 0 }}
                >
                  <animate attributeName="cx" values={`${cx(0)};${cx(0.5)};${cx(1)}`} dur={`${dur}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values={`${cy(0)};${cy(0.5)};${cy(1)}`} dur={`${dur}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur={`${dur}s`} repeatCount="indefinite" />
                </motion.circle>

                {/* reverse direction */}
                <motion.circle
                  r="4"
                  fill="white"
                  style={{ filter: 'url(#glow)' }}
                  initial={{ opacity: 0 }}
                >
                  <animate attributeName="cx" values={`${cx(1)};${cx(0.5)};${cx(0)}`} dur={`${dur + 0.4}s`} begin="1s" repeatCount="indefinite" />
                  <animate attributeName="cy" values={`${cy(1)};${cy(0.5)};${cy(0)}`} dur={`${dur + 0.4}s`} begin="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur={`${dur + 0.4}s`} begin="1s" repeatCount="indefinite" />
                </motion.circle>
              </g>
            )
          })}


        {/* Nodes */}
        {[A, B, C].map((n, i) => (
          <g key={i} transform={`translate(${n.x}, ${n.y})`}>
            {!reduced && (
              <motion.circle
                r="22"
                fill="none"
                stroke="url(#strokeGrad)"
                strokeWidth="2"
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.92, 1.08, 0.92] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                style={{ filter: 'url(#glow)' }}
              />
            )}
            <circle r="12" fill="white" />
            <rect x={-60} y={24} rx={8} width={120} height={28} fill="hsl(0 0% 100% / 0.08)" stroke="hsl(0 0% 100% / 0.12)" />
            <text x="0" y="43" textAnchor="middle" className="fill-white text-[12px] font-medium">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export const Hero = () => {
  const { t } = useTranslation('home');
  const { t: t2 } = useTranslation('common');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[80vh] items-center overflow-hidden scroll-mt-32 pt-36"
    >
      <div className="absolute inset-0 -z-10 bg-hero-gradient opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(circle_at_top,_rgba(81,112,255,0.45),_transparent_60%)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 text-center sm:gap-12 sm:px-10 md:flex-row md:items-center md:text-left">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-1 flex-col gap-6"
        >
          <span className="self-start rounded-full border border-white/10 bg-background/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t2('brand.tagline')}
          </span>
          <h1
            id="hero-title"
            className="text-4xl tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {t('hero.title')}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="flex w-full flex-1 justify-center md:justify-end"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {/* === New: Animated Diagram === */}
          <Diagram reduced={!!prefersReducedMotion} className="md:mr-0" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
