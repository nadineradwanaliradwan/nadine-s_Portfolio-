import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { nav, profile } from '../data';
import Magnetic from './Magnetic';
import Crowd from './Crowd';
import { ease } from './Reveal';

function CairoClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const wordY = useTransform(p, [0, 1], ['35%', '0%']);
  const wordScale = useTransform(p, [0, 1], [0.94, 1]);

  const cols = [
    { title: 'Navigate', links: nav.map((n) => ({ label: n.label, href: `#${n.id}` })) },
    {
      title: 'Elsewhere',
      links: [
        { label: 'GitHub', href: profile.github, ext: true },
        { label: 'LinkedIn', href: profile.linkedin, ext: true },
        { label: 'Email', href: `mailto:${profile.email}` },
        { label: 'Download CV', href: `${import.meta.env.BASE_URL}${profile.cv}`, ext: true },
      ],
    },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden rounded-t-[2rem] bg-paper text-ink sm:rounded-t-[3rem]">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-8 sm:pt-24">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="overflow-hidden pb-2">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="font-display text-5xl font-bold tracking-tight sm:text-7xl"
            >
              See you around.
            </motion.h2>
          </div>
          <Magnetic>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              Back to top
              <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </Magnetic>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 border-t border-ink/10 pt-10 md:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink/50">{c.title}</p>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="group relative inline-block text-sm font-medium"
                    >
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink/50">Local time</p>
            <p className="text-sm font-medium">Cairo, EG · <CairoClock /></p>
          </div>
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink/50">Status</p>
            <p className="flex items-center gap-2 text-sm font-medium">
              <span className="relative inline-flex h-2 w-2">
                <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-500" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-12 select-none" aria-hidden>
        <motion.p
          style={{ y: wordY, scale: wordScale }}
          className="origin-bottom text-center font-display whitespace-nowrap text-[31vw] font-bold uppercase leading-[0.78] tracking-[-0.065em] text-ink"
        >
          {profile.first}
        </motion.p>
      </div>

      <div className="relative -mt-[4vw]">
        <Crowd />
      </div>
      <div className="flex flex-col items-center justify-between gap-2 bg-ink px-4 py-4 pb-24 font-mono text-[11px] text-paper/60 sm:flex-row sm:px-8 md:pb-4">
        <span>© 2026 {profile.name}</span>
        <span>Built with React · Tailwind · Framer Motion</span>
      </div>
    </footer>
  );
}
