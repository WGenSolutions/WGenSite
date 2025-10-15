import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Offer from './sections/Offer'
import Products from './sections/Products'
import Experience from './sections/Experience'
import About from './sections/About'
import Hobby from './sections/Hobby'
import Contact from './sections/Contact'
import AuroraBackground from './components/AuroraBackground'
import { useActiveSection } from './hooks/useActiveSection'

const SECTION_IDS = [
  'offer',
  'products',
  'experience',
  'about',
  'hobby',
  'contact',
] as const

type SectionId = (typeof SECTION_IDS)[number]

function App() {
  const { t, i18n } = useTranslation(['common', 'home'])

  const sections = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        label: t(`common:navigation.${id as SectionId}`),
      })),
    [t],
  )

  const { activeSection, setActiveSection } = useActiveSection(SECTION_IDS)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.title = t('common:meta.title')
    const description = document.querySelector("meta[name='description']")
    if (description) {
      description.setAttribute('content', t('common:meta.description'))
    }
    const ogTitle = document.querySelector("meta[property='og:title']")
    if (ogTitle) {
      ogTitle.setAttribute('content', t('common:meta.title'))
    }
    const ogDescription = document.querySelector("meta[property='og:description']")
    if (ogDescription) {
      ogDescription.setAttribute('content', t('common:meta.description'))
    }
  }, [t, i18n.language])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = 'dark'
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Header
        sections={sections}
        activeSection={activeSection}
        onSectionSelect={(sectionId) => setActiveSection(sectionId)}
      />
      <main className="relative z-10 flex flex-col gap-20 pb-24">
        <AuroraBackground />
        <Hero />
        <Offer />
        <Products />
        <Experience />
        <About />
        <Hobby />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
