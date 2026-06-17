'use client';
import {
  motion as m,
  LazyMotion,
  domMax,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
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
  FaBullhorn,
  FaUsers,
  FaChartLine,
  FaSitemap,
} from 'react-icons/fa';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import type { Locale } from '@/lib/translations';
import ExchangeContact from '@/components/ExchangeContact';

const QRCodeCanvas = dynamic(
  () => import('qrcode.react').then((m) => ({ default: m.QRCodeCanvas })),
  { ssr: false }
);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LANGS: { code: Locale; flag: string; label: string }[] = [
  { code: 'pt', flag: '🇧🇷', label: 'PT' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'it', flag: '🇮🇹', label: 'IT' },
];

// Shared viewport config for scroll-triggered reveals — fire once, a bit
// before the element is fully on screen.
const VIEWPORT = { once: true, margin: '-12% 0px' } as const;
// Props applied to any block that should reveal as it scrolls into view.
const reveal = { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT } as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// y is a transform, so MotionConfig reducedMotion="user" neutralizes it
// automatically — reduced-motion users get a clean fade with no blur/slide.
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const slideIn = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

// Grid tiles pop in place (scale/opacity) instead of sliding sideways, which
// fights a 2-column layout.
const popIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
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

function LinkCard({ title, links, dark = false }: { title: string; links: LinkItem[]; dark?: boolean }) {
  return (
    <m.div
      variants={fadeUp}
      {...reveal}
      className={`rounded-3xl overflow-hidden border shadow-2xl mb-4 ${
        dark
          ? 'bg-[#141414] border-[#252525]'
          : 'bg-white/10 backdrop-blur-md border-white/20'
      }`}
    >
      <div className="px-4 pt-4 pb-1">
        <p className={`text-[10px] uppercase tracking-widest mb-2 ${dark ? 'text-[#999]' : 'text-white/60'}`}>
          {title}
        </p>
      </div>
      <m.div variants={stagger} {...reveal} className="px-4 pb-4 flex flex-col gap-2">
        {links.map(({ href, icon, label, value, color, iconBg, prefix }) => (
          <m.a
            key={label}
            variants={slideIn}
            whileHover={{
              y: -2,
              backgroundColor: dark ? 'rgba(255,92,0,0.07)' : 'rgba(255,255,255,0.12)',
              borderColor: dark ? 'rgba(255,92,0,0.30)' : 'rgba(255,255,255,0.28)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              transition: { duration: 0.25, ease: EASE },
            }}
            whileTap={{ y: 0, scale: 0.98, transition: { duration: 0.1 } }}
            href={href}
            target={href.startsWith('tel') || href.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-3 rounded-2xl border ${
              dark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white/5 border-white/10'
            }`}
          >
            <span
              className={`${color} shrink-0 p-2 rounded-xl flex items-center justify-center`}
              style={{ background: iconBg }}
            >
              {icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-[10px] uppercase tracking-widest leading-none mb-0.5 ${dark ? 'text-[#999]' : 'text-white/60'}`}>
                {label}
              </p>
              <p className={`text-sm font-medium truncate ${dark ? 'text-[#f5f5f5]' : 'text-white'}`}>
                {prefix && (
                  <span className={`text-[11px] font-normal mr-1 ${dark ? 'text-[#555]' : 'text-white/40'}`}>
                    {prefix}{' '}
                  </span>
                )}
                {value}
              </p>
            </div>
            <FaChevronRight className={`text-[10px] shrink-0 ${dark ? 'text-[#444]' : 'text-white/20'}`} />
          </m.a>
        ))}
      </m.div>
    </m.div>
  );
}

// Atmospheric glow. Animating opacity (not x/y) avoids re-rasterizing the
// 64px blur layer every frame; reduced-motion users get a static glow.
function Orb({
  className,
  opacity,
  duration = 9,
  reduce = false,
}: {
  className: string;
  opacity: [number, number];
  duration?: number;
  reduce?: boolean;
}) {
  return (
    <m.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ opacity: opacity[0] }}
      animate={reduce ? undefined : { opacity: [opacity[0], opacity[1], opacity[0]] }}
      transition={
        reduce
          ? undefined
          : { duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
      }
    />
  );
}

export default function Home() {
  const { t, locale, setLocale } = useLocale();
  const reduce = useReducedMotion() ?? false;

  // Scroll-driven "spine": a single left-edge line whose hue travels from the
  // WB purple into the Salto orange as you move down the card.
  const { scrollYProgress } = useScroll();
  const spineColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#792990', '#9b3d6b', '#ff5c00']
  );

  const sharedContactLinks: LinkItem[] = [
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
      color: 'text-[#888]',
      iconBg: 'rgba(136,136,136,0.15)',
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
      href: 'https://www.linkedin.com/in/walter-bruno-vieira/',
      icon: <FaLinkedin className="text-base" />,
      label: 'LinkedIn',
      value: 'walter-bruno-vieira',
      color: 'text-blue-400',
      iconBg: 'rgba(96,165,250,0.15)',
    },
  ];

  const saltoContactLinks: LinkItem[] = [
    {
      href: 'mailto:bruno@saltoup.com',
      icon: <FaEnvelope className="text-base" />,
      label: 'Email',
      value: 'bruno@saltoup.com',
      color: 'text-[#ff5c00]',
      iconBg: 'rgba(255,92,0,0.15)',
    },
  ];

  const saltoSocialLinks: LinkItem[] = [
    {
      href: 'https://saltoup.com/pt',
      icon: <FaGlobe className="text-base" />,
      label: t('labelSite'),
      value: 'saltoup.com',
      color: 'text-[#ff5c00]',
      iconBg: 'rgba(255,92,0,0.15)',
    },
    {
      href: 'https://instagram.com/saltoassessoria',
      icon: <FaInstagram className="text-base" />,
      label: 'Instagram',
      value: '@saltoassessoria',
      color: 'text-pink-400',
      iconBg: 'rgba(244,114,182,0.15)',
    },
  ];

  const wbContactLinks: LinkItem[] = [
    {
      href: 'mailto:bruno@wbdigitalsolutions.com',
      icon: <FaEnvelope className="text-base" />,
      label: 'Email',
      value: 'bruno@wbdigitalsolutions.com',
      color: 'text-yellowcustom',
      iconBg: 'rgba(255,185,71,0.15)',
    },
  ];

  const wbSocialLinks: LinkItem[] = [
    {
      href: 'https://www.wbdigitalsolutions.com',
      icon: <FaGlobe className="text-base" />,
      label: t('labelSite'),
      value: 'wbdigitalsolutions.com',
      color: 'text-sky-400',
      iconBg: 'rgba(56,189,248,0.15)',
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
      href: 'https://facebook.com/wb.digitalsolutions',
      icon: <FaFacebook className="text-base" />,
      label: 'Facebook',
      value: '@wb.digitalsolutions',
      color: 'text-blue-500',
      iconBg: 'rgba(59,130,246,0.15)',
    },
  ];

  const saltoServices = [
    { icon: <FaSitemap />, iconBg: 'rgba(255,92,0,0.15)', color: 'text-[#ff5c00]', label: 'Estratégia Comercial' },
    { icon: <FaBullhorn />, iconBg: 'rgba(255,92,0,0.15)', color: 'text-[#ff5c00]', label: 'Marketing & Anúncios' },
    { icon: <FaUsers />, iconBg: 'rgba(255,92,0,0.15)', color: 'text-[#ff5c00]', label: 'CRM & Processo de Vendas' },
    { icon: <FaChartLine />, iconBg: 'rgba(255,92,0,0.15)', color: 'text-[#ff5c00]', label: 'Gestão de Performance' },
  ];

  const serviceIcons = [
    { icon: <FaCode />, iconBg: 'rgba(56,189,248,0.15)', color: 'text-sky-400' },
    { icon: <FaCogs />, iconBg: 'rgba(196,181,253,0.15)', color: 'text-purple-300' },
    { icon: <FaMicrochip />, iconBg: 'rgba(255,185,71,0.15)', color: 'text-yellowcustom' },
    { icon: <FaLightbulb />, iconBg: 'rgba(74,222,128,0.15)', color: 'text-green-400' },
  ];

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        {/* Brand spine — left-edge line that shifts WB-purple → Salto-orange on scroll */}
        <m.div
          aria-hidden
          className="fixed left-0 top-0 bottom-0 z-30 w-1 pointer-events-none"
          style={{ background: spineColor }}
        />
        <div className="min-h-screen bg-[#0e0e0e] flex items-start justify-center px-3 py-6 sm:px-4 sm:py-8">
          <m.div
            className="relative w-full max-w-sm z-10"
            variants={stagger}
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
                      className="absolute inset-0 rounded-full bg-[#ff5c00]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-1 transition-colors duration-200 ${
                      locale === code ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {flag} {label}
                  </span>
                </button>
              ))}
            </div>
          </m.div>

          {/* Welcome */}
          <m.div
            variants={fadeUp}
            className="rounded-3xl overflow-hidden bg-[#141414] border border-[#252525] shadow-2xl mb-4"
          >
            <div className="px-5 pt-5 pb-5">
              <h1 className="text-xl font-bold text-[#f5f5f5] tracking-wide">Bruno Vieira</h1>
              <p className="text-[#666] text-xs mt-0.5 mb-5">{t('role')}</p>
              <h2 className="text-[#f5f5f5] font-semibold text-base mb-2 leading-snug">
                {t('welcomeHeadline')}
              </h2>
              <div className="text-[#888] text-sm leading-relaxed space-y-3">
                {t('welcomeBody').split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <p className="text-[#f5f5f5]/50 text-sm leading-relaxed mt-4">{t('welcomeCta')}</p>
            </div>
          </m.div>

          {/* Save Contact — shared button */}
          <m.a
            variants={fadeUp}
            href="bruno.vcf"
            download="bruno.vcf"
            whileHover={{
              scale: 1.03,
              y: -3,
              boxShadow: '0 3px 0px #8c2000, 0 10px 24px rgba(0,0,0,0.5)',
              transition: { duration: 0.3, ease: EASE },
            }}
            whileTap={{
              scale: 0.98,
              y: 1,
              boxShadow: '0 1px 0px #8c2000, 0 2px 6px rgba(0,0,0,0.3)',
              transition: { duration: 0.1 },
            }}
            className="mb-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm tracking-wide text-white"
            style={{
              background: 'linear-gradient(180deg, #ff7830 0%, #ff5c00 50%, #cc3300 100%)',
              boxShadow: '0 3px 0px #8c2000, 0 4px 8px rgba(0,0,0,0.4)',
            }}
          >
            {t('saveContact')}
          </m.a>

          {/* Exchange contact — visitor sends their details */}
          <m.div variants={fadeUp}>
            <ExchangeContact locale={locale} />
          </m.div>

          {/* Shared contacts */}
          <LinkCard title={t('sectionContact')} links={sharedContactLinks} dark />

          {/* ── WB SECTION ── */}
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1a0226] via-[#350545] to-[#792990] p-4 mb-4">
            <Orb
              className="w-72 h-72 bg-custom-purple -top-20 -left-20"
              opacity={[0.22, 0.36]}
              duration={9}
              reduce={reduce}
            />
            <Orb
              className="w-96 h-96 bg-primary -bottom-32 -right-24"
              opacity={[0.3, 0.46]}
              duration={11}
              reduce={reduce}
            />
            <Orb
              className="w-48 h-48 bg-yellowcustom top-1/2 left-1/3"
              opacity={[0.06, 0.16]}
              duration={8}
              reduce={reduce}
            />

            {/* WB header */}
            <m.div
              variants={fadeUp}
              {...reveal}
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

              </div>
            </m.div>

            <LinkCard title={t('sectionContact')} links={wbContactLinks} />
            <LinkCard title={t('sectionSocial')} links={wbSocialLinks} />

            {/* Services */}
            <m.div
              variants={fadeUp}
              {...reveal}
              className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
            >
              <div className="p-5">
                <h2 className="text-white/60 text-[10px] uppercase tracking-widest mb-3">{t('sectionServices')}</h2>
                <m.div variants={stagger} {...reveal} className="grid grid-cols-2 gap-2">
                  {t('services').map((label, i) => (
                    <m.div
                      key={label}
                      variants={popIn}
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
          </div>

          {/* Divider */}
          <m.div variants={fadeUp} {...reveal} className="flex items-center gap-3 mb-4 px-1">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-white/40 text-[10px] tracking-widest uppercase">Salto</span>
            <div className="h-px flex-1 bg-white/10" />
          </m.div>

          {/* ── SALTO SECTION ── */}
          <div className="relative rounded-[2rem] overflow-hidden border border-[#3a1c08] bg-gradient-to-br from-[#1a0d02] via-[#241104] to-[#3a1a06] p-4 mb-4">
            {/* orange accent hairline at the top edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ff5c00]/70 to-transparent" />
            <Orb
              className="w-72 h-72 bg-[#ff5c00] -top-24 -right-20"
              opacity={[0.18, 0.32]}
              duration={10}
              reduce={reduce}
            />
            <Orb
              className="w-48 h-48 bg-[#ff3d00] bottom-0 -left-16"
              opacity={[0.12, 0.24]}
              duration={9}
              reduce={reduce}
            />
            <Orb
              className="w-40 h-40 bg-[#ff8a3d] top-1/3 left-1/4"
              opacity={[0.05, 0.14]}
              duration={8}
              reduce={reduce}
            />

            {/* Salto header */}
            <m.div
              variants={fadeUp}
              {...reveal}
              className="relative rounded-3xl overflow-hidden bg-white/[0.06] backdrop-blur-md border border-[#ff5c00]/15 shadow-2xl mb-4"
            >
              <div className="flex flex-col items-center py-7 px-6">
                <m.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                  className="rounded-2xl overflow-hidden shadow-2xl bg-[#0e0e0e] border border-[#2a2a2a] px-6 py-4"
                >
                  <Image src="/logo-saltoup.svg" alt="Logo Salto" width={200} height={62} priority />
                </m.div>
              </div>
            </m.div>

            <LinkCard title={t('sectionContact')} links={saltoContactLinks} dark />
            <LinkCard title={t('sectionSocial')} links={saltoSocialLinks} dark />

            {/* Salto Services */}
            <m.div
              variants={fadeUp}
              {...reveal}
              className="rounded-3xl overflow-hidden bg-white/[0.04] backdrop-blur-md border border-[#ff5c00]/12 shadow-2xl"
            >
              <div className="p-5">
                <h2 className="text-[#bbb] text-[10px] uppercase tracking-widest mb-3">{t('sectionServices')}</h2>
                <m.div variants={stagger} {...reveal} className="grid grid-cols-2 gap-2">
                  {saltoServices.map(({ icon, iconBg, color, label }) => (
                    <m.div
                      key={label}
                      variants={popIn}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#1e1e1e]/70 border border-[#3a2410] text-center"
                    >
                      <span
                        className={`${color} p-2.5 rounded-xl text-lg flex items-center justify-center`}
                        style={{ background: iconBg }}
                      >
                        {icon}
                      </span>
                      <span className="text-[#f5f5f5]/80 text-xs leading-snug">{label}</span>
                    </m.div>
                  ))}
                </m.div>
              </div>
            </m.div>
          </div>

          {/* QR code — closes the card */}
          <m.div
            variants={fadeUp}
            {...reveal}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#161616] to-[#0e0e0e] border border-[#252525] shadow-2xl"
          >
            {/* closing accent hairline */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="p-6 flex flex-col items-center gap-3">
              <p className="text-[#aaa] text-[10px] uppercase tracking-widest">{t('sectionQr')}</p>
              <m.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE }}
                className="rounded-2xl overflow-hidden p-2 bg-white shadow-lg"
              >
                <QRCodeCanvas
                  value="https://card.wbdigitalsolutions.com"
                  size={120}
                  bgColor="#ffffff"
                  fgColor="#350545"
                />
              </m.div>
              <p className="text-[#888] text-[11px] tracking-wide">card.wbdigitalsolutions.com</p>
              <p className="text-[#555] text-[10px] tracking-wide mt-1">© Bruno Vieira</p>
            </div>
          </m.div>
        </m.div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
