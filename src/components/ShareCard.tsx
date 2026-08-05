'use client';
import { useState } from 'react';
import { motion as m } from 'framer-motion';
import { FaShareAlt, FaCheck, FaWhatsapp } from 'react-icons/fa';
import { translations, type Locale } from '@/lib/translations';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CARD_URL = 'https://card.wbdigitalsolutions.com';

const buttonClass =
  'flex-1 flex flex-col items-center justify-center text-center gap-1.5 py-3.5 px-2 rounded-2xl border border-white/[0.14] bg-[#1d1d1d] text-[#f5f5f5] font-semibold text-xs sm:text-sm leading-snug tracking-wide cursor-pointer shadow-[0_2px_0_rgba(0,0,0,0.5),0_3px_8px_rgba(0,0,0,0.35)]';

const hoverProps = {
  whileHover: {
    y: -2,
    borderColor: 'rgba(255,255,255,0.28)',
    boxShadow: '0 2px 0 rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.45)',
    transition: { duration: 0.25, ease: EASE },
  },
  whileTap: { scale: 0.98, y: 0, transition: { duration: 0.1 } },
};

export default function ShareCard({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Bruno Vieira · WB Digital Solutions',
          text: t.shareText,
          url: CARD_URL,
        });
      } catch {
        // User cancelled the native share sheet — nothing to do.
      }
      return;
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(CARD_URL);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard unavailable — nothing more we can do here.
      }
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${t.shareText} ${CARD_URL}`)}`;

  return (
    <div className="mb-4 flex gap-2">
      <m.a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClass} {...hoverProps}>
        <span
          className="relative shrink-0 p-2 rounded-xl flex items-center justify-center text-green-400"
          style={{ background: 'rgba(74,222,128,0.15)' }}
        >
          <FaWhatsapp className="text-base" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1d1d1d] border border-white/20 flex items-center justify-center text-[8px] text-white/70">
            <FaShareAlt />
          </span>
        </span>
        {t.shareWhatsapp}
      </m.a>

      <m.button type="button" onClick={handleShare} aria-live="polite" className={buttonClass} {...hoverProps}>
        <span
          className="shrink-0 p-2 rounded-xl flex items-center justify-center text-sky-400"
          style={{ background: 'rgba(56,189,248,0.15)' }}
        >
          {copied ? <FaCheck className="text-base" /> : <FaShareAlt className="text-base" />}
        </span>
        {copied ? t.shareCopied : t.shareButton}
      </m.button>
    </div>
  );
}
