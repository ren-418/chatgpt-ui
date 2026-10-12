# ChatGPT UI Clone

React + Vite UI clone of the ChatGPT product shell. Full interface behavior is local only — no OpenAI API.

## Features

- **Dark / light / system** theme (Settings → General)
- Sidebar: New chat, Images, Scheduled, Plugins, Codex, Explore, Pinned, Projects, Recents
- Chat composer (attach, Think, voice/send) with local replies
- Images page with Trending / Templates style grid
- Scheduled, Plugins, Codex, Explore pages
- Settings modal (General, Account, Privacy, Billing, etc.)
- Search overlay for chats
- Responsive sidebar (drawer on mobile)
- State persisted in `localStorage` (`chatgpt-ui-v2`)

## Setup

```bash
cd chatgpt
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server (`--host`) |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |

## Stack

- React 18
- Vite 5
- lucide-react

## Notes

- No API keys or network model calls
- Chats, projects, pins, settings are created by you and stored locally
