import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import SearchOverlay from './components/SearchOverlay'
import SettingsModal from './components/SettingsModal'
import ChatPage from './pages/ChatPage'
import ImagesPage from './pages/ImagesPage'
import ScheduledPage from './pages/ScheduledPage'
import PluginsPage from './pages/PluginsPage'
import CodexPage from './pages/CodexPage'
import ExplorePage from './pages/ExplorePage'
import { loadState, saveState, uid } from './store'
import { applyTheme, watchSystemTheme } from './theme'
import './App.css'

export default function App() {
  const [state, setState] = useState(loadState)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    applyTheme(state.settings.theme)
    return watchSystemTheme(state.settings.theme, () => applyTheme('system'))
  }, [state.settings.theme])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function patch(partial) {
    setState((s) => ({ ...s, ...partial }))
  }

  function navigate(page) {
    patch({ page })
    setMobileOpen(false)
  }

  function newChat() {
    const chat = { id: uid(), title: 'New chat', createdAt: Date.now(), messages: [] }
    patch({ chats: [chat, ...state.chats], activeChatId: chat.id, page: 'chat' })
    setMobileOpen(false)
  }

  function selectChat(id) {
    patch({ activeChatId: id, page: 'chat' })
    setMobileOpen(false)
  }

  function renameChat(id, title) {
    patch({
      chats: state.chats.map((c) => (c.id === id ? { ...c, title } : c)),
      pinned: state.pinned.map((p) => (p.type === 'chat' && p.id === id ? { ...p, title } : p)),
    })
  }

  function deleteChat(id) {
    const chats = state.chats.filter((c) => c.id !== id)
    const pinned = state.pinned.filter((p) => !(p.type === 'chat' && p.id === id))
    const activeChatId = state.activeChatId === id ? (chats[0]?.id || null) : state.activeChatId
    patch({ chats, pinned, activeChatId })
  }

  function pinChat(chat) {
    if (state.pinned.some((p) => p.type === 'chat' && p.id === chat.id)) return
    patch({ pinned: [...state.pinned, { type: 'chat', id: chat.id, title: chat.title }] })
  }

  function unpin(item) {
    patch({ pinned: state.pinned.filter((p) => !(p.type === item.type && p.id === item.id)) })
  }

  function createPinnedFolder(name) {
    patch({ pinned: [...state.pinned, { type: 'folder', id: uid(), name, title: name }] })
  }

  function createProject() {
    const name = window.prompt('Project name')
    if (!name?.trim()) return
    patch({ projects: [...state.projects, { id: uid(), name: name.trim() }] })
  }

  function deleteProject(id) {
    patch({ projects: state.projects.filter((p) => p.id !== id) })
  }

  function sendMessage(text, think) {
    let chats = [...state.chats]
    let activeId = state.activeChatId
    let chat = chats.find((c) => c.id === activeId)

    if (!chat) {
      chat = { id: uid(), title: text.slice(0, 42), createdAt: Date.now(), messages: [] }
      chats = [chat, ...chats]
      activeId = chat.id
    }

    const userMsg = { id: uid(), role: 'user', content: text, at: Date.now() }
    const reply = think
      ? `(Thinking…) Here's a local reply to: "${text}"`
      : `Got it — local reply to: "${text}"`
    const botMsg = { id: uid(), role: 'assistant', content: reply, at: Date.now() }

    const title = chat.messages.length === 0 && chat.title === 'New chat' ? text.slice(0, 42) : chat.title
    chats = chats.map((c) =>
      c.id === activeId
        ? { ...c, title, messages: [...c.messages, userMsg, botMsg] }
        : c,
    )

    patch({ chats, activeChatId: activeId, page: 'chat' })
  }

  function addScheduled(task) {
    patch({ scheduled: [{ id: uid(), ...task }, ...state.scheduled] })
  }

  function deleteScheduled(id) {
    patch({ scheduled: state.scheduled.filter((t) => t.id !== id) })
  }

  function addPlugin(name) {
    patch({ plugins: [{ id: uid(), name }, ...state.plugins] })
  }

  function deletePlugin(id) {
    patch({ plugins: state.plugins.filter((p) => p.id !== id) })
  }

  function explorePick(item) {
    const chat = { id: uid(), title: item.name, createdAt: Date.now(), messages: [] }
    patch({ chats: [chat, ...state.chats], activeChatId: chat.id, page: 'chat' })
  }

  const activeChat = state.chats.find((c) => c.id === state.activeChatId) || null

  return (
    <div className="app">
      <Sidebar
        open={sidebarOpen}
        mobileOpen={mobileOpen}
        onCollapse={() => {
          if (window.innerWidth <= 768) setMobileOpen(false)
          else setSidebarOpen(false)
        }}
        onCloseMobile={() => setMobileOpen(false)}
        page={state.page}
        onNavigate={navigate}
        chats={state.chats}
        projects={state.projects}
        pinned={state.pinned}
        activeChatId={state.activeChatId}
        profile={state.profile}
        onNewChat={newChat}
        onSelectChat={selectChat}
        onSearch={() => setSearchOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onRenameChat={renameChat}
        onDeleteChat={deleteChat}
        onPinChat={pinChat}
        onUnpin={unpin}
        onCreateProject={createProject}
        onDeleteProject={deleteProject}
        onCreatePinnedFolder={createPinnedFolder}
      />

      <main className={`main ${sidebarOpen ? '' : 'full'}`}>
        {state.page === 'chat' && (
          <ChatPage
            chat={activeChat}
            workMode={state.workMode}
            onWorkMode={(v) => patch({ workMode: v })}
            onSend={sendMessage}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenSidebar={() => setMobileOpen(true)}
            sidebarCollapsed={!sidebarOpen}
            onExpandSidebar={() => setSidebarOpen(true)}
          />
        )}
        {state.page === 'images' && (
          <ImagesPage
            selectedStyle={state.selectedImageStyle}
            onSelectStyle={(id) => patch({ selectedImageStyle: id })}
            onOpenSidebar={() => setMobileOpen(true)}
          />
        )}
        {state.page === 'scheduled' && (
          <ScheduledPage
            tasks={state.scheduled}
            onAdd={addScheduled}
            onDelete={deleteScheduled}
            onOpenSidebar={() => setMobileOpen(true)}
          />
        )}
        {state.page === 'plugins' && (
          <PluginsPage
            plugins={state.plugins}
            onAdd={addPlugin}
            onDelete={deletePlugin}
            onOpenSidebar={() => setMobileOpen(true)}
          />
        )}
        {state.page === 'codex' && (
          <CodexPage
            onOpenSidebar={() => setMobileOpen(true)}
            onStartChat={newChat}
          />
        )}
        {state.page === 'explore' && (
          <ExplorePage
            onOpenSidebar={() => setMobileOpen(true)}
            onPick={explorePick}
          />
        )}
      </main>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        chats={state.chats}
        onSelect={selectChat}
      />

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        profile={state.profile}
        settings={state.settings}
        onUpdateProfile={(profile) => patch({ profile })}
        onUpdateSettings={(settings) => patch({ settings })}
      />
    </div>
  )
}
