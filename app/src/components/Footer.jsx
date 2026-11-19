import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { nav, profile } from '../data';
import { ease, inView } from './motion';

function CairoTime() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

export default function Footer() {
  const top = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  return (
    <footer className="mx-auto max-w-[1240px] px-5 pb-10 pt-20 sm:px-8">
      <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-3">
        <div>
          <p className="text-[18px] font-semibold tracking-head">{profile.short}</p>
          <p className="mt-1 text-[13px] text-muted">{profile.tagline}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Explore</p>
          <ul className="mt-3 flex max-w-[300px] flex-wrap gap-x-5 gap-y-2 text-[14px]">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="group relative text-white">
                  {n.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Get in touch</p>
          <a href={`mailto:${profile.email}`} className="mt-3 block text-[14px] text-white hover:underline">{profile.email}</a>
          <p className="mt-1 text-[13px] text-muted">Cairo, Egypt · <CairoTime /></p>
        </div>
      </div>

      <div className="mt-16 flex items-end justify-between gap-4">
        <div className="overflow-hidden">
          <motion.p initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={inView} transition={{ duration: 0.8, ease }} className="text-[24px] font-bold tracking-head">
            See you around.
          </motion.p>
        </div>
        <button type="button" onClick={top} className="group flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-white">
          Back to top <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </button>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[11px] text-muted">
        <span>©2026 {profile.fullName}</span>
        <span className="hidden sm:inline">Software engineer, in progress.</span>
      </div>
    </footer>
  );
}
