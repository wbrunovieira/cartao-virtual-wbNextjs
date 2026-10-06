'use client';
import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion as m } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { track } from '@vercel/analytics';
import { translations, type Locale } from '@/lib/translations';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const loadModal = () => import('@/components/ExchangeModal');
const ExchangeModal = dynamic(loadModal, { ssr: false });

// Trigger button for the exchange-contact form. The dialog itself is fetched
// on first intent (hover/touch/focus) so the page doesn't ship its weight.
export default function ExchangeContact({ locale }: { locale: Locale }) {
  const t = translations[locale];

  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(0);

  function openModal() {
    track('exchange_open');
    setOpenedAt(Date.now());
    setOpen(true);
  }

  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Trigger — secondary action (Save Contact is the primary above) */}
      <m.button
        type="button"
        onClick={openModal}
        onPointerEnter={loadModal}
        onTouchStart={loadModal}
        onFocus={loadModal}
        whileHover={{
          y: -2,
          borderColor: 'rgba(255,255,255,0.28)',
          boxShadow: '0 2px 0 rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.45)',
          transition: { duration: 0.25, ease: EASE },
        }}
        whileTap={{ scale: 0.98, y: 0, transition: { duration: 0.1 } }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/[0.14] bg-[#1d1d1d] text-[#f5f5f5] font-semibold text-xs sm:text-sm tracking-wide cursor-pointer shadow-[0_2px_0_rgba(0,0,0,0.5),0_3px_8px_rgba(0,0,0,0.35)]"
      >
        <span
          className="shrink-0 p-1.5 rounded-lg flex items-center justify-center text-yellowcustom"
          style={{ background: 'rgba(255,185,71,0.15)' }}
        >
          <FaUserPlus className="text-sm" />
        </span>
        {t.exchangeButton}
      </m.button>

      {/* Mounted from the first open on, so typed fields survive close/reopen */}
      {openedAt > 0 && (
        <ExchangeModal locale={locale} open={open} openedAt={openedAt} onClose={closeModal} />
      )}
    </>
  );
}
