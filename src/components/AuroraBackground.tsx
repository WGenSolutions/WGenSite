import { motion, useReducedMotion } from 'framer-motion'

// ultra-soft neon grid parallax
const gridLayers = [
  {
    id: 'grid-back',
    className:
      'inset-[-20%] opacity-[0.10] [background-image:repeating-linear-gradient(0deg,_rgba(200,220,255,0.14)_0_1px,_transparent_1px_20px),repeating-linear-gradient(90deg,_rgba(200,220,255,0.10)_0_1px,_transparent_1px_20px)]',
    scale: 1.06,
    duration: 60,
    delay: 0,
  },
  {
    id: 'grid-front',
    className:
      'inset-[-18%] opacity-[0.14] [background-image:repeating-linear-gradient(0deg,_rgba(140,180,255,0.12)_0_1px,_transparent_1px_28px),repeating-linear-gradient(90deg,_rgba(140,180,255,0.09)_0_1px,_transparent_1px_28px)]',
    scale: 1.0,
    duration: 48,
    delay: 6,
  },
]

const AuroraBackground = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(40,65,140,0.22),_rgba(9,13,24,0.96))]">
      {/* parallax neon grid layers */}
      {gridLayers.map((g) => (
        <motion.div
          key={g.id}
          className={`absolute ${g.className} bg-[length:20px_20px,20px_20px]`}
          style={{
            maskImage:
              'radial-gradient(circle at center, rgba(0,0,0,0.85), rgba(0,0,0,0.0) 70%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, rgba(0,0,0,0.85), rgba(0,0,0,0.0) 70%)',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0.08, scale: g.scale }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.12, scale: g.scale }
              : {
                  opacity: [0.06, 0.14, 0.06],
                  scale: [g.scale, g.scale * 1.015, g.scale],
                  x: ['-1.5%', '1.5%', '-1.5%'],
                  y: ['1%', '-1%', '1%'],
                }
          }
          transition={{ duration: g.duration, delay: g.delay, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      ))}

      {/* original vertical glow */}
      <motion.div
        className="absolute inset-x-[-10%] top-[10%] h-[520px] bg-[radial-gradient(circle_at_center,_rgba(24,205,255,0.06),_transparent_70%)]"
        animate={
          prefersReducedMotion
            ? { opacity: 0.15 }
            : {
                opacity: [0.08, 0.25, 0.08],
                scaleY: [0.85, 1.05, 0.85],
              }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* existing grid + vignette hooks (keep your CSS) */}
      <div className="aurora-grid" aria-hidden="true" />
      <div className="aurora-vignette" aria-hidden="true" />
    </div>
  )
}

export default AuroraBackground
