# Astro + Solid Starter

Minimal starter with Astro, SolidJS, Bun, and Tailwind CSS.

## Commands

```sh
bun run dev
bun run build
bun run preview
bun run lint
```

## Analytics

This portfolio supports Cloudflare Web Analytics through an optional public environment variable:

```sh
PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_cloudflare_site_token
```

Create a free Cloudflare Web Analytics site, copy the site token from the JS snippet, and add it as a Vercel environment variable for Production. If the variable is not set, no analytics script is rendered.

## Contact form

The contact form submits from the browser through Web3Forms:

```sh
PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

Create a free Web3Forms access key for `rohitshrm0902@gmail.com`, add it as a Vercel environment variable for Production, and redeploy. If the variable is not set, the form shows a configuration message instead of trying to send.
