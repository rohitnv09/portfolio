import { portfolio } from '../../content/portfolio'
import Icon from '../ui/Icon'
import { useHorizontalScroller } from '../../hooks/useHorizontalScroller'
import './ArticlesSection.css'

export default function ArticlesSection() {
  const scroller = useHorizontalScroller()

  return (
    <section id="articles" class="articles-section reveal-on-scroll">
      <div class="section-header text-center">
        <h2 class="neu-text">Articles</h2>
      </div>

      <div ref={scroller.bindScrollRef} class="projects-scroll" onScroll={scroller.handleScroll}>
        {portfolio.articles.map(article => (
          <div class="project-card neu-flat" style={{ 'min-height': '180px' }}>
            <div class="project-content">
              <span class="project-badge" style={{ display: 'block', 'margin-bottom': '0.8rem', opacity: 0.7, padding: 0 }}>
                {article.date}
              </span>
              <h3 class="serif-text" style={{ 'font-size': '1.4rem' }}>
                {article.title}
              </h3>

              <div class="project-links" style={{ display: 'flex', gap: '1rem', 'margin-top': 'auto', 'padding-top': '1.5rem' }}>
                <a
                  class="neu-button demo-btn"
                  href={article.link}
                  rel="noreferrer"
                  style={{ padding: '0.75rem 1.25rem', 'border-radius': '100px', 'font-size': '0.9rem', display: 'flex', 'align-items': 'center', gap: '0.5rem', 'text-decoration': 'none' }}
                  target="_blank"
                >
                  <span class="demo-text">Read Article</span>
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
