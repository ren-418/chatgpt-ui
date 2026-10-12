import { useRef } from 'react'
import { Plus, AudioLines, ArrowUp, Lightbulb } from 'lucide-react'

export default function Composer({
  value,
  onChange,
  onSend,
  placeholder = 'Ask ChatGPT',
  thinkActive,
  onThinkToggle,
  onAttach,
  autoFocus,
  inputRef,
}) {
  const localRef = useRef(null)
  const ref = inputRef || localRef

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) onSend()
    }
  }

  const hasText = value.trim().length > 0

  return (
    <div className="composer">
      <button type="button" className="composer-icon-btn" aria-label="Attach" onClick={onAttach}>
        <Plus size={20} strokeWidth={1.75} />
      </button>
      <textarea
        ref={ref}
        className="composer-input"
        rows={1}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        autoFocus={autoFocus}
      />
      <button
        type="button"
        className={`composer-think ${thinkActive ? 'on' : ''}`}
        onClick={onThinkToggle}
        aria-pressed={!!thinkActive}
      >
        <Lightbulb size={14} strokeWidth={2} />
        Think
      </button>
      <button
        type="button"
        className={`composer-voice ${hasText ? 'send' : ''}`}
        aria-label={hasText ? 'Send' : 'Voice'}
        onClick={() => {
          if (hasText) onSend()
        }}
      >
        {hasText ? <ArrowUp size={18} strokeWidth={2.5} /> : <AudioLines size={18} strokeWidth={2} />}
      </button>
    </div>
  )
}
