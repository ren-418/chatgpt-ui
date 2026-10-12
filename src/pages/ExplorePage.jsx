import { Menu, Sparkles } from 'lucide-react'
import { EXPLORE_CATALOG } from '../store'

export default function ExplorePage({ onOpenSidebar, onPick }) {
  return (
    <div className="page plain-page">
      <header className="page-header">
        <div className="page-header-left">
          <button type="button" className="icon-btn mobile-only" onClick={onOpenSidebar} aria-label="Menu">
            <Menu size={20} />
          </button>
          <h1>Explore</h1>
        </div>
      </header>

      <div className="plain-body">
        <p className="explore-intro">Discover GPTs and specialized assistants.</p>
        <div className="explore-grid">
          {EXPLORE_CATALOG.map((item) => (
            <button
              key={item.id}
              type="button"
              className="explore-card"
              onClick={() => onPick?.(item)}
            >
              <span className="explore-icon" style={{ background: item.color }}>
                <Sparkles size={18} />
              </span>
              <span className="explore-name">{item.name}</span>
              <span className="explore-desc">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
