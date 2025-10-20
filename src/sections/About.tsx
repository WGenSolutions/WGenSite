import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import { BadgeCheck, Puzzle, Rocket, Sparkles, Star, Cog } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const About = () => {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  const intro = t('about.intro')
  const highlightTitle = t('about.highlightTitle')
  const highlights = t('about.highlights', { returnObjects: true }) as {
    id: string
    text: string
  }[]

  const highlightIcons: Record<string, LucideIcon> = {
    speed: Rocket,
    value: BadgeCheck,
    ai: Sparkles,
    commitment: Star,
    automation: Cog,
    widget: Puzzle
  }

  const containerVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 24 },
    visible: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.24, 0.8, 0.25, 1] as const }
        }
  }

  const listVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 }
    }
  }

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.24, 0.8, 0.25, 1] as const }
        }
  }

  return (
    <Section id="about" title={t('about.title')}>
      <motion.div
        className="grid gap-10 rounded-3xl border border-white/10 bg-card/80 p-8 shadow-glow md:grid-cols-[minmax(0,1fr),minmax(0,1.1fr)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={containerVariants}
      >
        <div className="space-y-6 rounded-3xl border border-white/5 bg-background/70 p-6 shadow-inner">
          <motion.p
            className="text-lg leading-relaxed text-foreground/90"
            variants={containerVariants}
          >
            {intro}
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-semibold text-foreground" variants={containerVariants}>
            {highlightTitle}
          </motion.h3>
          <motion.ul className="grid gap-4" variants={listVariants}>
            {highlights.map(({ id, text }) => {
              const Icon = highlightIcons[id] ?? Sparkles
              return (
                <motion.li
                  key={id}
                  className="group flex items-start gap-4 rounded-3xl border border-white/10 bg-background/70 p-5 transition hover:border-primary hover:bg-background/90"
                  variants={itemVariants}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary transition group-hover:bg-primary/25 group-hover:text-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-base leading-relaxed text-foreground/90">{text}</p>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export default About
