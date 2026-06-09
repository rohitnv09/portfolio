import '../.astro/types.d.ts'

interface ImportMetaEnv {
  readonly PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?: string
  readonly PUBLIC_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    __is_navigating?: boolean
    __nav_timeout?: ReturnType<typeof setTimeout>
    __is_keyboard_navigating?: boolean
    __key_nav_timeout?: ReturnType<typeof setTimeout>
    __is_global_pointer_down?: boolean
  }
}
