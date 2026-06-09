import { portfolio } from '../../content/portfolio'
import Icon from '../ui/Icon'
import { useHorizontalScroller } from '../../hooks/useHorizontalScroller'
import './ProjectsSection.css'

export default function ProjectsSection() {
  const scroller = useHorizontalScroller()

  return (
    <section id="projects" class="projects-section reveal-on-scroll">
      <div class="section-header text-center">
        <h2 class="neu-text">Projects</h2>
      </div>

      <div ref={scroller.bindScrollRef} class="projects-scroll" onScroll={scroller.handleScroll}>
        {portfolio.projects.map(project => (
          <div class="project-card neu-flat">
            <div class="project-content">
              <h3 class="serif-text">{project.title}</h3>
              <p>{project.desc}</p>

              <div
                class="project-links"
                style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '1rem', 'margin-top': 'auto', 'padding-top': '1.5rem' }}
              >
                <a
                  class="neu-button demo-btn"
                  href={project.liveLink}
                  rel="noreferrer"
                  style={{ padding: '0.75rem 1.25rem', 'border-radius': '100px', 'font-size': '0.9rem', display: 'flex', 'align-items': 'center', gap: '0.5rem', 'text-decoration': 'none', 'white-space': 'nowrap' }}
                  target="_blank"
                >
                  <span class="demo-text">Live Demo</span>
                  <Icon name="external" size={14} style={{ opacity: 0.7 }} />
                </a>
                <a
                  aria-label="GitHub"
                  class="neu-button github-btn"
                  href={project.githubLink}
                  rel="noreferrer"
                  style={{ padding: '0.75rem 1.25rem', 'border-radius': '100px', 'font-size': '0.9rem', display: 'flex', 'align-items': 'center', gap: '0.5rem', 'text-decoration': 'none', 'white-space': 'nowrap' }}
                  target="_blank"
                >
                  <Icon name="github" size={18} />
                  <Icon name="external" size={14} style={{ opacity: 0.7 }} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div class="custom-scrollbar-container">
        <div ref={scroller.bindTrackRef} class="custom-scrollbar-track" style={{ width: `${scroller.trackWidth}px` }}>
          <div
            class="custom-scrollbar-thumb"
            onMouseDown={scroller.handleThumbMouseDown}
            onTouchStart={scroller.handleThumbTouchStart}
            style={{
              height: `${scroller.thumbWidth}px`,
              transform: `translateX(${scroller.scrollProgress() * scroller.maxTranslate}px)`,
              width: `${scroller.thumbWidth}px`,
            }}
          />
        </div>
      </div>
    </section>
  )
}
