'use client';
import { motion as m } from 'framer-motion';
import Image from 'next/image';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Turns a filled circle into a ring of the given thickness.
const ring = (px: number) => {
  const mask = `radial-gradient(farthest-side, transparent calc(100% - ${px}px), #000 calc(100% - ${px}px))`;
  return { mask, WebkitMask: mask };
};

// Profile photo framed by two arcs in the WB palette: a bright purple → yellow
// arc that orbits clockwise (with a glowing head) and a faint counter-rotating
// arc behind it. Only transforms animate, so it stays on the compositor;
// reduced-motion users get the same frame, static.
export default function PhotoArc({ reduce = false }: { reduce?: boolean }) {
  const spin = (duration: number, direction: 1 | -1) =>
    reduce
      ? {}
      : {
          animate: { rotate: 360 * direction },
          transition: { duration, repeat: Infinity, ease: 'linear' as const },
        };

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      className="relative shrink-0 w-[5.5rem] h-[5.5rem]"
    >
      {/* Faint outer arc, counter-rotating */}
      <m.div
        aria-hidden
        className="absolute -inset-1 rounded-full"
        style={{
          background: 'conic-gradient(from 180deg, transparent 0deg, rgba(255,255,255,0.22) 120deg, transparent 200deg)',
          ...ring(1),
        }}
        {...spin(14, -1)}
      />

      {/* Main arc — fades in from transparent to purple to yellow, glowing head */}
      <m.div aria-hidden className="absolute inset-0" {...spin(6, 1)}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, #350545 60deg, #792990 170deg, #c45fd9 240deg, #ffb947 300deg, transparent 301deg)',
            ...ring(3),
          }}
        />
        {/* Arc head: sits at the 300° mark, where the gradient ends */}
        <span
          className="absolute w-2 h-2 rounded-full bg-yellowcustom shadow-[0_0_10px_3px_rgba(255,185,71,0.6)]"
          style={{
            left: `calc(50% + 50% * ${Math.sin((300 * Math.PI) / 180)} - 4px + ${-1.5 * Math.sin((300 * Math.PI) / 180)}px)`,
            top: `calc(50% - 50% * ${Math.cos((300 * Math.PI) / 180)} - 4px + ${1.5 * Math.cos((300 * Math.PI) / 180)}px)`,
          }}
        />
      </m.div>

      {/* Photo */}
      <div className="absolute inset-[6px] rounded-full overflow-hidden ring-1 ring-white/10 bg-[#1e1e1e]">
        <Image
          src="/bruno.jpg"
          alt="Bruno Vieira"
          width={160}
          height={160}
          priority
          className="w-full h-full object-cover"
        />
      </div>
    </m.div>
  );
}
