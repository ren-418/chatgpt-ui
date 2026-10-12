import { useState } from 'react'
import { Clock, Menu, Plus, Trash2 } from 'lucide-react'

export default function ScheduledPage({ tasks, onAdd, onDelete, onOpenSidebar }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [when, setWhen] = useState('')
  const [prompt, setPrompt] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!title.trim() || !when) return
    onAdd({ title: title.trim(), when, prompt: prompt.trim() })
    setTitle('')
    setWhen('')
    setPrompt('')
    setOpen(false)
  }

  return (
    <div className="page plain-page">
      <header className="page-header">
        <div className="page-header-left">
          <button type="button" className="icon-btn mobile-only" onClick={onOpenSidebar} aria-label="Menu">
            <Menu size={20} />
          </button>
          <h1>Scheduled</h1>
        </div>
        <button type="button" className="primary-pill" onClick={() => setOpen(true)}>
          <Plus size={16} /> Create
        </button>
      </header>

      <div className="plain-body">
        {tasks.length === 0 && !open && (
          <div className="empty-block">
            <Clock size={40} strokeWidth={1.25} className="empty-icon" />
            <h2>No scheduled tasks</h2>
            <p>Create a task to run prompts on a schedule. Everything stays on this device.</p>
            <button type="button" className="primary-pill" onClick={() => setOpen(true)}>
              <Plus size={16} /> Create scheduled task
            </button>
          </div>
        )}

        {open && (
          <form className="schedule-form" onSubmit={submit}>
            <h2>New scheduled task</h2>
            <label>
              Title
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Weekly summary" required />
            </label>
            <label>
              When
              <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} required />
            </label>
            <label>
              Prompt
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="What should ChatGPT do?" rows={4} />
            </label>
            <div className="form-actions">
              <button type="button" className="ghost-pill" onClick={() => setOpen(false)}>Cancel</button>
              <button type="submit" className="primary-pill">Save</button>
            </div>
          </form>
        )}

        {tasks.length > 0 && (
          <ul className="task-list">
            {tasks.map((t) => (
              <li key={t.id} className="task-card">
                <div>
                  <div className="task-title">{t.title}</div>
                  <div className="task-meta">{new Date(t.when).toLocaleString()}</div>
                  {t.prompt && <div className="task-prompt">{t.prompt}</div>}
                </div>
                <button type="button" className="icon-btn" onClick={() => onDelete(t.id)} aria-label="Delete">
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
