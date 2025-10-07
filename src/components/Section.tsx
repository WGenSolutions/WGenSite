import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface SectionProps {
  id: string
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export const Section = ({
  id,
  title,
  description,
  children,
  className = '',
}: SectionProps) => {
  const prefersReducedMotion = useReducedMotion()
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      }

  const headingId = title ? `${id}-title` : undefined

  return (
    <motion.section
      id={id}
      aria-labelledby={headingId}
      className={`group/section relative scroll-mt-32 py-20 sm:py-24 ${className}`}
      {...animationProps}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-[-10%] top-16 -z-10 h-40 rounded-full bg-[radial-gradient(circle_at_center,_rgba(92,109,253,0.18),_transparent_70%)] blur-3xl transition-opacity duration-700 group-hover/section:opacity-100"
        initial={prefersReducedMotion ? { opacity: 0.25, scale: 0.95 } : { opacity: 0, scale: 0.9 }}
        whileInView={prefersReducedMotion ? { opacity: 0.35, scale: 1 } : { opacity: 0.65, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-10 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-40"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 sm:px-10">
        {title ? (
          <div className="max-w-3xl">
            <h2
              id={headingId}
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </motion.section>
  )
}

export default Section
