import { createSignal, onCleanup, onMount } from 'solid-js'
import { portfolio } from '../../content/portfolio'
import Icon from '../ui/Icon'
import './Navigation.css'

export default function Navigation() {
  const [activeSection, setActiveSection] = createSignal('home')

  const syncActiveSection = () => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    let current = 'home'
    const scrollY = window.scrollY

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id') ?? current
      }
    })

    setActiveSection(current)
  }

  const handleNavClick = (event: MouseEvent, targetId: string) => {
    event.preventDefault()

    window.__is_navigating = true
    if (window.__nav_timeout) clearTimeout(window.__nav_timeout)
    window.__nav_timeout = setTimeout(() => {
      window.__is_navigating = false
    }, 1200)

    if (targetId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.querySelector<HTMLElement>(targetId)
    if (target) {
      const targetRect = target.getBoundingClientRect()
      const offset = targetId === '#skills-heading' ? 300 : 0
      const top = window.scrollY + targetRect.top - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  onMount(() => {
    syncActiveSection()
    window.addEventListener('scroll', syncActiveSection, { passive: true })

    onCleanup(() => {
      window.removeEventListener('scroll', syncActiveSection)
    })
  })

  return (
    <nav class="top-nav">
      <div class="nav-container neu-flat">
        {portfolio.navigation.map(item => (
          <a
            aria-label={item.label}
            class="nav-icon"
            classList={{
              'active-nav': item.activeSections.includes(activeSection()),
            }}
            href={item.href}
            onClick={event => handleNavClick(event, item.href)}
          >
            <Icon name={item.icon} size={22} />
          </a>
        ))}
      </div>
    </nav>
  )
}
