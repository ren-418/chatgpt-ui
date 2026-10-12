import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchOverlay({ open, onClose, chats, onSelect }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  if (!open) return null

  const filtered = chats.filter((c) => c.title.toLowerCase().includes(q.trim().toLowerCase()))

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-bar">
          <Search size={18} strokeWidth={1.75} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search chats"
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="search-results">
          {filtered.length === 0 && <p className="search-empty">No chats found</p>}
          {filtered.map((c) => (
            <button
              key={c.id}
              type="button"
              className="search-result"
              onClick={() => {
                onSelect(c.id)
                onClose()
              }}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
