/**
 * Provides the localized single-page marketing layout and binds section navigation.
 */
import { useEffect, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import Offer from '../sections/Offer'
import NewEra from '../sections/NewEra'
import Technologies from '../sections/Technologies'
import Products from '../sections/Products'
import Experience from '../sections/Experience'
import About from '../sections/About'
import Hobby from '../sections/Hobby'
import Contact from '../sections/Contact'
import AuroraBackground from '../components/AuroraBackground'
import { useActiveSection } from '../hooks/useActiveSection'
import Seo from '../components/Seo'
import { useTranslation } from 'react-i18next'

const SECTION_IDS = [
  'offer',
  'newEra',
  'technologies',
  'products',
  'experience',
  'about',
  'hobby',
  'contact',
] as const

type SectionId = (typeof SECTION_IDS)[number]

function HomePage() {
  const { t: _t } = useTranslation(['common', 'home'])

  const _sections = useMemo(
    () =>
      SECTION_IDS.map((section) => {
        const _sectionId = section as SectionId
        return {
          id: section,
          label: _t(`common:navigation.${_sectionId}`),
        }
      }),
    [_t],
  )

  const {
    activeSection: _activeSection,
    setActiveSection: _setActiveSection,
  } = useActiveSection(SECTION_IDS)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = 'dark'
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Seo />
      <Header
        sections={_sections}
        activeSection={_activeSection}
        onSectionSelect={(sectionId) => _setActiveSection(sectionId)}
      />
      <main className="relative z-10 flex flex-col gap-20 pb-24">
        <AuroraBackground />
        <Hero />
        <Offer />
        <NewEra />
        <Products />
        <Technologies />
        <Experience />
        <About />
        <Hobby />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
