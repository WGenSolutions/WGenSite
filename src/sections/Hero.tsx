import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

const floatingShapes = [
  { size: 'w-32 h-32', top: 'top-12', left: 'left-4', delay: 0 },
  { size: 'w-48 h-48', top: 'top-1/2', left: 'left-1/3', delay: 0.4 },
  { size: 'w-24 h-24', top: 'top-24', left: 'right-4', delay: 0.8 },
]

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
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120vh] bg-[radial-gradient(circle_at_top,_rgba(81,112,255,0.45),_transparent_60%)]"
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(54,230,255,0.22),_transparent_70%)] blur-[160px]"
        animate={
          prefersReducedMotion
            ? { opacity: 0.35 }
            : {
                opacity: [0.25, 0.5, 0.25],
                scale: [0.92, 1.05, 0.92],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] as const }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-20 -z-10 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={
          prefersReducedMotion
            ? { opacity: 0.3 }
            : {
                opacity: [0.15, 0.4, 0.15],
                scaleX: [0.6, 1, 0.6],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.size + shape.left}
          className={`pointer-events-none absolute ${shape.top} ${shape.left} ${shape.size} rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/20 blur-3xl`}
          animate={prefersReducedMotion ? undefined : { y: [0, -20, 0], opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, delay: shape.delay, ease: [0.24, 0.8, 0.25, 1] as const }}
          aria-hidden="true"
        />
      ))}

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 text-center sm:gap-10 sm:px-10 md:text-left">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col gap-6"
        >
          <span className="self-start rounded-full border border-white/10 bg-background/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t2('brand.tagline')}
          </span>
          <h1
            id="hero-title"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {t('hero.title')}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <a
            href="#offer"
            className="button-shine group inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-glow"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {t('hero.primaryCta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-60"
              animate={
                prefersReducedMotion
                  ? { opacity: 0.3 }
                  : {
                      opacity: [0, 0.6, 0],
                      scale: [0.95, 1.05, 0.95],
                    }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </a>
          <a
            href="#propose"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-primary/40 bg-background/70 px-6 py-3 text-base font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-background/90 hover:text-foreground"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {t('hero.secondaryCta')}
            </span>
            <span
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(92,109,253,0.25),_transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-90"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
