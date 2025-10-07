import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import clsx from 'classnames'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  activeSection: string
  sections: Array<{ id: string; label: string }>
}
export const Header = ({ activeSection, sections }: HeaderProps) => {
  const { t } = useTranslation('common')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/15 bg-background/80 header-blur">
      <div className="mx-auto flex w-full items-center justify-between gap-4 px-6 py-4 sm:px-10 max-w-none lg:max-w-none">
        <a
          href="#hero"
          className="flex shrink-0 items-center gap-3 rounded-xl text-left"
          aria-label={t('brand.name', { defaultValue: 'WGen' })}
          onClick={handleNavClick}
        >
          <span className="relative flex items-center">
            <span
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
          boxShadow: '0 0 6px 2px rgba(255,255,255,0.25)',
          filter: 'blur(4px)',
          zIndex: 0,
              }}
              aria-hidden="true"
            />
            <img
              src="/logo.svg"
              alt="WGen logo"
              className="h-12 w-auto sm:h-14 rounded-xl relative z-10"
            />
          </span>
        </a>

        <nav className="hidden items-center gap-0 md:flex" aria-label="Main navigation">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={handleNavClick}
              className={clsx(
                'rounded-full px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] font-display transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 lg:text-[0.8rem] lg:px-6',
                activeSection === section.id
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted hover:text-foreground',
              )}
            >
              <span className="relative inline-flex items-center gap-1">
                {section.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            className="font-display text-xs uppercase tracking-[0.3em] text-muted transition hover:text-foreground md:hidden"
            aria-label={isMenuOpen ? t('actions.closeMenu') : t('actions.openMenu')}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] as const }}
            className="md:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-2 border-t border-white/10 bg-background/95 px-6 pb-6 pt-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={clsx(
                      'block rounded-xl px-4 py-3 text-base font-semibold uppercase tracking-[0.18em] font-display transition-colors',
                      activeSection === section.id
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted hover:text-foreground',
                    )}
                    onClick={handleNavClick}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Header
