import { createSignal, onCleanup, onMount, type JSX } from 'solid-js'
import { portfolio, type SkillCategory } from '../../content/portfolio'
import './SkillsSection.css'

type SkillDialCategory = Omit<SkillCategory, 'icon'> & {
  icon: () => JSX.Element
}

type SkillIconId =
  | 'architecture'
  | 'backend'
  | 'design'
  | 'frontend'
  | 'performance'
  | 'state'
  | 'styling'
  | 'testing'
  | 'tools'
  | 'typescript'

const MAX_ROTATION = 324
const STEP_ANGLE = 36

const skillIconFactories = {
  frontend: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" y1="22" x2="12" y2="15.5" class="no-fill" />
      <polyline points="22 8.5 12 15.5 2 8.5" class="no-fill" />
      <polyline points="2 15.5 12 8.5 22 15.5" class="no-fill" />
      <line x1="12" y1="2" x2="12" y2="8.5" class="no-fill" />
    </svg>
  ),
  state: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" class="no-fill" />
      <polyline points="2 17 12 22 22 17" class="no-fill" />
    </svg>
  ),
  styling: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  typescript: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" class="no-fill" />
      <line x1="12" y1="17" x2="12" y2="21" class="no-fill" />
    </svg>
  ),
  backend: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" class="no-fill" />
      <line x1="6" y1="18" x2="6.01" y2="18" class="no-fill" />
    </svg>
  ),
  architecture: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  performance: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <rect x="10" y="10" width="4" height="10" rx="1" ry="1" />
      <rect x="16" y="4" width="4" height="16" rx="1" ry="1" />
      <rect x="4" y="16" width="4" height="4" rx="1" ry="1" />
    </svg>
  ),
  testing: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  tools: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <polyline points="8 10 12 14 8 18" class="no-fill" />
      <line x1="14" y1="18" x2="18" y2="18" class="no-fill" />
    </svg>
  ),
  design: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" class="no-fill" />
      <line x1="9" y1="21" x2="9" y2="9" class="no-fill" />
    </svg>
  ),
} satisfies Record<SkillIconId, () => JSX.Element>

const skillCategories: SkillDialCategory[] = portfolio.skills.map(skill => ({
  ...skill,
  icon: skillIconFactories[skill.id as SkillIconId],
}))

const clampRotation = (rotation: number) => Math.max(0, Math.min(MAX_ROTATION, rotation))
const normalizeRotation = (rotation: number) => ((rotation % 360) + 360) % 360

export default function SkillsSection() {
  const [rotation, setRotation] = createSignal(0)
  const [activeIndex, setActiveIndex] = createSignal(0)
  const [isDragging, setIsDragging] = createSignal(false)

  let dialRef: HTMLDivElement | undefined
  let containerRef: HTMLSectionElement | undefined
  let rotationRef = 0
  let lockState: 'locked' | 'unlocked' = 'unlocked'
  let scrollAccumulatorRef = 0
  let lastRectRef: DOMRect | null = null
  let touchPrevY = 0

  const unlockBodyScroll = () => {
    if (lockState === 'locked') {
      lockState = 'unlocked'
      document.body.style.overflow = ''
    }
  }

  const updateDialState = (targetRotation: number) => {
    const clampedRotation = clampRotation(targetRotation)
    const normalized = normalizeRotation(clampedRotation)
    const nextIndex = Math.round(normalized / STEP_ANGLE) % skillCategories.length

    rotationRef = clampedRotation
    setRotation(clampedRotation)
    setActiveIndex(nextIndex)
  }

  const getAngle = (clientX: number, clientY: number) => {
    if (!dialRef) return 0

    const rect = dialRef.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = clientX - centerX
    const y = clientY - centerY

    return (Math.atan2(y, x) * 180) / Math.PI + 90
  }

  onMount(() => {
    const container = containerRef
    if (!container) return

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = [' ', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown']
      const isScrollIntent = scrollKeys.includes(event.key) || (event.metaKey && (event.key === 'ArrowDown' || event.key === 'ArrowUp'))

      if (!isScrollIntent) return

      window.__is_keyboard_navigating = true
      if (window.__key_nav_timeout) clearTimeout(window.__key_nav_timeout)
      window.__key_nav_timeout = setTimeout(() => {
        window.__is_keyboard_navigating = false
      }, 800)

      if (lockState === 'locked') {
        unlockBodyScroll()
        if (event.key === 'ArrowUp' || event.key === 'PageUp' || event.key === 'Home') {
          updateDialState(0)
        } else {
          updateDialState(MAX_ROTATION)
        }
      }
    }

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight
      const isSmallScreen = rect.height > vh

      if (window.__is_navigating || window.__is_global_pointer_down || window.__is_keyboard_navigating) {
        unlockBodyScroll()
        lastRectRef = rect

        if (rect.top < 0) {
          updateDialState(MAX_ROTATION)
        } else if (rect.top > vh) {
          updateDialState(0)
        }

        return
      }

      if (lockState === 'locked') {
        return
      }

      const lastRect = lastRectRef
      lastRectRef = rect

      if (!lastRect) return

      let shouldTrap = false
      let snapTop: number | null = null

      if (isSmallScreen) {
        const trapLineDown = vh + 2
        const trapLineUp = -2

        if (lastRect.bottom > trapLineDown && rect.bottom <= trapLineDown) {
          if (rotationRef < MAX_ROTATION) {
            shouldTrap = true
            snapTop = rect.top + (trapLineDown - rect.bottom)
          }
        }

        if (lastRect.top < trapLineUp && rect.top >= trapLineUp) {
          if (rotationRef > 0) {
            shouldTrap = true
            snapTop = trapLineUp
          }
        }
      } else {
        const centerTop = (vh - rect.height) / 2

        if (lastRect.top > centerTop + 2 && rect.top <= centerTop + 2) {
          if (rotationRef < MAX_ROTATION) {
            shouldTrap = true
            snapTop = centerTop + 2
          }
        }

        if (lastRect.top < centerTop - 2 && rect.top >= centerTop - 2) {
          if (rotationRef > 0) {
            shouldTrap = true
            snapTop = centerTop - 2
          }
        }
      }

      if (!shouldTrap || snapTop === null) return

      lockState = 'locked'
      scrollAccumulatorRef = 0
      document.body.style.overflow = 'hidden'

      if (Math.abs(rect.top - snapTop) > 0.5) {
        window.scrollTo({
          left: window.scrollX,
          top: window.scrollY + rect.top - snapTop,
          behavior: 'instant' as ScrollBehavior,
        })
      }
    }

    const handleWheel = (event: WheelEvent) => {
      if (lockState !== 'locked') return

      event.preventDefault()

      const delta = event.deltaY
      let nextRotation = rotationRef + delta * 0.4

      if (nextRotation <= 0) {
        nextRotation = 0
        scrollAccumulatorRef += delta
      } else if (nextRotation >= MAX_ROTATION) {
        nextRotation = MAX_ROTATION
        scrollAccumulatorRef += delta
      } else {
        scrollAccumulatorRef = 0
      }

      updateDialState(nextRotation)

      if (scrollAccumulatorRef > 50 && nextRotation === MAX_ROTATION) {
        unlockBodyScroll()
      } else if (scrollAccumulatorRef < -50 && nextRotation === 0) {
        unlockBodyScroll()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchPrevY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (lockState !== 'locked') return
      if (event.cancelable) event.preventDefault()

      const currentY = event.touches[0]?.clientY ?? touchPrevY
      const delta = touchPrevY - currentY
      touchPrevY = currentY

      let nextRotation = rotationRef + delta * 0.8

      if (nextRotation <= 0) {
        nextRotation = 0
        scrollAccumulatorRef += delta
      } else if (nextRotation >= MAX_ROTATION) {
        nextRotation = MAX_ROTATION
        scrollAccumulatorRef += delta
      } else {
        scrollAccumulatorRef = 0
      }

      updateDialState(nextRotation)

      if (scrollAccumulatorRef > 50 && nextRotation === MAX_ROTATION) {
        unlockBodyScroll()
      } else if (scrollAccumulatorRef < -50 && nextRotation === 0) {
        unlockBodyScroll()
      }
    }

    const handleGlobalPointerDown = () => {
      window.__is_global_pointer_down = true
    }

    const handleGlobalPointerUp = () => {
      window.__is_global_pointer_down = false
    }

    const handleGlobalPointerMove = (event: PointerEvent) => {
      if (event.buttons === 0) {
        window.__is_global_pointer_down = false
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('pointerdown', handleGlobalPointerDown, { passive: true })
    window.addEventListener('pointerup', handleGlobalPointerUp, { passive: true })
    window.addEventListener('pointercancel', handleGlobalPointerUp, { passive: true })
    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true })

    lastRectRef = container.getBoundingClientRect()

    onCleanup(() => {
      document.body.style.overflow = ''
      window.__is_global_pointer_down = false
      window.__is_keyboard_navigating = false
      window.removeEventListener('keydown', handleGlobalKeyDown)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('pointerdown', handleGlobalPointerDown)
      window.removeEventListener('pointerup', handleGlobalPointerUp)
      window.removeEventListener('pointercancel', handleGlobalPointerUp)
      window.removeEventListener('pointermove', handleGlobalPointerMove)
    })
  })

  const handlePointerDown = (event: PointerEvent) => {
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (!isDragging()) return

    const angle = getAngle(event.clientX, event.clientY)
    const currentRotation = rotationRef
    let currentMod = currentRotation % 360

    if (currentMod < 0) currentMod += 360

    let delta = angle - currentMod
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360

    let nextRotation = currentRotation + delta

    nextRotation = clampRotation(nextRotation)
    updateDialState(nextRotation)
  }

  const handlePointerUp = (event: PointerEvent) => {
    if (!isDragging()) return

    setIsDragging(false)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const snappedRotation = Math.round(rotationRef / STEP_ANGLE) * STEP_ANGLE
    updateDialState(clampRotation(snappedRotation))
  }

  const handleNotchClick = (index: number) => {
    if (isDragging()) return
    updateDialState(index * STEP_ANGLE)
  }

  const activeCategory = () => skillCategories[activeIndex()]

  return (
    <section
      ref={el => {
        containerRef = el
      }}
      id="skills"
      class="skills-section-container reveal-on-scroll"
    >
      <div class="skills-sticky-wrapper">
        <div class="section-header text-center" style={{ 'margin-bottom': '2rem' }}>
          <h2 id="skills-heading" class="neu-text">Skills</h2>
        </div>

        <div class="skills-console">
          <div class="dial-map-container">
            <div
              ref={el => {
                dialRef = el
              }}
              class="dial-wrapper"
            >
              {Array.from({ length: 55 }, (_, index) => {
                const angle = index * 6
                const isMajor = angle % 36 === 0

                return (
                  <div
                    class={`dial-tick ${isMajor ? 'major' : 'minor'}`}
                    style={{ transform: `rotate(${angle}deg)` }}
                  />
                )
              })}

              <div class="dial-ring neu-pressed" />

              {skillCategories.map((skill, index) => {
                const angle = index * 36

                return (
                  <div
                    class={`dial-notch ${index === activeIndex() ? 'active' : ''}`}
                    onClick={() => handleNotchClick(index)}
                    style={{ transform: `rotate(${angle}deg) translateY(calc(var(--dial-size) / -2))` }}
                    title={skill.category}
                  >
                    <div class="notch-icon" style={{ transform: `rotate(-${angle}deg)` }}>
                      {skill.icon()}
                    </div>
                    <div class="notch-dot" />
                  </div>
                )
              })}

              <div
                class="dial-knob neu-convex"
                onPointerCancel={handlePointerUp}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                style={{ transform: `rotate(${rotation()}deg)` }}
              >
                <div class="dial-indicator neu-pressed" />
                <div class="dial-center-dome">TECH</div>
              </div>
            </div>
          </div>

          <div class="console-display neu-pressed">
            <div class="display-header">
              <span class="display-category">{activeCategory().category}</span>
            </div>

            <div class="tech-tags-container">
              {activeCategory().tags.map(tag => (
                <span class="tech-tag neu-flat">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
