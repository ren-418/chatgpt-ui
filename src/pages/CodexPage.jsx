import { Menu, Code2, ArrowUpRight } from 'lucide-react'

export default function CodexPage({ onOpenSidebar, onStartChat }) {
  return (
    <div className="page plain-page">
      <header className="page-header">
        <div className="page-header-left">
          <button type="button" className="icon-btn mobile-only" onClick={onOpenSidebar} aria-label="Menu">
            <Menu size={20} />
          </button>
          <h1>Codex</h1>
        </div>
      </header>

      <div className="plain-body codex-body">
        <div className="codex-promo">
          <div className="codex-promo-text">
            <h2>Build software with Codex</h2>
            <p>
              A coding-focused workspace for reading repos, writing patches, and iterating on features — without leaving ChatGPT.
            </p>
            <button type="button" className="upgrade-btn" onClick={onStartChat}>
              Start coding chat <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="codex-terminal">
            <div className="codex-terminal-bar">
              <span /><span /><span />
            </div>
            <pre>{`> Fix the auth bug in signup flow
  Scanning src/auth...
  Proposed patch ready for review.`}</pre>
          </div>
        </div>

        <div className="codex-features">
          <div className="codex-feature">
            <Code2 size={20} />
            <h3>Code-aware chat</h3>
            <p>Ask about diffs, tests, and architecture in one thread.</p>
          </div>
          <div className="codex-feature">
            <Code2 size={20} />
            <h3>Local-first UI</h3>
            <p>This demo keeps everything on-device — no API calls.</p>
          </div>
          <div className="codex-feature">
            <Code2 size={20} />
            <h3>Upgrade path</h3>
            <p>Connect a real backend later for agentic coding.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
