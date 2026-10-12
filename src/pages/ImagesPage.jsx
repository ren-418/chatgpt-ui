import { useRef, useState } from 'react'
import { Gift, Menu } from 'lucide-react'
import Composer from '../components/Composer'
import { IMAGE_STYLES } from '../store'

export default function ImagesPage({
  selectedStyle,
  onSelectStyle,
  onGenerate,
  onOpenSidebar,
}) {
  const [tab, setTab] = useState('trending')
  const [draft, setDraft] = useState('')
  const [think, setThink] = useState(false)
  const [generated, setGenerated] = useState([])
  const inputRef = useRef(null)

  function pickStyle(style) {
    onSelectStyle(style.id)
    inputRef.current?.focus()
  }

  function send() {
    const text = draft.trim()
    if (!text) return
    const style = IMAGE_STYLES.find((s) => s.id === selectedStyle)
    const entry = {
      id: `${Date.now()}`,
      prompt: text,
      styleLabel: style?.label || null,
      gradient: style?.gradient || 'linear-gradient(145deg,#333,#666)',
    }
    setGenerated((g) => [entry, ...g])
    onGenerate?.(text, selectedStyle)
    setDraft('')
  }

  const templates = IMAGE_STYLES.slice(0, 8)

  return (
    <div className="page images-page">
      <header className="page-header">
        <div className="page-header-left">
          <button type="button" className="icon-btn mobile-only" onClick={onOpenSidebar} aria-label="Menu">
            <Menu size={20} />
          </button>
          <h1>Images</h1>
        </div>
        <button type="button" className="offer-link">
          <Gift size={16} className="gift-icon" />
          Free offer
        </button>
      </header>

      <div className="images-tabs">
        <button type="button" className={tab === 'trending' ? 'active' : ''} onClick={() => setTab('trending')}>
          Trending
        </button>
        <button type="button" className={tab === 'templates' ? 'active' : ''} onClick={() => setTab('templates')}>
          Templates
        </button>
      </div>

      <div className="images-scroll">
        {generated.length > 0 && (
          <div className="generated-strip">
            {generated.map((g) => (
              <div key={g.id} className="generated-card" style={{ background: g.gradient }}>
                <span>{g.prompt}</span>
                {g.styleLabel && <em>{g.styleLabel}</em>}
              </div>
            ))}
          </div>
        )}

        <div className="style-grid">
          {(tab === 'trending' ? IMAGE_STYLES : templates).map((style) => (
            <button
              key={style.id}
              type="button"
              className={`style-card ${selectedStyle === style.id ? 'selected' : ''}`}
              onClick={() => pickStyle(style)}
            >
              <div className="style-art" style={{ background: style.gradient }}>
                {style.pattern === 'sketch' && <div className="sketch-flower" />}
              </div>
              <span className="style-label">{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="composer-wrap">
        <Composer
          value={draft}
          onChange={setDraft}
          onSend={send}
          thinkActive={think}
          onThinkToggle={() => setThink((t) => !t)}
          placeholder="Describe a new image"
          inputRef={inputRef}
        />
      </div>
    </div>
  )
}
