import { createSignal, onMount, onCleanup, Show } from 'solid-js'
import Icon from './Icon'
import './HeroTerminal.css'

const COMMANDS = [
  { cmd: 'status', out: 'hireable: <span class="term-val-success">yes</span>' },
  { cmd: 'whoami', out: '"Frontend / Full-Stack Engineer"' },
  { cmd: 'location', out: '"Remote / Global"' },
  { cmd: 'coffee_level', out: '[████████░░] 80%' },
  { cmd: 'npm run build', out: '<span style="color: #a2ff00">✓</span> Compiled in 2.2s' }
]

export default function HeroTerminal() {
  const [cmdIndex, setCmdIndex] = createSignal(0)
  const [typedCmd, setTypedCmd] = createSignal('')
  const [showOutput, setShowOutput] = createSignal(false)
  const [isDark, setIsDark] = createSignal(false)

  onMount(() => {
    try {
      const stored = localStorage.getItem('portfolio-is-dark')
      if (stored === 'true') setIsDark(true)
    } catch (e) {}

    let charIndex = 0
    let isDeleting = false
    let timer: number

    const type = () => {
      const currentCmd = COMMANDS[cmdIndex()].cmd

      if (isDeleting) {
        setShowOutput(false)
        setTypedCmd(currentCmd.substring(0, charIndex - 1))
        charIndex--
      } else {
        setTypedCmd(currentCmd.substring(0, charIndex + 1))
        charIndex++
      }

      let typeSpeed = isDeleting ? 30 : 80 + Math.random() * 40

      if (!isDeleting && charIndex === currentCmd.length) {
        setShowOutput(true)
        typeSpeed = 4000 // Wait 4s before deleting
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        setCmdIndex((prev) => (prev + 1) % COMMANDS.length)
        typeSpeed = 500 // Pause before typing next
      }

      timer = window.setTimeout(type, typeSpeed)
    }

    timer = window.setTimeout(type, 1000)

    onCleanup(() => clearTimeout(timer))
  })

  const toggleTheme = () => {
    setIsDark(!isDark())
    window.dispatchEvent(new Event('toggle-theme'))
  }

  return (
    <div class="terminal-ui">
      <div class="term-header">
        <div class="term-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="term-body">
        <div class="term-row">
          <span class="term-prompt">~ %</span>
          <span class="term-cmd">theme</span>
          <button class="term-btn-icon neu-button" onClick={toggleTheme} aria-label="Toggle Theme">
            <Icon name={isDark() ? 'sun' : 'moon'} size={16} />
          </button>
        </div>

        <div class="term-row" style="margin-top: 1rem">
          <span class="term-prompt">~ %</span>
          <span class="term-cmd">
            {typedCmd()}
            <span class="term-cursor" classList={{ blink: !showOutput() && typedCmd().length === 0 }}>|</span>
          </span>
        </div>
        <div class="term-row min-h-row">
          <Show when={showOutput()}>
            <span class="term-key" innerHTML={COMMANDS[cmdIndex()].out}></span>
          </Show>
        </div>
      </div>
    </div>
  )
}
