import { useState } from 'react'
import { Puzzle, Menu, Plus, Trash2 } from 'lucide-react'

export default function PluginsPage({ plugins, onAdd, onDelete, onOpenSidebar }) {
  const [name, setName] = useState('')

  function add() {
    const n = name.trim()
    if (!n) return
    onAdd(n)
    setName('')
  }

  return (
    <div className="page plain-page">
      <header className="page-header">
        <div className="page-header-left">
          <button type="button" className="icon-btn mobile-only" onClick={onOpenSidebar} aria-label="Menu">
            <Menu size={20} />
          </button>
          <h1>Plugins</h1>
        </div>
      </header>

      <div className="plain-body">
        <div className="add-bar">
          <Puzzle size={18} strokeWidth={1.75} />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Plugin name"
            onKeyDown={(e) => e.key === 'Enter' && add()}
          />
          <button type="button" className="primary-pill" onClick={add}>
            <Plus size={16} /> Add plugin
          </button>
        </div>

        {plugins.length === 0 ? (
          <div className="empty-block">
            <Puzzle size={40} strokeWidth={1.25} className="empty-icon" />
            <h2>No plugins yet</h2>
            <p>Add a plugin placeholder to organize tools you want to connect later.</p>
          </div>
        ) : (
          <ul className="plugin-list">
            {plugins.map((p) => (
              <li key={p.id} className="plugin-card">
                <div className="plugin-icon">
                  <Puzzle size={18} />
                </div>
                <div className="plugin-info">
                  <div className="plugin-name">{p.name}</div>
                  <div className="plugin-meta">Local placeholder · Not connected</div>
                </div>
                <button type="button" className="icon-btn" onClick={() => onDelete(p.id)} aria-label="Remove">
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
