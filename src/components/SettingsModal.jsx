import { useState } from 'react'
import {
  X,
  Search,
  Settings,
  User,
  Shield,
  CreditCard,
  Boxes,
  Brain,
  Activity,
  Moon,
  Sun,
  Monitor,
  Sparkles,
  Link2,
  Puzzle,
} from 'lucide-react'
import { initialsFrom } from '../store'

const SECTIONS = [
  { group: 'Settings', items: [
    { id: 'general', label: 'General', Icon: Settings },
    { id: 'account', label: 'Account', Icon: User },
    { id: 'privacy', label: 'Privacy', Icon: Shield },
    { id: 'billing', label: 'Billing', Icon: CreditCard },
    { id: 'capabilities', label: 'Capabilities', Icon: Boxes },
    { id: 'memory', label: 'Memory', Icon: Brain },
    { id: 'reflect', label: 'Reflect', Icon: Activity },
    { id: 'focus', label: 'Time and focus', Icon: Moon },
  ]},
  { group: 'Customize', items: [
    { id: 'skills', label: 'Skills', Icon: Sparkles },
    { id: 'connectors', label: 'Connectors', Icon: Link2 },
    { id: 'plugins', label: 'Plugins', Icon: Puzzle },
  ]},
]

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      className={`toggle ${on ? 'on' : ''}`}
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
    >
      <span className="toggle-knob" />
    </button>
  )
}

function Row({ title, desc, children }) {
  return (
    <div className="settings-row">
      <div className="settings-row-text">
        <div className="settings-row-title">{title}</div>
        {desc && <div className="settings-row-desc">{desc}</div>}
      </div>
      <div className="settings-row-ctrl">{children}</div>
    </div>
  )
}

export default function SettingsModal({ open, onClose, profile, settings, onUpdateProfile, onUpdateSettings }) {
  const [tab, setTab] = useState('general')
  const [nameDraft, setNameDraft] = useState(profile.name)
  const [search, setSearch] = useState('')

  if (!open) return null

  const flat = SECTIONS.flatMap((g) => g.items)
  const filtered = search.trim()
    ? flat.filter((i) => i.label.toLowerCase().includes(search.trim().toLowerCase()))
    : null

  function set(key, val) {
    onUpdateSettings({ ...settings, [key]: val })
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <aside className="settings-nav">
          <div className="settings-search">
            <Search size={14} />
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {filtered ? (
            <div className="settings-nav-group">
              {filtered.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={`settings-nav-item ${tab === id ? 'active' : ''}`}
                  onClick={() => { setTab(id); setSearch('') }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                  {label}
                </button>
              ))}
            </div>
          ) : (
            SECTIONS.map((g) => (
              <div key={g.group} className="settings-nav-group">
                <div className="settings-nav-label">{g.group}</div>
                {g.items.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`settings-nav-item ${tab === id ? 'active' : ''}`}
                    onClick={() => setTab(id)}
                  >
                    <Icon size={16} strokeWidth={1.75} />
                    {label}
                  </button>
                ))}
              </div>
            ))
          )}
        </aside>

        <div className="settings-main">
          <div className="settings-main-head">
            <h2>{flat.find((i) => i.id === tab)?.label || 'Settings'}</h2>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div className="settings-body">
            {tab === 'general' && (
              <>
                <Row title="Theme" desc="Appearance of ChatGPT">
                  <div className="theme-seg">
                    {[
                      { id: 'system', Icon: Monitor, label: 'System' },
                      { id: 'light', Icon: Sun, label: 'Light' },
                      { id: 'dark', Icon: Moon, label: 'Dark' },
                    ].map(({ id, Icon, label }) => (
                      <button
                        key={id}
                        type="button"
                        className={settings.theme === id ? 'on' : ''}
                        title={label}
                        onClick={() => set('theme', id)}
                      >
                        <Icon size={16} />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </Row>
                <Row title="Language" desc="Language used for ChatGPT responses">
                  <select
                    className="settings-select"
                    value={settings.language}
                    onChange={(e) => set('language', e.target.value)}
                  >
                    <option>Auto-detect</option>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                  </select>
                </Row>
                <Row title="Spoken language" desc="For voice conversations">
                  <select
                    className="settings-select"
                    value={settings.spokenLanguage}
                    onChange={(e) => set('spokenLanguage', e.target.value)}
                  >
                    <option>Auto-detect</option>
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </Row>
                <Row title="Show follow-up suggestions" desc="Suggest related questions after replies">
                  <Toggle on={settings.showFollowUps} onChange={(v) => set('showFollowUps', v)} />
                </Row>
                <Row title="Voice mode" desc="Enable voice conversations">
                  <Toggle on={settings.voiceMode} onChange={(v) => set('voiceMode', v)} />
                </Row>
                <Row title="Archive chats automatically" desc="Move inactive chats to archive">
                  <Toggle on={settings.archiveChats} onChange={(v) => set('archiveChats', v)} />
                </Row>
              </>
            )}

            {tab === 'account' && (
              <>
                <div className="account-card">
                  <span className="avatar lg">{initialsFrom(profile.name)}</span>
                  <div>
                    <div className="profile-name">{profile.name}</div>
                    <div className="profile-plan">{profile.plan} plan</div>
                  </div>
                </div>
                <Row title="Display name" desc="Shown in the sidebar">
                  <div className="name-edit">
                    <input
                      className="settings-input"
                      value={nameDraft}
                      onChange={(e) => setNameDraft(e.target.value)}
                    />
                    <button
                      type="button"
                      className="settings-save"
                      onClick={() => onUpdateProfile({ ...profile, name: nameDraft.trim() || profile.name })}
                    >
                      Save
                    </button>
                  </div>
                </Row>
                <Row title="Email notifications" desc="Product updates and tips">
                  <Toggle on={settings.notifyEmail} onChange={(v) => set('notifyEmail', v)} />
                </Row>
                <Row title="Push notifications" desc="Alerts on this device">
                  <Toggle on={settings.notifyPush} onChange={(v) => set('notifyPush', v)} />
                </Row>
              </>
            )}

            {tab === 'privacy' && (
              <>
                <Row title="Improve the model for everyone" desc="Share chats to help improve ChatGPT">
                  <Toggle on={settings.improveModel} onChange={(v) => set('improveModel', v)} />
                </Row>
                <Row title="Memory" desc="Reference previous chats for better answers">
                  <Toggle on={settings.memory} onChange={(v) => set('memory', v)} />
                </Row>
              </>
            )}

            {tab === 'billing' && (
              <div className="settings-promo">
                <div>
                  <h3>You are on Free</h3>
                  <p>Upgrade for higher limits, advanced models, and more.</p>
                  <button type="button" className="upgrade-btn">Upgrade plan</button>
                </div>
              </div>
            )}

            {tab === 'capabilities' && (
              <>
                <Row title="Browse the web" desc="Allow ChatGPT to search when useful">
                  <Toggle on={true} onChange={() => {}} />
                </Row>
                <Row title="Create images" desc="Generate images from text prompts">
                  <Toggle on={true} onChange={() => {}} />
                </Row>
                <Row title="Code interpreter" desc="Run code and analyze files">
                  <Toggle on={true} onChange={() => {}} />
                </Row>
              </>
            )}

            {tab === 'memory' && (
              <>
                <Row title="Reference saved memories" desc="Use details you have asked ChatGPT to remember">
                  <Toggle on={settings.memory} onChange={(v) => set('memory', v)} />
                </Row>
                <p className="settings-hint">No saved memories yet. Ask ChatGPT to remember something in a chat.</p>
              </>
            )}

            {tab === 'reflect' && (
              <p className="settings-hint">Insights about how you use ChatGPT will appear here.</p>
            )}

            {tab === 'focus' && (
              <>
                <Row title="Do not disturb" desc="Silence notifications during focus hours">
                  <Toggle on={false} onChange={() => {}} />
                </Row>
              </>
            )}

            {(tab === 'skills' || tab === 'connectors' || tab === 'plugins') && (
              <p className="settings-hint">Nothing configured yet. Add items from the main {tab} page.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
