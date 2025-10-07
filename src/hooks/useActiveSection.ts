import { useEffect, useState } from 'react'

interface Options {
  margin?: string
  threshold?: number
}

export const useActiveSection = (
  sectionIds: readonly string[],
  { margin = '-30% 0px -50% 0px', threshold = 0.4 }: Options = {},
) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (sectionIds.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .forEach((entry) => {
            const id = entry.target.getAttribute('id')
            if (id) {
              setActiveSection(id)
            }
          })
      },
      {
        rootMargin: margin,
        threshold,
      },
    )

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, [margin, sectionIds, threshold])

  return activeSection
}
