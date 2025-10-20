import Section from '../components/Section'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import {
  type LucideIcon,
  Truck,
  Factory,
  CalendarClock,
  Gauge,
  Users,
  ClipboardCheck,
  Boxes,
  Workflow,
  Smartphone,
  Files,
  Share2,
  MessageSquare,
  ShoppingBag,
  ShieldCheck,
  Cpu,
  PackageCheck,
  UtensilsCrossed,
  BarChart3,
  UserCog,
  Circle
} from 'lucide-react'

type ProjectTranslation = {
  id: string
  title: string
  description?: string
}

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
} as const

const chipBaseClass =
  'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-colors ring-1 ring-inset'

const chipPalette: Record<string, { icon: LucideIcon; chipClass: string; iconClass: string }> = {
  vanSalesApp: {
    icon: Truck,
    chipClass: 'bg-emerald-500/10 ring-emerald-400/40 hover:bg-emerald-500/20',
    iconClass: 'text-emerald-300'
  },
  productionMonitor: {
    icon: Factory,
    chipClass: 'bg-sky-500/10 ring-sky-400/40 hover:bg-sky-500/20',
    iconClass: 'text-sky-300'
  },
  productionPlanning: {
    icon: CalendarClock,
    chipClass: 'bg-blue-500/10 ring-blue-400/40 hover:bg-blue-500/20',
    iconClass: 'text-blue-300'
  },
  productionDashboards: {
    icon: Gauge,
    chipClass: 'bg-purple-500/10 ring-purple-400/40 hover:bg-purple-500/20',
    iconClass: 'text-purple-300'
  },
  workforceManagement: {
    icon: Users,
    chipClass: 'bg-amber-500/10 ring-amber-400/40 hover:bg-amber-500/20',
    iconClass: 'text-amber-300'
  },
  employeeEvaluation: {
    icon: ClipboardCheck,
    chipClass: 'bg-rose-500/10 ring-rose-400/40 hover:bg-rose-500/20',
    iconClass: 'text-rose-300'
  },
  warehouseOps: {
    icon: Boxes,
    chipClass: 'bg-lime-500/10 ring-lime-400/40 hover:bg-lime-500/20',
    iconClass: 'text-lime-300'
  },
  officeAutomations: {
    icon: Workflow,
    chipClass: 'bg-teal-500/10 ring-teal-400/40 hover:bg-teal-500/20',
    iconClass: 'text-teal-300'
  },
  mobileApps: {
    icon: Smartphone,
    chipClass: 'bg-indigo-500/10 ring-indigo-400/40 hover:bg-indigo-500/20',
    iconClass: 'text-indigo-300'
  },
  documentFlow: {
    icon: Files,
    chipClass: 'bg-slate-500/10 ring-slate-400/40 hover:bg-slate-500/20',
    iconClass: 'text-slate-300'
  },
  b2bPlatforms: {
    icon: Share2,
    chipClass: 'bg-cyan-500/10 ring-cyan-400/40 hover:bg-cyan-500/20',
    iconClass: 'text-cyan-300'
  },
  feedbackOps: {
    icon: MessageSquare,
    chipClass: 'bg-pink-500/10 ring-pink-400/40 hover:bg-pink-500/20',
    iconClass: 'text-pink-300'
  },
  ecommerce: {
    icon: ShoppingBag,
    chipClass: 'bg-orange-500/10 ring-orange-400/40 hover:bg-orange-500/20',
    iconClass: 'text-orange-300'
  },
  gatehouseOps: {
    icon: ShieldCheck,
    chipClass: 'bg-yellow-500/10 ring-yellow-400/40 hover:bg-yellow-500/20',
    iconClass: 'text-yellow-300'
  },
  productionPrepAutomation: {
    icon: Cpu,
    chipClass: 'bg-violet-500/10 ring-violet-400/40 hover:bg-violet-500/20',
    iconClass: 'text-violet-300'
  },
  shippingOps: {
    icon: PackageCheck,
    chipClass: 'bg-green-500/10 ring-green-400/40 hover:bg-green-500/20',
    iconClass: 'text-green-300'
  },
  lunchOrdering: {
    icon: UtensilsCrossed,
    chipClass: 'bg-red-500/10 ring-red-400/40 hover:bg-red-500/20',
    iconClass: 'text-red-300'
  },
  analytics: {
    icon: BarChart3,
    chipClass: 'bg-sky-500/10 ring-sky-400/40 hover:bg-sky-500/20',
    iconClass: 'text-sky-300'
  },
  crm: {
    icon: UserCog,
    chipClass: 'bg-emerald-500/10 ring-emerald-400/40 hover:bg-emerald-500/20',
    iconClass: 'text-emerald-300'
  },
  default: {
    icon: Circle,
    chipClass: 'bg-white/10 ring-white/25 hover:bg-white/15',
    iconClass: 'text-foreground'
  }
}

export const Experience = () => {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  const rawProjects = t('experience.projects.items', {
    returnObjects: true
  }) as ProjectTranslation[] | ProjectTranslation | string

  const projects = Array.isArray(rawProjects) ? rawProjects : []

  const listMotionProps = prefersReducedMotion
    ? {}
    : {
        variants: listVariants,
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.08 }
      }

  return (
    <Section id="experience" title={t('experience.title')}>
      <motion.div
        className="space-y-8 rounded-3xl bg-background/80 p-8 ring-1 ring-inset ring-white/10"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.6, ease: [0.24, 0.8, 0.25, 1] as const }}
      >
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-foreground/90">{t('experience.body')}</p>
          <p className="text-base font-semibold text-accent">{t('experience.focus')}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
            {t('experience.projects.headline')}
          </h3>
          <motion.ul
            className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            {...listMotionProps}
          >
            {projects.map((project, index) => {
              const palette = chipPalette[project.id] ?? chipPalette.default
              const Icon = palette.icon
              const itemMotionProps = prefersReducedMotion
                ? {}
                : {
                    variants: itemVariants,
                    whileHover: { y: -4 }
                  }

              return (
                <motion.li
                  key={project.id ?? `${project.title}-${index}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20 hover:bg-white/10"
                  transition={{ duration: 0.3, ease: [0.22, 0.68, 0.28, 0.98] }}
                  {...itemMotionProps}
                >
                  <div className={`${chipBaseClass} ${palette.chipClass}`}>
                    <Icon className={`h-4 w-4 flex-none ${palette.iconClass}`} aria-hidden="true" />
                    <span className="leading-tight">{project.title}</span>
                  </div>
                  {project.description ? (
                    <p className="text-sm leading-snug text-foreground/75">{project.description}</p>
                  ) : null}
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </motion.div>
    </Section>
  )
}

export default Experience
