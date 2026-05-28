import { createSignal } from 'solid-js'
import { Icon } from './Icon'

type ContactFormProps = {
  accessKey?: string
  email: string
}

export default function ContactForm(props: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = createSignal(false)
  const [dialogTitle, setDialogTitle] = createSignal('Message sent')
  const [dialogMessage, setDialogMessage] = createSignal('Thanks for reaching out. Rohit will get back to you soon.')

  let formRef: HTMLFormElement | undefined
  let dialogRef: HTMLDialogElement | undefined

  const showDialog = (title: string, message: string) => {
    setDialogTitle(title)
    setDialogMessage(message)
    dialogRef?.showModal()
  }

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    if (!formRef?.checkValidity()) {
      formRef?.reportValidity()
      return
    }

    if (!props.accessKey) {
      showDialog(
        'Form not configured',
        'The browser form needs a Web3Forms access key before it can send messages. The direct email link still works.',
      )
      return
    }

    const formData = new FormData(formRef)
    formData.append('access_key', props.accessKey)
    formData.append('from_name', 'Rohit Sharma Portfolio')

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
      showDialog('Message sent', 'Thanks for reaching out. Rohit will get back to you soon.')
    } catch (error) {
      showDialog(
        'Message not sent',
        error instanceof Error ? error.message : 'Something went wrong while sending the message.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const close = () => dialogRef?.close()

  return (
    <>
      <div class="glass-card reveal mx-auto max-w-3xl rounded-2xl border-zinc-800 p-8 text-left md:p-12">
        <form class="space-y-6" onSubmit={handleSubmit} ref={element => { formRef = element }}>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label class="block">
              <span class="mb-2 block font-mono text-sm font-medium text-zinc-300">Name</span>
              <input
                autocomplete="name"
                class="form-field"
                name="name"
                placeholder="Your name"
                required
                type="text"
              />
            </label>
            <label class="block">
              <span class="mb-2 block font-mono text-sm font-medium text-zinc-300">Email</span>
              <input
                autocomplete="email"
                class="form-field"
                name="email"
                placeholder="you@company.com"
                required
                type="email"
              />
            </label>
          </div>

          <label class="block">
            <span class="mb-2 block font-mono text-sm font-medium text-zinc-300">Subject</span>
            <input class="form-field" name="subject" placeholder="Frontend Engineer opportunity" required type="text" />
          </label>

          <label class="block">
            <span class="mb-2 block font-mono text-sm font-medium text-zinc-300">Message</span>
            <textarea class="form-field min-h-36 resize-y" name="message" placeholder="Share the role, product surface, or frontend problem you want to discuss." required rows={5} />
          </label>
          <input class="hidden" name="botcheck" tabindex="-1" type="checkbox" />

          <button
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-mono font-medium text-black shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:bg-zinc-400"
            disabled={isSubmitting()}
            type="submit"
          >
            <span>{isSubmitting() ? 'Sending...' : 'Send Inquiry'}</span>
            <Icon class="size-4" name="send" />
          </button>

          <p class="text-center text-xs text-zinc-600">
            Prefer email? Reach me at{' '}
            <a class="text-zinc-400 underline-offset-4 hover:text-white hover:underline" href={`mailto:${props.email}`}>
              {props.email}
            </a>
            .
          </p>
        </form>
      </div>

      <dialog
        class="success-dialog w-[calc(100%-2rem)] max-w-sm rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-zinc-100 shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop:bg-black/85"
        onClick={event => {
          if (event.target === dialogRef) close()
        }}
        ref={element => { dialogRef = element }}
      >
        <div class="text-center">
          <div class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
            <Icon class="size-6" name="check" />
          </div>
          <h3 class="mb-2 text-lg font-medium text-white">{dialogTitle()}</h3>
          <p class="mb-6 text-sm leading-6 text-zinc-400">{dialogMessage()}</p>
          <button class="w-full rounded bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-zinc-200" onClick={close} type="button">
            Awesome
          </button>
        </div>
      </dialog>
    </>
  )
}
