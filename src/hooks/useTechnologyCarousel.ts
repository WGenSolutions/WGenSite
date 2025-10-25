/**
 * Maintains the desktop-only auto-scroll experience for the technologies carousel.
 * It keeps the strip gently moving on pointer-based large screens while respecting
 * reduced-motion preferences and native scroll behaviour on touch devices.
 */
import { useEffect } from 'react'
import type { MutableRefObject } from 'react'

/** Controls the per-frame auto-scroll step that produces a gentle marquee effect. */
const AUTO_SCROLL_SPEED = 0.5
/** Milliseconds to wait before resuming auto-scroll after manual input. */
const RESUME_DELAY_MS = 2400
/** Media query that targets large, pointer-based viewports where mouse wheels are present. */
const DESKTOP_QUERY = '(pointer: fine) and (min-width: 1024px)'

export const useTechnologyCarousel = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  prefersReducedMotion: boolean,
) => {
  useEffect(() => {
    if (prefersReducedMotion) return undefined
    if (typeof window === 'undefined') return undefined

    const _container = containerRef.current
    if (!_container) return undefined

    const _mediaQuery = window.matchMedia(DESKTOP_QUERY)
    let _autoScrollActive = false
    let _rafId: number | null = null
    let _resumeTimeout: ReturnType<typeof setTimeout> | null = null
    let _isPaused = false
    let _scrollDirection = 1
    let _hasWheelListener = false
  let _hasHoverListener = false

    const _applyWheelListener = () => {
      if (_hasWheelListener) return
      _container.addEventListener('wheel', _handleWheel, { passive: false })
      _hasWheelListener = true
    }

    const _removeWheelListener = () => {
      if (!_hasWheelListener) return
      _container.removeEventListener('wheel', _handleWheel)
      _hasWheelListener = false
    }

    /** Adds pointer hover listeners that pause the auto-scroll when hovered. */
    const _applyHoverListeners = () => {
      if (_hasHoverListener) return
      _container.addEventListener('pointerenter', _handlePointerEnter)
      _container.addEventListener('pointerleave', _handlePointerLeave)
      _hasHoverListener = true
    }

    /** Removes pointer hover listeners when auto-scroll is disabled. */
    const _removeHoverListeners = () => {
      if (!_hasHoverListener) return
      _container.removeEventListener('pointerenter', _handlePointerEnter)
      _container.removeEventListener('pointerleave', _handlePointerLeave)
      _hasHoverListener = false
    }

    const _cancelAnimation = () => {
      if (_rafId === null) return
      window.cancelAnimationFrame(_rafId)
      _rafId = null
    }

    const _start = () => {
      if (!_autoScrollActive) return
      if (_rafId !== null) return
      _isPaused = false
      _rafId = window.requestAnimationFrame(_step)
    }

    const _scheduleResume = () => {
      if (_resumeTimeout !== null) {
        window.clearTimeout(_resumeTimeout)
        _resumeTimeout = null
      }

      _resumeTimeout = window.setTimeout(() => {
        if (!_autoScrollActive) {
          _resumeTimeout = null
          return
        }
        _isPaused = false
        _start()
        _resumeTimeout = null
      }, RESUME_DELAY_MS)
    }

    const _pause = (shouldResume: boolean) => {
      _isPaused = true
      _cancelAnimation()

      if (_resumeTimeout !== null) {
        window.clearTimeout(_resumeTimeout)
        _resumeTimeout = null
      }

      if (!shouldResume) return
      _scheduleResume()
    }

    const _handleWheel = (event: WheelEvent) => {
      if (!_autoScrollActive) return
      const _primaryDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (_primaryDelta === 0) return

      event.preventDefault()
      _pause(true)
      _container.scrollLeft += _primaryDelta
      _scrollDirection = _primaryDelta > 0 ? 1 : -1
    }

    /** Stops the marquee while a desktop cursor hovers over the strip. */
    const _handlePointerEnter = (event: PointerEvent) => {
      if (!_autoScrollActive) return
      if (event.pointerType !== 'mouse') return
      _pause(false)
    }

    /** Restarts the marquee after the cursor leaves the strip. */
    const _handlePointerLeave = (event: PointerEvent) => {
      if (!_autoScrollActive) return
      if (event.pointerType !== 'mouse') return
      _scheduleResume()
    }

    const _step = () => {
      if (!_autoScrollActive) {
        _cancelAnimation()
        return
      }

      const _maxScroll = _container.scrollWidth - _container.clientWidth
      if (_maxScroll <= 0) {
        _pause(false)
        return
      }

      _container.scrollLeft += AUTO_SCROLL_SPEED * _scrollDirection

      if (_container.scrollLeft <= 0) {
        _scrollDirection = 1
      } else if (_container.scrollLeft >= _maxScroll) {
        _scrollDirection = -1
      }

      if (!_isPaused) {
        _rafId = window.requestAnimationFrame(_step)
        return
      }

      _cancelAnimation()
    }

    const _syncAutoScroll = () => {
      const _isScrollable = _container.scrollWidth > _container.clientWidth + 1
      const _shouldActivate = _mediaQuery.matches && _isScrollable

      if (_shouldActivate === _autoScrollActive) return

      _autoScrollActive = _shouldActivate

      if (_autoScrollActive) {
        _applyWheelListener()
        _applyHoverListeners()
        _start()
        return
      }

      _removeWheelListener()
      _removeHoverListeners()
      _pause(false)
    }

    const _handleMediaChange = () => {
      _syncAutoScroll()
      if (_autoScrollActive && _isPaused) {
        _scheduleResume()
      }
    }

    const _handleResize = () => {
      _syncAutoScroll()
    }

    _syncAutoScroll()

    if (typeof _mediaQuery.addEventListener === 'function') {
      _mediaQuery.addEventListener('change', _handleMediaChange)
    } else {
      _mediaQuery.addListener(_handleMediaChange)
    }

    window.addEventListener('resize', _handleResize)

    return () => {
      _removeWheelListener()
      _removeHoverListeners()
      _pause(false)
      if (_resumeTimeout !== null) {
        window.clearTimeout(_resumeTimeout)
        _resumeTimeout = null
      }

      if (typeof _mediaQuery.removeEventListener === 'function') {
        _mediaQuery.removeEventListener('change', _handleMediaChange)
      } else {
        _mediaQuery.removeListener(_handleMediaChange)
      }

      window.removeEventListener('resize', _handleResize)
    }
  }, [containerRef, prefersReducedMotion])
}
