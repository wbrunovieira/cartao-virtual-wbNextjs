'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion as m, AnimatePresence } from 'framer-motion';
import { FaUserPlus, FaTimes } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import type { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { translations, type Locale } from '@/lib/translations';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ENDPOINT = 'https://www.wbdigitalsolutions.com/api/card-contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Default phone country per UI language.
const COUNTRY_BY_LOCALE: Record<Locale, Country> = {
  pt: 'BR',
  en: 'US',
  es: 'ES',
  it: 'IT',
};

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ExchangeContact({ locale }: { locale: Locale }) {
  const t = translations[locale];

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [note, setNote] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Portal target only exists in the browser.
  useEffect(() => setMounted(true), []);

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function openModal() {
    setStatus('idle');
    setErrorMsg('');
    setOpenedAt(Date.now());
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    const trimmedEmail = email.trim();

    if (!name.trim() || (!phone?.trim() && !trimmedEmail)) {
      setStatus('error');
      setErrorMsg(t.exchangeRequired);
      return;
    }

    if (trimmedEmail && !EMAIL_RE.test(trimmedEmail)) {
      setStatus('error');
      setErrorMsg(t.exchangeInvalidEmail);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-card-token': process.env.NEXT_PUBLIC_CARD_TOKEN ?? '',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone ?? '',
          email: email.trim(),
          company: company.trim(),
          note: note.trim(),
          _hp: honeypot,
          _t: openedAt,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus('success');
      setName('');
      setPhone(undefined);
      setEmail('');
      setCompany('');
      setNote('');
    } catch {
      setStatus('error');
      setErrorMsg(t.exchangeError);
    }
  }

  const inputClass =
    'w-full rounded-2xl bg-[#1e1e1e] border border-[#2a2a2a] px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#555] outline-none focus:border-[#ff5c00] transition-colors';

  return (
    <>
      {/* Trigger button */}
      <m.button
        type="button"
        onClick={openModal}
        whileHover={{
          scale: 1.03,
          y: -3,
          boxShadow: '0 3px 0px #0a3d2a, 0 10px 24px rgba(0,0,0,0.5)',
          transition: { duration: 0.3, ease: EASE },
        }}
        whileTap={{
          scale: 0.98,
          y: 1,
          boxShadow: '0 1px 0px #0a3d2a, 0 2px 6px rgba(0,0,0,0.3)',
          transition: { duration: 0.1 },
        }}
        className="mb-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm tracking-wide text-white cursor-pointer"
        style={{
          background: 'linear-gradient(180deg, #1fbf73 0%, #16a35f 50%, #0e7a45 100%)',
          boxShadow: '0 3px 0px #0a3d2a, 0 4px 8px rgba(0,0,0,0.4)',
        }}
      >
        <FaUserPlus className="text-base" />
        {t.exchangeButton}
      </m.button>

      {mounted && createPortal(
        <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-3 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={closeModal}
            />

            {/* Sheet */}
            <m.div
              className="relative w-full max-w-sm max-h-[88vh] overflow-y-auto rounded-3xl bg-[#1b1b1b] border border-white/10 ring-1 ring-[#ff5c00]/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="flex items-start justify-between px-5 pt-5">
                <div className="pr-3">
                  <h2 className="text-lg font-bold text-[#f5f5f5]">{t.exchangeTitle}</h2>
                  <p className="text-[#888] text-xs mt-1 leading-relaxed">{t.exchangeSubtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#1e1e1e] border border-[#2a2a2a] text-[#888] hover:text-white transition-colors cursor-pointer"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {status === 'success' ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[#f5f5f5] text-base font-medium">{t.exchangeSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="px-5 pt-5 pb-5 flex flex-col gap-3">
                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    name="_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute -left-[9999px] w-px h-px opacity-0"
                  />

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#888] mb-1.5 block">
                      {t.exchangeName}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#888] mb-1.5 block">
                      {t.exchangePhone}
                    </label>
                    <PhoneInput
                      international
                      defaultCountry={COUNTRY_BY_LOCALE[locale]}
                      value={phone}
                      onChange={setPhone}
                      className="exchange-phone"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#888] mb-1.5 block">
                      {t.exchangeEmail}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#888] mb-1.5 block">
                      {t.exchangeCompany}
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      autoComplete="organization"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#888] mb-1.5 block">
                      {t.exchangeNote}
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === 'error' && errorMsg && (
                    <p className="text-red-400 text-xs">{errorMsg}</p>
                  )}

                  <m.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileTap={{ scale: 0.98 }}
                    className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm tracking-wide text-white cursor-pointer disabled:opacity-60"
                    style={{
                      background: 'linear-gradient(180deg, #1fbf73 0%, #16a35f 50%, #0e7a45 100%)',
                      boxShadow: '0 3px 0px #0a3d2a, 0 4px 8px rgba(0,0,0,0.4)',
                    }}
                  >
                    {status === 'sending' ? t.exchangeSending : t.exchangeSubmit}
                  </m.button>
                </form>
              )}
            </m.div>
          </m.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
