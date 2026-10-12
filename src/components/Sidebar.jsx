import { useState } from 'react'
import {
  PanelLeft,
  Search,
  Plus,
  Image,
  Clock,
  Puzzle,
  Hexagon,
  MoreHorizontal,
  Folder,
  Gift,
  Pin,
  Trash2,
  Pencil,
  FolderPlus,
} from 'lucide-react'
import { initialsFrom } from '../store'

const NAV = [
  { id: 'images', label: 'Images', Icon: Image },
  { id: 'scheduled', label: 'Scheduled', Icon: Clock },
  { id: 'plugins', label: 'Plugins', Icon: Puzzle },
  { id: 'codex', label: 'Codex', Icon: Hexagon },
  { id: 'explore', label: 'Explore', Icon: MoreHorizontal },
]

export default function Sidebar({
  open,
  mobileOpen,
  onCollapse,
  onCloseMobile,
  page,
  onNavigate,
  chats,
  projects,
  pinned,
  activeChatId,
  profile,
  onNewChat,
  onSelectChat,
  onSearch,
  onOpenSettings,
  onRenameChat,
  onDeleteChat,
  onPinChat,
  onUnpin,
  onCreateProject,
  onDeleteProject,
  onCreatePinnedFolder,
}) {
  const [menuId, setMenuId] = useState(null)
  const [renaming, setRenaming] = useState(null)
  const [renameVal, setRenameVal] = useState('')

  const recentChats = chats.filter((c) => !pinned.some((p) => p.type === 'chat' && p.id === c.id))

  function startRename(chat) {
    setRenaming(chat.id)
    setRenameVal(chat.title)
    setMenuId(null)
  }

  function commitRename(id) {
    const t = renameVal.trim()
    if (t) onRenameChat(id, t)
    setRenaming(null)
  }

  return (
    <>
      {mobileOpen && <div className="sidebar-backdrop" onClick={onCloseMobile} />}
      <aside className={`sidebar ${open ? '' : 'collapsed'} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-top">
          <span className="wordmark">ChatGPT</span>
          <div className="sidebar-top-actions">
            <button type="button" className="icon-btn" aria-label="Search" onClick={onSearch}>
              <Search size={18} strokeWidth={1.75} />
            </button>
            <button type="button" className="icon-btn" aria-label="Collapse sidebar" onClick={onCollapse}>
              <PanelLeft size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="sidebar-scroll">
          <button type="button" className="nav-row new-chat" onClick={onNewChat}>
            <span className="nav-icon-box">
              <Plus size={16} strokeWidth={2} />
            </span>
            New chat
          </button>

          <nav className="nav-list">
            {NAV.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={`nav-row ${page === id ? 'active' : ''}`}
                onClick={() => onNavigate(id)}
              >
                <Icon size={18} strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </nav>

          <section className="side-section">
            <div className="side-section-head">
              <span>Pinned</span>
              <button
                type="button"
                className="section-add"
                title="Add pinned folder"
                onClick={() => {
                  const name = window.prompt('Folder name')
                  if (name?.trim()) onCreatePinnedFolder(name.trim())
                }}
              >
                <FolderPlus size={14} />
              </button>
            </div>
            {pinned.length === 0 && <p className="side-empty">Pin chats or folders</p>}
            {pinned.map((item) => (
              <div key={`${item.type}-${item.id}`} className="side-item-wrap">
                <button
                  type="button"
                  className={`side-item ${item.type === 'chat' && item.id === activeChatId ? 'active' : ''}`}
                  onClick={() => {
                    if (item.type === 'chat') onSelectChat(item.id)
                  }}
                >
                  {item.type === 'folder' ? <Folder size={16} strokeWidth={1.75} /> : <Pin size={16} strokeWidth={1.75} />}
                  <span className="side-item-label">{item.title || item.name}</span>
                </button>
                <button type="button" className="side-item-more" onClick={() => onUnpin(item)} aria-label="Unpin">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </section>

          <section className="side-section">
            <div className="side-section-head">
              <span>Projects</span>
              <button type="button" className="section-add" title="New project" onClick={onCreateProject}>
                <FolderPlus size={14} />
              </button>
            </div>
            {projects.length === 0 && <p className="side-empty">No projects yet</p>}
            {projects.map((p) => (
              <div key={p.id} className="side-item-wrap">
                <button type="button" className="side-item">
                  <Folder size={16} strokeWidth={1.75} />
                  <span className="side-item-label">{p.name}</span>
                </button>
                <button
                  type="button"
                  className="side-item-more"
                  aria-label="Delete project"
                  onClick={() => onDeleteProject(p.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </section>

          <section className="side-section">
            <div className="side-section-head">
              <span>Recents</span>
            </div>
            {recentChats.length === 0 && <p className="side-empty">No chats yet</p>}
            {recentChats.map((chat) => (
              <div key={chat.id} className="side-item-wrap">
                {renaming === chat.id ? (
                  <input
                    className="rename-input"
                    value={renameVal}
                    autoFocus
                    onChange={(e) => setRenameVal(e.target.value)}
                    onBlur={() => commitRename(chat.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename(chat.id)
                      if (e.key === 'Escape') setRenaming(null)
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    className={`side-item ${chat.id === activeChatId && page === 'chat' ? 'active' : ''}`}
                    onClick={() => onSelectChat(chat.id)}
                  >
                    <span className="side-item-label">{chat.title}</span>
                  </button>
                )}
                <button
                  type="button"
                  className="side-item-more"
                  aria-label="Chat options"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMenuId(menuId === chat.id ? null : chat.id)
                  }}
                >
                  <MoreHorizontal size={14} />
                </button>
                {menuId === chat.id && (
                  <div className="chat-menu" onClick={(e) => e.stopPropagation()}>
                    <button type="button" onClick={() => startRename(chat)}>
                      <Pencil size={14} /> Rename
                    </button>
                    <button type="button" onClick={() => { onPinChat(chat); setMenuId(null) }}>
                      <Pin size={14} /> Pin
                    </button>
                    <button type="button" className="danger" onClick={() => { onDeleteChat(chat.id); setMenuId(null) }}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </section>
        </div>

        <div className="sidebar-footer">
          <button type="button" className="profile-row" onClick={onOpenSettings}>
            <span className="avatar">{initialsFrom(profile.name)}</span>
            <span className="profile-meta">
              <span className="profile-name">{profile.name}</span>
              <span className="profile-plan">{profile.plan}</span>
            </span>
          </button>
          <button type="button" className="claim-btn">
            <Gift size={16} strokeWidth={1.75} className="gift-icon" />
            Claim offer
          </button>
        </div>
      </aside>
    </>
  )
}
