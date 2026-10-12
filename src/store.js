const KEY = 'chatgpt-ui-v2'

export function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function initialsFrom(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const defaultSettings = () => ({
  theme: 'system',
  language: 'Auto-detect',
  spokenLanguage: 'Auto-detect',
  showFollowUps: true,
  voiceMode: true,
  memory: true,
  archiveChats: false,
  improveModel: true,
  notifyEmail: false,
  notifyPush: true,
})

export const defaultState = () => ({
  profile: { name: 'Tom', plan: 'Free' },
  page: 'chat',
  workMode: false,
  chats: [],
  activeChatId: null,
  projects: [],
  pinned: [],
  scheduled: [],
  plugins: [],
  selectedImageStyle: null,
  settings: defaultSettings(),
})

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    return {
      ...defaultState(),
      ...parsed,
      profile: { ...defaultState().profile, ...(parsed.profile || {}) },
      settings: { ...defaultSettings(), ...(parsed.settings || {}) },
      chats: parsed.chats || [],
      projects: parsed.projects || [],
      pinned: parsed.pinned || [],
      scheduled: parsed.scheduled || [],
      plugins: parsed.plugins || [],
    }
  } catch {
    return defaultState()
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export const IMAGE_STYLES = [
  { id: 'aerial', label: 'Aerial view', gradient: 'linear-gradient(145deg,#1a4a3a 0%,#2d6a4f 40%,#95d5b2 100%)' },
  { id: 'tin', label: "Collector's tin", gradient: 'linear-gradient(160deg,#3d2b1f 0%,#c4a35a 45%,#8b6914 100%)' },
  { id: '80s', label: "'80s flashback", gradient: 'linear-gradient(135deg,#ff00aa 0%,#7b2ff7 50%,#00d4ff 100%)' },
  { id: 'caricature', label: 'Caricature', gradient: 'linear-gradient(160deg,#ff9a56 0%,#ff6b6b 50%,#feca57 100%)' },
  { id: 'sketch', label: 'Sketch', gradient: 'linear-gradient(180deg,#1a1a1a 0%,#2a2a2a 50%,#3d5a3d 100%)', pattern: 'sketch' },
  { id: 'stickers', label: 'Stickers', gradient: 'linear-gradient(145deg,#ffeaa7 0%,#fd79a8 40%,#a29bfe 100%)' },
  { id: 'oktoberfest', label: 'Oktoberfest throwback', gradient: 'linear-gradient(160deg,#6b3a1f 0%,#c45c26 40%,#f0c27b 100%)' },
  { id: 'photobooth', label: 'Photo booth', gradient: 'linear-gradient(180deg,#2c2c2c 0%,#555 40%,#ddd 100%)' },
  { id: 'y2k', label: 'Y2K digicam', gradient: 'linear-gradient(135deg,#00f5d4 0%,#7b2ff7 50%,#f15bb5 100%)' },
  { id: 'anime', label: 'Anime', gradient: 'linear-gradient(160deg,#4a90d9 0%,#e8a0bf 50%,#f5d0c5 100%)' },
  { id: '70s', label: '70s portrait', gradient: 'linear-gradient(145deg,#8b4513 0%,#cd853f 40%,#daa520 100%)' },
  { id: 'impressionist', label: 'Impressionist painting', gradient: 'linear-gradient(160deg,#5b8c5a 0%,#c9b458 40%,#6b8cae 100%)' },
  { id: 'pins', label: 'Pin collection', gradient: 'linear-gradient(145deg,#1a1a2e 0%,#e94560 40%,#f5a623 100%)' },
  { id: 'underwater', label: 'Underwater', gradient: 'linear-gradient(180deg,#023e8a 0%,#0077b6 40%,#90e0ef 100%)' },
  { id: '3d', label: '3D avatar', gradient: 'linear-gradient(160deg,#48cae4 0%,#0077b6 40%,#023e8a 100%)' },
  { id: 'acrylic', label: 'Acrylic painting', gradient: 'linear-gradient(145deg,#9b2226 0%,#ae2012 30%,#ee9b00 70%,#94d2bd 100%)' },
  { id: 'felted', label: 'Felted miniature', gradient: 'linear-gradient(160deg,#d4a373 0%,#faedcd 40%,#ccd5ae 100%)' },
  { id: 'tarot', label: 'Tarot card', gradient: 'linear-gradient(180deg,#1a0533 0%,#4a1942 40%,#c9a227 100%)' },
  { id: 'statue', label: 'Statue', gradient: 'linear-gradient(160deg,#2b2b2b 0%,#8a8a8a 40%,#e8e8e8 100%)' },
  { id: 'claymation', label: 'Claymation world', gradient: 'linear-gradient(145deg,#e76f51 0%,#f4a261 40%,#2a9d8f 100%)' },
]

export const EXPLORE_CATALOG = [
  { id: 'writing', name: 'Writing Assistant', desc: 'Draft emails, essays, and more', color: '#3b82f6' },
  { id: 'code', name: 'Code Companion', desc: 'Debug and explain code', color: '#22c55e' },
  { id: 'research', name: 'Research Scout', desc: 'Summarize sources and findings', color: '#a855f7' },
  { id: 'design', name: 'Design Critic', desc: 'Feedback on UI and visuals', color: '#f59e0b' },
  { id: 'travel', name: 'Travel Planner', desc: 'Itineraries and tips', color: '#06b6d4' },
  { id: 'fitness', name: 'Fitness Coach', desc: 'Workouts and nutrition ideas', color: '#ef4444' },
  { id: 'study', name: 'Study Buddy', desc: 'Quizzes and explanations', color: '#8b5cf6' },
  { id: 'cook', name: 'Kitchen Help', desc: 'Recipes from what you have', color: '#f97316' },
]
