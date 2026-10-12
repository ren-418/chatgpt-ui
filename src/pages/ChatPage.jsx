import { useEffect, useRef, useState } from 'react'
import { Gift, CircleUserRound, Menu, PanelLeft } from 'lucide-react'
import Composer from '../components/Composer'

export default function ChatPage({
  chat,
  workMode,
  onWorkMode,
  onSend,
  onOpenSettings,
  onOpenSidebar,
  sidebarCollapsed,
  onExpandSidebar,
}) {
  const [draft, setDraft] = useState('')
  const [think, setThink] = useState(false)
  const endRef = useRef(null)
  const empty = !chat || chat.messages.length === 0

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.id, chat?.messages?.length])

  function send() {
    const text = draft.trim()
    if (!text) return
    onSend(text, think)
    setDraft('')
  }

  return (
    <div className="page chat-page">
      <header className="topbar">
        <div className="topbar-left">
          {sidebarCollapsed && (
            <button type="button" className="icon-btn desktop-only" onClick={onExpandSidebar} aria-label="Open sidebar">
              <PanelLeft size={18} />
            </button>
          )}
          <button type="button" className="icon-btn mobile-only" onClick={onOpenSidebar} aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
        <div className="mode-toggle">
          <button type="button" className={!workMode ? 'active' : ''} onClick={() => onWorkMode(false)}>
            Chat
          </button>
          <button type="button" className={workMode ? 'active' : ''} onClick={() => onWorkMode(true)}>
            <span className="plus-blue">+</span> Work
          </button>
        </div>
        <div className="topbar-right">
          <button type="button" className="offer-link">
            <Gift size={16} className="gift-icon" />
            Free offer
          </button>
          <button type="button" className="icon-btn profile-icon" onClick={onOpenSettings} aria-label="Settings">
            <CircleUserRound size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="chat-scroll">
        {empty ? (
          <div className="empty-hero">
            <h1>What&apos;s on your mind today?</h1>
          </div>
        ) : (
          <div className="messages">
            {chat.messages.map((m) => (
              <div key={m.id} className={`msg ${m.role}`}>
                <div className="msg-bubble">{m.content}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div className="composer-wrap">
        <Composer
          value={draft}
          onChange={setDraft}
          onSend={send}
          thinkActive={think}
          onThinkToggle={() => setThink((t) => !t)}
          placeholder="Ask ChatGPT"
        />
        <p className="disclaimer">ChatGPT is AI and can make mistakes. Check important info.</p>
      </div>
    </div>
  )
}
