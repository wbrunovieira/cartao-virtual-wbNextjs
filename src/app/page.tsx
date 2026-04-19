// src/app/page.tsx
'use client';
import { motion as m, LazyMotion, domMax } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  FaWhatsapp,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronRight,
  FaCode,
  FaCogs,
  FaMicrochip,
  FaLightbulb,
} from 'react-icons/fa';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import type { Locale } from '@/lib/translations';

// Lazy-load QRCode — below the fold, non-critical
const QRCodeCanvas = dynamic(
  () => import('qrcode.react').then((m) => ({ default: m.QRCodeCanvas })),
  { ssr: false }
);

// Cubic bezier as a proper tuple for Framer Motion v12
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LANGS: { code: Locale; flag: string; label: string }[] = [
  { code: 'pt', flag: '🇧🇷', label: 'PT' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'it', flag: '🇮🇹', label: 'IT' },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

type LinkItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  iconBg: string;
  prefix?: string;
};

function LinkCard({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <m.div
      variants={fadeUp}
      className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4"
    >
      <div className="px-4 pt-4 pb-1">
        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">{title}</p>
      </div>
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="px-4 pb-4 flex flex-col gap-2"
      >
        {links.map(({ href, icon, label, value, color, iconBg, prefix }) => (
          <m.a
            key={label}
            variants={slideIn}
            whileHover={{
              y: -2,
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderColor: 'rgba(255,255,255,0.28)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              transition: { duration: 0.25, ease: EASE },
            }}
            whileTap={{
              y: 0, scale: 0.98,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              transition: { duration: 0.1 },
            }}
            href={href}
            target={href.startsWith('tel') || href.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/5 border border-white/10"
          >
            <span
              className={`${color} shrink-0 p-2 rounded-xl flex items-center justify-center`}
              style={{ background: iconBg }}
            >
              {icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-white/50 text-[10px] uppercase tracking-widest leading-none mb-0.5">{label}</p>
              <p className="text-white text-sm font-medium truncate">
                {prefix && (
                  <span className="text-white/40 text-[11px] font-normal mr-1">{prefix} </span>
                )}
                {value}
              </p>
            </div>
            <FaChevronRight className="text-white/20 text-[10px] shrink-0" />
          </m.a>
        ))}
      </m.div>
    </m.div>
  );
}

function Orb({ className, animate }: { className: string; animate: Record<string, number[]> }) {
  return (
    <m.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={animate}
      transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    />
  );
}

export default function Home() {
  const { t, locale, setLocale } = useLocale();

  const contactLinks: LinkItem[] = [
    {
      href: 'https://wa.me/5511982864581',
      icon: <FaWhatsapp className="text-base" />,
      label: 'WhatsApp',
      value: '(11) 98286-4581',
      prefix: '🇧🇷 +55',
      color: 'text-green-400',
      iconBg: 'rgba(74,222,128,0.15)',
    },
    {
      href: 'tel:+551150264203',
      icon: <FaPhoneAlt className="text-base" />,
      label: t('labelPhone'),
      value: '(11) 5026-4203',
      prefix: '🇧🇷 +55',
      color: 'text-purple-300',
      iconBg: 'rgba(196,181,253,0.15)',
    },
    {
      href: 'mailto:bruno@wbdigitalsolutions.com',
      icon: <FaEnvelope className="text-base" />,
      label: 'Email · WB',
      value: 'bruno@wbdigitalsolutions.com',
      color: 'text-yellowcustom',
      iconBg: 'rgba(255,185,71,0.15)',
    },
    {
      href: 'mailto:bruno@saltoup.com',
      icon: <FaEnvelope className="text-base" />,
      label: 'Email · Salto',
      value: 'bruno@saltoup.com',
      color: 'text-orange-400',
      iconBg: 'rgba(255,92,0,0.15)',
    },
  ];

  const socialLinks: LinkItem[] = [
    {
      href: 'https://www.wbdigitalsolutions.com',
      icon: <FaGlobe className="text-base" />,
      label: 'Site · WB',
      value: 'wbdigitalsolutions.com',
      color: 'text-sky-400',
      iconBg: 'rgba(56,189,248,0.15)',
    },
    {
      href: 'https://saltoup.com/pt',
      icon: <FaGlobe className="text-base" />,
      label: 'Site · Salto',
      value: 'saltoup.com',
      color: 'text-orange-400',
      iconBg: 'rgba(255,92,0,0.15)',
    },
    {
      href: 'https://www.linkedin.com/in/walter-bruno-vieira/',
      icon: <FaLinkedin className="text-base" />,
      label: 'LinkedIn',
      value: 'walter-bruno-vieira',
      color: 'text-blue-400',
      iconBg: 'rgba(96,165,250,0.15)',
    },
    {
      href: 'https://instagram.com/wb.digitalsolutions',
      icon: <FaInstagram className="text-base" />,
      label: 'Instagram',
      value: '@wb.digitalsolutions',
      color: 'text-pink-400',
      iconBg: 'rgba(244,114,182,0.15)',
    },
    {
      href: 'https://www.instagram.com/wbrunovieira/',
      icon: <FaInstagram className="text-base" />,
      label: t('labelInstagramPersonal'),
      value: '@wbrunovieira',
      color: 'text-pink-400',
      iconBg: 'rgba(244,114,182,0.15)',
    },
    {
      href: 'https://facebook.com/wb.digitalsolutions',
      icon: <FaFacebook className="text-base" />,
      label: 'Facebook',
      value: '@wb.digitalsolutions',
      color: 'text-blue-500',
      iconBg: 'rgba(59,130,246,0.15)',
    },
  ];

  const serviceIcons = [
    { icon: <FaCode />, iconBg: 'rgba(56,189,248,0.15)', color: 'text-sky-400' },
    { icon: <FaCogs />, iconBg: 'rgba(196,181,253,0.15)', color: 'text-purple-300' },
    { icon: <FaMicrochip />, iconBg: 'rgba(255,185,71,0.15)', color: 'text-yellowcustom' },
    { icon: <FaLightbulb />, iconBg: 'rgba(74,222,128,0.15)', color: 'text-green-400' },
  ];

  return (
    <LazyMotion features={domMax}>
      <div className="relative min-h-screen flex items-start justify-center bg-gradient-to-br from-[#1a0226] via-[#350545] to-[#792990] px-3 py-6 sm:px-4 sm:py-8 overflow-hidden">

        <Orb className="w-72 h-72 bg-custom-purple opacity-30 -top-20 -left-20" animate={{ x: [0, 30, 0], y: [0, 20, 0] }} />
        <Orb className="w-96 h-96 bg-primary opacity-40 -bottom-32 -right-24" animate={{ x: [0, -25, 0], y: [0, -30, 0] }} />
        <Orb className="w-48 h-48 bg-yellowcustom opacity-10 top-1/2 left-1/3" animate={{ x: [0, 20, -10, 0], y: [0, -20, 10, 0] }} />

        <m.div
          className="relative w-full max-w-sm z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >

          {/* Language switcher */}
          <m.div variants={fadeUp} className="flex justify-center mb-4">
            <div className="flex gap-0.5 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-lg">
              {LANGS.map(({ code, flag, label }) => (
                <button
                  key={code}
                  onClick={() => setLocale(code)}
                  className="relative px-2.5 py-1.5 sm:px-3 rounded-full text-xs font-semibold cursor-pointer"
                >
                  {locale === code && (
                    <m.div
                      layoutId="langPill"
                      className="absolute inset-0 rounded-full bg-yellowcustom"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-1 transition-colors duration-200 ${locale === code ? 'text-[#2a1800]' : 'text-white/60 hover:text-white'}`}>
                    {flag} {label}
                  </span>
                </button>
              ))}
            </div>
          </m.div>

          {/* Welcome message */}
          <m.div
            variants={fadeUp}
            className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4"
          >
            <div className="px-5 pt-5 pb-5">
              <span className="block text-5xl font-serif leading-none mb-2" style={{ color: '#ffb947', opacity: 0.7 }}>&ldquo;</span>
              <h2 className="text-white font-semibold text-base mb-2 leading-snug">{t('welcomeHeadline')} 🤝</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {t('welcomeBodyBefore')}
                <span className="text-white/90 font-medium">{t('welcomeBodyHighlight')}</span>.
              </p>
              <p className="text-white/80 text-sm leading-relaxed mt-3">
                💾 {t('welcomeSaveHint')}
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-2">
                {t('welcomeBodyAfter')} 👇
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-white/30 text-xs tracking-widest uppercase">Bruno Vieira</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
            </div>
          </m.div>

          {/* Header card */}
          <m.div
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4"
          >
            <div className="flex flex-col items-center pt-10 pb-8 px-6 gap-3">
              <m.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                className="rounded-2xl ring-2 ring-white/30 overflow-hidden shadow-2xl bg-white px-4 py-4 sm:px-6"
              >
                <Image src="/logo.svg" alt="Logo WB Digital Solutions" width={220} height={62} priority />
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-center mt-6"
              >
                <h1 className="text-2xl font-bold text-white tracking-wide">Bruno Vieira</h1>
                <p className="text-white/70 text-sm mt-0.5">{t('role')}</p>
                <p className="text-white/40 text-xs mt-3 tracking-widest uppercase">WB Digital Solutions</p>
              </m.div>

              <m.a
                href="bruno.vcf"
                download="bruno.vcf"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.5 }}
                whileHover={{
                  scale: 1.03, y: -3,
                  boxShadow: '0 3px 0px #a86800, 0 10px 24px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.3) inset',
                  transition: { duration: 0.3, ease: EASE },
                }}
                whileTap={{
                  scale: 0.98, y: 1,
                  boxShadow: '0 1px 0px #a86800, 0 2px 6px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.2) inset',
                  transition: { duration: 0.1 },
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm tracking-wide"
                style={{
                  background: 'linear-gradient(180deg, #ffd080 0%, #ffb947 50%, #e89e2a 100%)',
                  color: '#2a1800',
                  boxShadow: '0 3px 0px #a86800, 0 4px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.3) inset',
                }}
              >
                {t('saveContact')}
              </m.a>
            </div>
          </m.div>

          <LinkCard title={t('sectionContact')} links={contactLinks} />
          <LinkCard title={t('sectionSocial')} links={socialLinks} />

          {/* Services card */}
          <m.div
            variants={fadeUp}
            className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4"
          >
            <div className="p-5">
              <h2 className="text-white/40 text-[10px] uppercase tracking-widest mb-3">{t('sectionServices')}</h2>
              <m.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-2"
              >
                {t('services').map((label, i) => (
                  <m.div
                    key={label}
                    variants={slideIn}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-center"
                  >
                    <span
                      className={`${serviceIcons[i].color} p-2.5 rounded-xl text-lg flex items-center justify-center`}
                      style={{ background: serviceIcons[i].iconBg }}
                    >
                      {serviceIcons[i].icon}
                    </span>
                    <span className="text-white/90 text-xs leading-snug">{label}</span>
                  </m.div>
                ))}
              </m.div>
            </div>
          </m.div>

          {/* QR Code card */}
          <m.div
            variants={fadeUp}
            className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
          >
            <div className="p-5 flex flex-col items-center gap-3">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">{t('sectionQr')}</p>
              <m.div
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                className="rounded-2xl overflow-hidden p-2 bg-white shadow-lg"
              >
                <QRCodeCanvas
                  value="https://card.wbdigitalsolutions.com"
                  size={120}
                  bgColor="#ffffff"
                  fgColor="#350545"
                />
              </m.div>
              <p className="text-white/30 text-[11px] tracking-wide">card.wbdigitalsolutions.com</p>
            </div>
          </m.div>

        </m.div>
      </div>
    </LazyMotion>
  );
}
