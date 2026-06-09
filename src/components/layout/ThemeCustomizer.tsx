import { createEffect, createSignal, onMount, onCleanup } from 'solid-js'
import Icon from '../ui/Icon'
import './ThemeCustomizer.css'
import { lightTheme, darkTheme, type ThemeState } from '../../utils/theme'

export default function ThemeCustomizer() {
    const [isOpen, setIsOpen] = createSignal(false)
    const [theme, setTheme] = createSignal<ThemeState>(lightTheme)

    const handleColorChange = <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => {
        setTheme(previous => {
            const next = { ...previous, [key]: value }
            window.dispatchEvent(new CustomEvent('custom-theme-update', { detail: next }))
            return next
        })
    }

    onMount(() => {
        try {
            const isDark = localStorage.getItem('portfolio-is-dark') === 'true'
            setTheme(isDark ? darkTheme : lightTheme)
        } catch (e) { }

        const handleUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<ThemeState>
            if (customEvent.detail) {
                setTheme(customEvent.detail)
            }
        }

        window.addEventListener('theme-updated', handleUpdate)
        onCleanup(() => window.removeEventListener('theme-updated', handleUpdate))
    })

    return (
        <div class={`theme-customizer ${isOpen() ? 'open' : ''}`}>
            {/* DEV NOTE: Remove "display: none" to use the customizer panel */}
            <button
                class="customizer-toggle neu-button"
                style="display: none;"
                onClick={() => setIsOpen(previous => !previous)}
                title="Customize Theme"
                type="button"
            >
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
