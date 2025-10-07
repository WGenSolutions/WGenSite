import { forwardRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'
import clsx from 'classnames'

interface CardProps {
  title: string
  description: string
  icon?: ReactNode
  className?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, icon, className }, ref) => {
    const prefersReducedMotion = useReducedMotion()
    const mouseX = useMotionValue(160)
    const mouseY = useMotionValue(120)
    const springX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.6 })
    const springY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.6 })

    const glowBackground = useMotionTemplate`radial-gradient(160px circle at ${springX}px ${springY}px, rgba(92,109,253,0.4), transparent 70%)`

    const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return
      const bounds = event.currentTarget.getBoundingClientRect()
      mouseX.set(event.clientX - bounds.left)
      mouseY.set(event.clientY - bounds.top)
    }

    const handlePointerLeave = (event: MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return
      mouseX.set(event.currentTarget.offsetWidth / 2)
      mouseY.set(event.currentTarget.offsetHeight / 2)
    }

    return (
      <motion.div
        ref={ref}
        className={clsx(
          'group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/5 bg-card/80 p-6 text-left shadow-glow transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/20 dark:border-white/10',
          className,
        )}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBackground }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)] opacity-70"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(120deg,rgba(92,109,253,0.08),transparent_40%,rgba(36,221,255,0.1))] opacity-50"
          aria-hidden="true"
        />
        <div className="flex items-center gap-3 text-primary">
          {icon ? (
            <motion.span
              className="rounded-2xl bg-primary/10 p-2 text-primary shadow-inner"
              whileHover={prefersReducedMotion ? undefined : { rotate: [0, -6, 6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
            >
              {icon}
            </motion.span>
          ) : null}
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-base leading-relaxed text-muted">{description}</p>
      </motion.div>
    )
  },
)

Card.displayName = 'Card'

export default Card
