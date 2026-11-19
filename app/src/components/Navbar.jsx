import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, profile } from '../data';
import { ease } from './motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  const toggle = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && (setOpen(false), toggle.current?.focus());
    const onDown = (e) => {
      if (!panel.current?.contains(e.target) && !toggle.current?.contains(e.target)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* difference blend keeps the bar legible over both #111 and the white footer banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 mix-blend-difference sm:px-8"
      >
        <a href="#top" className="text-[14px] font-medium text-white">{profile.short}</a>
        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
          className="group relative flex h-[22px] w-[36px] flex-col items-center justify-center gap-[3px] rounded-[6px] bg-white"
        >
          <motion.span animate={open ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }} className="block h-[2px] w-[14px] rounded-full bg-[#111111]" />
          <motion.span animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }} className="block h-[2px] w-[14px] rounded-full bg-[#111111]" />
        </button>
      </motion.div>

      <div className="relative mx-auto max-w-[1240px]">
      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            ref={panel}
            aria-label="Primary"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="absolute right-5 top-[-4px] w-[200px] origin-top-right rounded-[6px] border border-line bg-card p-2 sm:right-8"
          >
            <ul>
              {nav.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, duration: 0.25, ease }}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-[4px] px-3 py-2 text-[14px] text-muted transition-colors hover:bg-white hover:text-[#111111]"
                  >
                    {n.label}
                    <span className="font-mono text-[10px] opacity-60">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
}
