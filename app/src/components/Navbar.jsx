import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { nav, profile } from '../data';
import Magnetic from './Magnetic';
import { ease } from './Reveal';

function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive('');
    window.addEventListener('scroll', onTop, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onTop); };
  }, [ids]);
  return active;
}

const ids = nav.map((n) => n.id);

function Pill({ active, idPrefix }) {
  return (
    <ul className="flex items-center gap-0.5 rounded-full border border-line bg-ink/70 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      {nav.map((item) => (
        <li key={item.id} className="relative">
          {active === item.id && (
            <motion.span
              layoutId={`${idPrefix}-pill`}
              className="absolute inset-0 rounded-full bg-white"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <a
            href={`#${item.id}`}
            className={`relative z-10 block rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 sm:px-4 ${
              active === item.id ? 'text-ink' : 'text-muted hover:text-fg'
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function StatusDot({ className = '' }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`}>
      <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
      <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
    </span>
  );
}

export default function Navbar() {
  const active = useActiveSection(ids);
  // Hide the top bar while scrolling down, reveal it on scroll up.
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden((h) => (y > 400 && y > prev + 2 ? true : y < prev - 2 ? false : h));
  });
  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: hidden ? 0.35 : 0.6, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -bottom-6 bg-gradient-to-b from-ink/90 via-ink/50 to-transparent" />
        <nav aria-label="Primary" className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <a href="#top" className="group flex items-center gap-2 font-mono text-sm font-medium text-fg">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface transition-transform duration-300 group-hover:rotate-[-8deg]">NR</span>
            <span className="hidden text-muted transition-colors group-hover:text-fg sm:inline">nadine.radwan</span>
          </a>
          <div className="hidden md:block">
            <Magnetic strength={0.12}>
              <Pill active={active} idPrefix="desk" />
            </Magnetic>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-ink/60 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur-xl">
            <StatusDot />
            <span className="hidden lg:inline">Available for opportunities · {profile.location}</span>
            <span className="lg:hidden">Available</span>
          </div>
        </nav>
      </motion.header>

      {/* Mobile: the pill floats at the bottom, within thumb reach */}
      <motion.nav
        aria-label="Sections"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-2 md:hidden"
      >
        <div className="no-scrollbar max-w-full overflow-x-auto">
          <Pill active={active} idPrefix="mob" />
        </div>
      </motion.nav>
    </>
  );
}
