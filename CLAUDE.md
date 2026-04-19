# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server (Next.js)
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # Run ESLint
```

> This project uses **pnpm** as the package manager (note the `node_modules/.pnpm` layout).

## Architecture

Single-page Next.js 15 app (App Router). The entire UI lives in `src/app/page.tsx` — a `'use client'` component that renders Bruno Vieira's digital business card for WB Digital Solutions.

**Key files:**
- `src/app/page.tsx` — The card UI. All contact data is hardcoded in the `cardData` object at the top of the component.
- `src/app/globals.css` — Tailwind v4 setup with custom theme tokens (`--color-primary`, `--color-custom-purple`, `--color-yellowcustom`).
- `src/app/layout.tsx` — Root layout with Geist fonts and page metadata.
- `public/bruno.vcf` — vCard file for the "Salvar Contato" download button.
- `public/logo.svg` — Company logo displayed on the card.

## Styling

Tailwind CSS v4 (imported via `@import "tailwindcss"` in `globals.css`). Custom colors are defined as CSS variables in the `@theme` block and used as Tailwind utilities (`text-primary`, `bg-custom-purple`, `text-yellowcustom`).

## i18n

Translations live in `src/lib/translations.ts` as a static `Record<Locale, TranslationDict>`. Supported locales: `pt` (default), `en`, `es`, `it`. The `useLocale` hook (`src/hooks/useLocale.ts`) auto-detects locale from the `?lang=` query param or `navigator.language`, then falls back to `pt`. To add a new translatable string, extend `TranslationDict` and add entries for all four locales.

## Animations

Framer Motion v12 (`framer-motion`) with `LazyMotion + domMax` for tree-shaking. All variants are module-level constants (`fadeUp`, `slideIn`, `staggerContainer`) using the shared `EASE` cubic-bezier tuple. Animated background orbs use infinite `mirror` transitions.

## Dependencies

- `framer-motion` — Page animations and transitions
- `qrcode.react` — QR code pointing to `card.wbdigitalsolutions.com`
- `react-icons/fa` — Font Awesome icons for social/contact links
- `next/image` — Used for the logo (requires `width`/`height`)
