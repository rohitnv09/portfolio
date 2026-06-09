import { createSignal } from 'solid-js'
import { portfolio } from '../../content/portfolio'
import Icon from '../ui/Icon'
import './ExperienceSection.css'

type ExpandedState = Record<number, boolean>

export default function ExperienceSection() {
  const [expanded, setExpanded] = createSignal<ExpandedState>({})

  const toggleExpand = (id: number) => {
    setExpanded(previous => ({ ...previous, [id]: !previous[id] }))
  }

  return (
    <section id="experience" class="experience-section reveal-on-scroll">
      <div class="section-header text-center">
        <h2 class="neu-text">Experience</h2>
      </div>

      <div class="timeline-container">
        {portfolio.experiences.map(exp => {
          const isExpanded = () => expanded()[exp.id] ?? false
          const hasMore = exp.bullets.length > 2

          return (
            <div class="timeline-item">
              <div class="timeline-track neu-pressed">
                <div class="timeline-node neu-convex" />
              </div>
              <div class="timeline-content neu-flat" style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
                <div
                  class="exp-header"
                  style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'flex-start', 'flex-wrap': 'wrap', gap: '1rem' }}
                >
                  <div>
                    <h3 style={{ 'font-size': '1.6rem', margin: '0', color: 'var(--text-primary)', 'letter-spacing': '0.02em' }}>
                      {exp.company}
                    </h3>
                    <div style={{ 'font-size': '1.1rem', color: 'var(--text-primary)', 'font-weight': '500', 'margin-top': '0.4rem', opacity: 0.85 }}>
                      {exp.role}
                    </div>
                  </div>
                  <div style={{ 'text-align': 'right' }}>
                    <div style={{ color: 'var(--text-secondary)', 'font-weight': '600', 'font-size': '1.05rem' }}>{exp.date}</div>
                    <div style={{ 'font-size': '0.9rem', color: 'var(--text-secondary)', 'margin-top': '0.2rem', opacity: 0.8 }}>
                      {exp.location}
                    </div>
                  </div>
                </div>

                <div class="exp-body" style={{ display: 'flex', 'flex-direction': 'column' }}>
                  <ul class="exp-bullets" style={{ 'padding-left': '1.2rem', color: 'var(--text-secondary)', margin: 0, 'font-weight': 400 }}>
                    {exp.bullets.slice(0, 2).map(bullet => (
                      <li style={{ 'margin-bottom': '0.8rem', 'line-height': '1.6' }}>{bullet}</li>
                    ))}
                  </ul>

                  <div style={{ display: 'grid', 'grid-template-rows': isExpanded() ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s ease-in-out' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <ul class="exp-bullets" style={{ 'padding-left': '1.2rem', color: 'var(--text-secondary)', margin: 0, 'font-weight': 400 }}>
                        {exp.bullets.slice(2).map(bullet => (
                          <li style={{ 'margin-bottom': '0.8rem', 'line-height': '1.6' }}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {hasMore && (
                    <button
                      class="neu-button demo-btn"
                      onClick={() => toggleExpand(exp.id)}
                      style={{
                        'align-self': 'flex-end',
                        'border-radius': '100px',
                        border: 'none',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        'font-family': 'inherit',
                        'font-size': '0.9rem',
                        'font-weight': '600',
                        gap: '0.5rem',
                        'justify-content': 'center',
                        'margin-top': '0.5rem',
                        padding: '0.75rem 1.25rem',
                        transition: 'all 0.4s ease-in-out',
                        width: isExpanded() ? '125px' : '155px',
                        'white-space': 'nowrap',
                      }}
                      type="button"
                    >
                      <span class="demo-text">{isExpanded() ? 'Read less' : `Read more (${exp.bullets.length - 2})`}</span>
                      <Icon
                        name="chevron-down"
                        size={14}
                        style={{ transform: isExpanded() ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease-in-out' }}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
