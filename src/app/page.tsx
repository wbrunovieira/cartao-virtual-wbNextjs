// src/app/page.tsx
'use client';
import { motion } from 'framer-motion';
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
import { QRCodeCanvas } from 'qrcode.react';
import Image from 'next/image';

const contactLinks = [
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
    label: 'Telefone',
    value: '(11) 5026-4203',
    prefix: '🇧🇷 +55',
    color: 'text-purple-300',
    iconBg: 'rgba(196,181,253,0.15)',
  },
  {
    href: 'mailto:bruno@wbdigitalsolutions.com',
    icon: <FaEnvelope className="text-base" />,
    label: 'Email',
    value: 'bruno@wbdigitalsolutions.com',
    color: 'text-yellowcustom',
    iconBg: 'rgba(255,185,71,0.15)',
  },
];

const socialLinks = [
  {
    href: 'https://www.wbdigitalsolutions.com',
    icon: <FaGlobe className="text-base" />,
    label: 'Site',
    value: 'wbdigitalsolutions.com',
    color: 'text-sky-400',
    iconBg: 'rgba(56,189,248,0.15)',
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
    label: 'Instagram Pessoal',
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

const services = [
  { label: 'Sites & E-commerces', icon: <FaCode />, iconBg: 'rgba(56,189,248,0.15)', color: 'text-sky-400' },
  { label: 'Automações', icon: <FaCogs />, iconBg: 'rgba(196,181,253,0.15)', color: 'text-purple-300' },
  { label: 'IA & Data Science', icon: <FaMicrochip />, iconBg: 'rgba(255,185,71,0.15)', color: 'text-yellowcustom' },
  { label: 'Consultoria Tech', icon: <FaLightbulb />, iconBg: 'rgba(74,222,128,0.15)', color: 'text-green-400' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
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
    <motion.div
      variants={fadeUp}
      className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4"
    >
      <div className="px-4 pt-4 pb-1">
        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">{title}</p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 pb-4 flex flex-col gap-2"
      >
        {links.map(({ href, icon, label, value, color, iconBg, prefix }) => (
          <motion.a
            key={label}
            variants={linkItem}
            whileHover={{
              y: -2,
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderColor: 'rgba(255,255,255,0.28)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
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
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Floating background orb
function Orb({ className, animate }: { className: string; animate: object }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={animate}
      transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    />
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0226] via-[#350545] to-[#792990] p-4 overflow-hidden">

      {/* Animated background orbs */}
      <Orb className="w-72 h-72 bg-custom-purple opacity-30 -top-20 -left-20" animate={{ x: [0, 30, 0], y: [0, 20, 0] }} />
      <Orb className="w-96 h-96 bg-primary opacity-40 -bottom-32 -right-24" animate={{ x: [0, -25, 0], y: [0, -30, 0] }} />
      <Orb className="w-48 h-48 bg-yellowcustom opacity-10 top-1/2 left-1/3" animate={{ x: [0, 20, -10, 0], y: [0, -20, 10, 0] }} />

      <motion.div
        className="relative w-full max-w-sm z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Welcome message */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4"
        >
          <div className="px-5 pt-5 pb-5">
            {/* Quote mark */}
            <span
              className="block text-5xl font-serif leading-none mb-2"
              style={{ color: '#ffb947', opacity: 0.7 }}
            >
              "
            </span>

            {/* Headline */}
            <h2 className="text-white font-semibold text-base mb-2 leading-snug">
              Obrigado por estar aqui.
            </h2>

            {/* Body */}
            <p className="text-white/60 text-sm leading-relaxed">
              Compartilhei esse link com você porque{' '}
              <span className="text-white/90 font-medium">reconheço a sua importância</span>.
              Explore os contatos abaixo e me chame pelo app que você já usa.
            </p>

            {/* Divider + signature */}
            <div className="flex items-center gap-3 mt-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-white/30 text-xs tracking-widest uppercase">Bruno Vieira</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        </motion.div>

        {/* Header card */}
        <motion.div
          variants={fadeUp}
          className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4"
        >
          <div className="flex flex-col items-center pt-10 pb-8 px-6 gap-3">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="rounded-2xl ring-2 ring-white/30 overflow-hidden shadow-2xl bg-white px-6 py-4"
            >
              <Image src="/logo.svg" alt="Logo WB Digital Solutions" width={220} height={62} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-center mt-6"
            >
              <h1 className="text-2xl font-bold text-white tracking-wide">Bruno Vieira</h1>
              <p className="text-white/70 text-sm mt-1">Fundador & Tech Lead</p>
              <p className="text-white/40 text-xs mt-0.5 tracking-widest uppercase">WB Digital Solutions</p>
            </motion.div>

            <motion.a
              href="bruno.vcf"
              download="bruno.vcf"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              whileHover={{
                scale: 1.03, y: -3,
                boxShadow: '0 3px 0px #a86800, 0 10px 24px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.3) inset',
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
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
              Salvar Contato
            </motion.a>
          </div>
        </motion.div>

        <LinkCard title="Contato direto" links={contactLinks} />
        <LinkCard title="Redes & Web" links={socialLinks} />

        {/* Services card */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4"
        >
          <div className="p-5">
            <h2 className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Principais Serviços</h2>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-2"
            >
              {services.map(({ label, icon, iconBg, color }) => (
                <motion.div
                  key={label}
                  variants={linkItem}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <span
                    className={`${color} p-2.5 rounded-xl text-lg flex items-center justify-center`}
                    style={{ background: iconBg }}
                  >
                    {icon}
                  </span>
                  <span className="text-white/90 text-xs leading-snug">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* QR Code card */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        >
          <div className="p-5 flex flex-col items-center gap-3">
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Escaneie para visitar</p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden p-2 bg-white shadow-lg"
            >
              <QRCodeCanvas
                value="https://card.wbdigitalsolutions.com"
                size={120}
                bgColor="#ffffff"
                fgColor="#350545"
              />
            </motion.div>
            <p className="text-white/30 text-[11px] tracking-wide">card.wbdigitalsolutions.com</p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
