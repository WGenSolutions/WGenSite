import { useEffect, useRef, useState } from 'react'

interface Options {
  /**
   * Ratio (0 - 1) of the viewport height that acts as the "activation" line.
   * Defaults to 0.35 (35% down from the top of the viewport).
   */
  triggerRatio?: number
  /**
   * Optional section id to use as the initial highlight before any scroll occurs.
   */
  initialSection?: string
}

export const useActiveSection = (
  sectionIds: readonly string[],
  { triggerRatio = 0.15, initialSection }: Options = {},
) => {
  const fallbackSection = initialSection ?? sectionIds[0] ?? ''
  const [activeSection, setActiveSection] = useState(fallbackSection)
  const activeSectionRef = useRef(activeSection)

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) {
      return
    }

    const getSectionElements = () =>
      sectionIds
        .map((id) => {
          const element = document.getElementById(id)
          if (!element) {
            return null
          }
          return { id, element }
        })
        .filter((item): item is { id: string; element: HTMLElement } => Boolean(item))

    const computeActiveSection = () => {
      const elements = getSectionElements()
      if (elements.length === 0) {
        return activeSectionRef.current
      }

      const triggerLine = window.innerHeight * triggerRatio

      const sectionsAboveTrigger = elements
        .map(({ id, element }) => ({ id, top: element.getBoundingClientRect().top }))
        .filter((section) => section.top <= triggerLine)

      if (sectionsAboveTrigger.length > 0) {
        return sectionsAboveTrigger.reduce((closest, current) =>
          current.top > closest.top ? current : closest,
        ).id
      }

      const closestSection = elements
        .map(({ id, element }) => ({
          id,
          distance: Math.abs(element.getBoundingClientRect().top - triggerLine),
        }))
        .reduce<{
          id: string
          distance: number
        } | null>((closest, current) => {
          if (!closest || current.distance < closest.distance) {
            return current
          }
          return closest
        }, null)

      return closestSection?.id ?? elements[0]?.id ?? fallbackSection
    }

    let frameRequest: number | null = null

    const scheduleUpdate = () => {
      if (frameRequest !== null) {
        return
      }
      frameRequest = window.requestAnimationFrame(() => {
        frameRequest = null
        const nextSection = computeActiveSection()
        if (nextSection && nextSection !== activeSectionRef.current) {
          setActiveSection(nextSection)
        }
      })
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        return
      }
      scheduleUpdate()
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    scheduleUpdate()

    return () => {
      if (frameRequest !== null) {
        window.cancelAnimationFrame(frameRequest)
      }
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [fallbackSection, sectionIds, triggerRatio])

  return { activeSection, setActiveSection }
}
