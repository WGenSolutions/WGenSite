import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/**
 * Animated diagram (Vite-style) to visualize:
 * Shop Floor <-> Office <-> Management
 */
function Diagram({ reduced, className = '' }: { reduced: boolean; className?: string }) {
  const { t } = useTranslation('home');

  const canvasSize = 360
  const center = canvasSize / 2
  const radius = 135

  const polarToCartesian = (angleRad: number) => ({
    x: center + radius * Math.cos(angleRad),
    y: center + radius * Math.sin(angleRad),
  })

  const nodes = [
    { id: 'management', angleDeg: -90, label: t('nodes.labelManagement') },
    { id: 'office', angleDeg: 30, label: t('nodes.labelOffice') },
    { id: 'shop-floor', angleDeg: 150, label: t('nodes.labelShopFloor') },
  ].map((node) => {
    const angleRad = (node.angleDeg * Math.PI) / 180
    return {
      ...node,
      angleRad,
      ...polarToCartesian(angleRad),
    }
  })

  const connections = nodes.map((node, index) => {
    const next = nodes[(index + 1) % nodes.length]
    return [node, next] as const
  })

  const getArcDelta = (fromAngle: number, toAngle: number) => {
    let delta = toAngle - fromAngle
    if (delta <= 0) delta += Math.PI * 2
    return delta
  }

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show:  { pathLength: 1, opacity: 1 },
  }

  return (
    <div className={`relative mx-auto w-full max-w-[420px] md:ml-auto ${className}`}>
      <div
        className="relative aspect-square w-full overflow-visible rounded-full  bg-background/40 p-6 shadow-[0_0_36px_rgba(88,120,255,0.04)] sm:p-8"
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
          className="mx-auto block h-full w-full"
          viewBox={`0 0 ${canvasSize} ${canvasSize}`}
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
            const delta = getArcDelta(from.angleRad, to.angleRad)
            const largeArc = delta > Math.PI ? 1 : 0
            const d = `M ${from.x} ${from.y} A ${radius} ${radius} 0 ${largeArc} 1 ${to.x} ${to.y}`

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
                opacity={0.9}
              />
            )
          })}


          {/* Bidirectional signal orbs */}
          {!reduced &&
            connections.map(([from, to], i) => {
              const delta = getArcDelta(from.angleRad, to.angleRad)

              const pointAt = (t: number) => {
                const angle = from.angleRad + delta * t
                return polarToCartesian(angle)
              }

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
                    <animate attributeName="cx" values={`${pointAt(0).x};${pointAt(0.5).x};${pointAt(1).x}`} dur={`${dur}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" values={`${pointAt(0).y};${pointAt(0.5).y};${pointAt(1).y}`} dur={`${dur}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;0" dur={`${dur}s`} repeatCount="indefinite" />
                  </motion.circle>

                  {/* reverse direction */}
                  <motion.circle
                    r="4"
                    fill="white"
                    style={{ filter: 'url(#glow)' }}
                    initial={{ opacity: 0 }}
                  >
                    <animate attributeName="cx" values={`${pointAt(1).x};${pointAt(0.5).x};${pointAt(0).x}`} dur={`${dur + 0.4}s`} begin="1s" repeatCount="indefinite" />
                    <animate attributeName="cy" values={`${pointAt(1).y};${pointAt(0.5).y};${pointAt(0).y}`} dur={`${dur + 0.4}s`} begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;0" dur={`${dur + 0.4}s`} begin="1s" repeatCount="indefinite" />
                  </motion.circle>
                </g>
              )
            })}


          {/* Nodes */}
          {nodes.map((n, i) => (
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
