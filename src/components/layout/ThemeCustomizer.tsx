import { createEffect, createSignal } from 'solid-js'
import Icon from '../ui/Icon'
import './ThemeCustomizer.css'

type ThemeState = {
  backgroundColor: string
  accentColor: string
  primaryTextColor: string
  secondaryTextColor: string
  grainOpacity: number
  sparkleOpacity: number
  textTextureOpacity: number
}

const defaultTheme: ThemeState = {
  backgroundColor: '#f5f5f5',
  accentColor: '#a2ff00',
  primaryTextColor: '#000000',
  secondaryTextColor: '#000000',
  grainOpacity: 0.9,
  sparkleOpacity: 0.08,
  textTextureOpacity: 0.71,
}

const buildTexture = (type: 'grain' | 'specks' | 'text', opacity: number) => {
  const svg =
    type === 'specks'
      ? `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="specks"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="3"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 15 0 0 0 -11"/></filter><rect width="100%" height="100%" filter="url(#specks)" opacity="${opacity}"/></svg>`
      : `<svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="5" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="${opacity}"/></svg>`

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = createSignal(false)
  const [theme, setTheme] = createSignal<ThemeState>(defaultTheme)

  const handleColorChange = <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => {
    setTheme(previous => ({ ...previous, [key]: value }))
  }

  createEffect(() => {
    if (typeof document === 'undefined') return

    const current = theme()
    const root = document.documentElement

    root.style.setProperty('--bg-color', current.backgroundColor)
    root.style.setProperty('--color-accent', current.accentColor)
    root.style.setProperty('--text-primary', `color-mix(in srgb, ${current.primaryTextColor} 85%, transparent)`)
    root.style.setProperty('--text-secondary', `color-mix(in srgb, ${current.secondaryTextColor} 85%, transparent)`)
    root.style.setProperty('--grain-bg', buildTexture('grain', current.grainOpacity))
    root.style.setProperty('--specks-bg', buildTexture('specks', current.sparkleOpacity))
    root.style.setProperty('--text-grain-bg', buildTexture('text', current.textTextureOpacity))
  })

  return (
    <div class={`theme-customizer ${isOpen() ? 'open' : ''}`}>
      <button class="customizer-toggle neu-button" onClick={() => setIsOpen(previous => !previous)} title="Customize Theme" type="button">
        <Icon name="settings" size={20} />
      </button>

      <div class="customizer-panel neu-flat">
        <h3 class="serif-text">Theme Engine</h3>

        <div class="color-control">
          <label>Background</label>
          <div class="color-picker-wrapper">
            <input type="color" value={theme().backgroundColor} onInput={event => handleColorChange('backgroundColor', event.currentTarget.value)} />
            <span class="hex-val">{theme().backgroundColor}</span>
          </div>
        </div>

        <div class="color-control">
          <label>Accent Color</label>
          <div class="color-picker-wrapper">
            <input type="color" value={theme().accentColor} onInput={event => handleColorChange('accentColor', event.currentTarget.value)} />
            <span class="hex-val">{theme().accentColor}</span>
          </div>
        </div>

        <div class="color-control">
          <label>Primary Text</label>
          <div class="color-picker-wrapper">
            <input type="color" value={theme().primaryTextColor} onInput={event => handleColorChange('primaryTextColor', event.currentTarget.value)} />
            <span class="hex-val">{theme().primaryTextColor}</span>
          </div>
        </div>

        <div class="color-control">
          <label>Secondary Text</label>
          <div class="color-picker-wrapper">
            <input type="color" value={theme().secondaryTextColor} onInput={event => handleColorChange('secondaryTextColor', event.currentTarget.value)} />
            <span class="hex-val">{theme().secondaryTextColor}</span>
          </div>
        </div>

        <div class="color-control texture-control">
          <label>Grain Texture ({theme().grainOpacity})</label>
          <input min="0" max="1" step="0.01" type="range" value={theme().grainOpacity} onInput={event => handleColorChange('grainOpacity', Number.parseFloat(event.currentTarget.value))} />
        </div>

        <div class="color-control texture-control">
          <label>Sparkle Overlay ({theme().sparkleOpacity})</label>
          <input min="0" max="1" step="0.01" type="range" value={theme().sparkleOpacity} onInput={event => handleColorChange('sparkleOpacity', Number.parseFloat(event.currentTarget.value))} />
        </div>

        <div class="color-control texture-control">
          <label>Text Texture ({theme().textTextureOpacity})</label>
          <input min="0" max="1" step="0.01" type="range" value={theme().textTextureOpacity} onInput={event => handleColorChange('textTextureOpacity', Number.parseFloat(event.currentTarget.value))} />
        </div>

        <p class="hint">Shadows are auto-calculated!</p>
      </div>
    </div>
  )
}
