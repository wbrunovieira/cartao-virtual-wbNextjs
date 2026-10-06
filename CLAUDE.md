# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server (Next.js)
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # Run ESLint (flat config, eslint-config-next 16)
```

> This project uses **pnpm** as the package manager. Pushing to `main` deploys to production on Vercel (card.wbdigitalsolutions.com).

## Architecture

Single-page Next.js 16 app (App Router), fully static (`force-static` in the root layout). The UI lives in `src/app/page.tsx` — a `'use client'` component that renders Bruno Vieira's digital business card for WB Digital Solutions.

Page order (top → bottom): language switcher → welcome card (photo + bio) → "Salvar Contato" → direct contacts (WhatsApp, phone, email, socials) → WB section (logo, site/socials, services linking to the site's service pages) → QR code → "Enviar meus dados" → share buttons → discreet scheduling link (agenda.wbdigitalsolutions.com/book). Share and exchange-contact are deliberately at the very end: visitors used to tap the WhatsApp *share* button thinking it messaged Bruno.

**Key files:**
- `src/app/page.tsx` — The card UI. Contact links are hardcoded `LinkItem` arrays inside the component; each has an `id` used for analytics.
- `src/app/layout.tsx` — Metadata (title, description, Open Graph/Twitter), schema.org `Person` JSON-LD, `<html lang="pt-BR">`, the inline locale script and `<Analytics />`.
- `src/app/opengraph-image.tsx` — Link-preview image (1200×630) generated at build time with `next/og`; uses plain `<img>` with data URIs because it is rendered by Satori, not the browser.
- `src/app/globals.css` — Tailwind v4 setup with custom theme tokens (`--color-primary`, `--color-custom-purple`, `--color-yellowcustom`) and dark overrides for the phone input.
- `src/components/PhotoArc.tsx` — Profile photo framed by purple → yellow arcs that sweep into place once on load, then stay still.
- `src/components/ExchangeContact.tsx` — Trigger button; lazy-loads `ExchangeModal` (via `next/dynamic`, prefetched on hover/touch/focus) so the phone-input library stays out of the main bundle.
- `src/components/ExchangeModal.tsx` — Dialog form that POSTs the visitor's details to `https://www.wbdigitalsolutions.com/api/card-contact` (header `x-card-token` from `NEXT_PUBLIC_CARD_TOKEN`).
- `src/components/ShareCard.tsx` — "Compartilhar no WhatsApp" + "Mais opções" (Web Share API, clipboard fallback).
- `src/lib/translations.ts` — All UI strings keyed by locale.
- `src/hooks/useLocale.ts` — Locale store (`useSyncExternalStore`); syncs `<html lang>`.
- `public/bruno.vcf` — vCard (with embedded base64 photo) for "Salvar Contato".
- `public/bruno.jpg` — 512×512 profile photo (card + OG image).
- `public/logo.svg` — Company logo.

## Styling

Tailwind CSS v4 (imported via `@import "tailwindcss"` in `globals.css`). Custom colors are defined as CSS variables in the `@theme` block and used as Tailwind utilities (`text-primary`, `bg-custom-purple`, `text-yellowcustom`). Font is Inter via `next/font/google`.

## i18n

Translations live in `src/lib/translations.ts` as a static `Record<Locale, TranslationDict>`. Supported locales: `pt` (default), `en`, `es`, `it`. Links to wbdigitalsolutions.com use `SITE_PREFIX` in `page.tsx` (English at the root, `/pt`, `/es`, `/it`). Detection order: `?lang=` param → `localStorage` (`preferred_locale`) → `navigator.language` → `pt`. To add a string, extend `TranslationDict` and add entries for all four locales.

The static HTML is always rendered in Portuguese. An inline script in `layout.tsx` (which mirrors `detectLocale()` — keep them in sync) adds `locale-pending` to `<html>` for non-pt visitors, hiding the body until `useLocale` renders the right language and removes the class (1.5s failsafe).

## Animations

Above-the-fold blocks (language switcher, welcome card, Save Contact) use the CSS `.rise` animation from `globals.css` so they are visible in the static HTML; the root `m.div` has `initial={false}`.

Framer Motion v12 with `LazyMotion + domMax`. Variants are module-level constants (`fadeUp`, `slideIn`, `popIn`, `stagger`) using the shared `EASE` tuple. Below-the-fold blocks use `reveal` (scroll-triggered, `-12%` margin); the last blocks on the page use `revealEnd`, since they can never scroll past that margin. `MotionConfig reducedMotion="user"` plus the `reduce` flag keep things static for reduced-motion users.

## Analytics

`@vercel/analytics` custom events: `link_click` (`{ link: id }` — also `service_<path>` and `schedule`), `save_contact`, `share` (`{ method: 'whatsapp' | 'more_options' }`), `exchange_open`, `exchange_submit`. Web Analytics must be enabled for the project in the Vercel dashboard; custom events require a Pro plan.

## Dependencies

- `framer-motion` — Animations
- `qrcode.react` — QR code pointing to `card.wbdigitalsolutions.com`
- `react-icons/fa` — Font Awesome icons
- `react-phone-number-input` — Phone field in the exchange form
- `@vercel/analytics` — Page views and click events
