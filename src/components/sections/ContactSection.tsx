import { createSignal, onCleanup } from 'solid-js'
import { portfolio } from '../../content/portfolio'
import Icon from '../ui/Icon'
import './ContactSection.css'

type FormStatus = {
  tone: 'success' | 'error'
  title: string
  message: string
}

const web3FormsAccessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY

export default function ContactSection() {
  const [copied, setCopied] = createSignal(false)
  const [formStatus, setFormStatus] = createSignal<FormStatus | null>(null)
  const [isSubmitting, setIsSubmitting] = createSignal(false)
  let copyTimeout: number | undefined
  let formRef: HTMLFormElement | undefined

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.contact.email)
      setCopied(true)

      if (copyTimeout) clearTimeout(copyTimeout)
      copyTimeout = window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    if (!formRef?.checkValidity()) {
      formRef?.reportValidity()
      return
    }

    if (!web3FormsAccessKey) {
      setFormStatus({
        tone: 'error',
        title: 'Form not configured',
        message: 'Add PUBLIC_WEB3FORMS_ACCESS_KEY in your deployment environment so the browser can send the message.',
      })
      return
    }

    const formData = new FormData(formRef)
    formData.set('access_key', web3FormsAccessKey)
    formData.set('from_name', 'Rohit Sharma Portfolio')
    formData.set('subject', 'Portfolio inquiry')

    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        body: formData,
        method: 'POST',
      })
      const result = await response.json() as { message?: string; success?: boolean }

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? 'Unable to send the message right now.')
      }

      formRef.reset()
      setFormStatus({
        tone: 'success',
        title: 'Message sent',
        message: 'Thanks for reaching out. I’ll get back to you soon.',
      })
    } catch (error) {
      setFormStatus({
        tone: 'error',
        title: 'Message not sent',
        message: error instanceof Error ? error.message : 'Something went wrong while sending the message.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  onCleanup(() => {
    if (copyTimeout) clearTimeout(copyTimeout)
  })

  return (
    <section id="contact" class="contact-section reveal-on-scroll">
      <div class="section-header text-center">
        <h2 class="neu-text">Contact</h2>
      </div>

      <div class="contact-links" style={{ display: 'flex', gap: '1.5rem', 'justify-content': 'center', 'margin-bottom': '3rem', 'flex-wrap': 'wrap' }}>
        {portfolio.hero.actions.map(action => (
          <a
            aria-label={action.label}
            class="neu-button btn-large hero-link-btn"
            href={action.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name={action.icon} size={20} />
            <Icon name="external" size={14} style={{ opacity: 0.5 }} />
          </a>
        ))}

        <button
          aria-label="Copy Email"
          class="neu-button btn-large hero-link-btn"
          onClick={handleCopyEmail}
          style={{ padding: '1rem 1.5rem', 'min-width': '170px', 'white-space': 'nowrap', 'justify-content': 'center' }}
          type="button"
        >
          {copied() ? (
            <svg fill="var(--color-accent)" height="20" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20">
              <path d="M20 6L9 17l-5-5l1.5-1.5L9 14l9.5-9.5z" />
            </svg>
          ) : (
            <Icon name="mail" size={20} />
          )}
          <span style={{ 'font-size': '0.9rem', 'margin-left': '0.4rem', 'font-weight': '600' }}>{copied() ? 'Copied!' : 'Copy Email'}</span>
        </button>
      </div>

      <form
        ref={element => {
          formRef = element
        }}
        class="contact-form neu-flat"
        onSubmit={handleSubmit}
      >
        <div class="input-group">
          <input autoComplete="email" class="neu-input neu-pressed" name="email" placeholder="Your email" required type="email" />
        </div>

        <div class="input-group">
          <textarea class="neu-input neu-pressed textarea" name="message" placeholder="Message..." required rows={5} />
        </div>

        <input aria-hidden="true" name="botcheck" style={{ display: 'none' }} tabIndex={-1} type="checkbox" />

        {formStatus() ? (
          <div aria-live="polite" class={`form-status ${formStatus()?.tone ?? ''}`} role="status">
            {formStatus()?.tone === 'success' ? <Icon name="check" size={18} /> : <Icon name="x" size={18} />}
            <div>
              <strong>{formStatus()?.title}</strong>
              <p>{formStatus()?.message}</p>
            </div>
          </div>
        ) : null}

        <button class="neu-button submit-btn" disabled={isSubmitting()} type="submit">
          <span>{isSubmitting() ? 'Sending...' : 'Send Email'}</span>
          <Icon name="send" size={20} />
        </button>
      </form>
    </section>
  )
}
