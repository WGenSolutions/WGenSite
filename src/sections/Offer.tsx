import { useTranslation } from 'react-i18next'
import {
  Globe2,
  Puzzle,
  Workflow,
  TableProperties,
  SmartphoneNfc,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Section from '../components/Section'
import Card from '../components/Card'

const cards = [
  {
    id: 'websites',
    icon: <Globe2 className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: 'apps',
    icon: <Puzzle className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: 'automations',
    icon: <Workflow className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: 'exitExcel',
    icon: <TableProperties className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: 'widgets',
    icon: <SmartphoneNfc className="h-6 w-6" aria-hidden="true" />,
  },
] as const

export const Offer = () => {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section
      id="offer"
      title={t('offer.title')}
      description={t('offer.subtitle')}
      className="relative"
    >
      <motion.div
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ amount: 0.3, once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            title={t(`offer.cards.${card.id}.title`)}
            description={t(`offer.cards.${card.id}.body`)}
            icon={card.icon}
          />
        ))}
      </motion.div>
    </Section>
  )
}

export default Offer
