import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { nav, profile } from '../data';
import { ease, inView } from './motion';

// Sizes the watermark so the word spans exactly the full banner width.
function useFitText(text) {
  const box = useRef(null);
  const probe = useRef(null);
  const [size, setSize] = useState(200);
  useLayoutEffect(() => {
    const fit = () => {
      if (!box.current || !probe.current) return;
      const w = probe.current.getBoundingClientRect().width; // measured at 100px
      if (w) setSize((97 * box.current.clientWidth) / w);
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box.current);
    return () => ro.disconnect();
  }, [text]);
  return { box, probe, size };
}

function CairoTime() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

const word = profile.short.replace('.', '').toUpperCase();
const condensed = { fontStretch: '62%', fontVariationSettings: '"wdth" 62' };

export default function Footer() {
  const { box, probe, size } = useFitText(word);
  const banner = useRef(null);
  const { scrollYProgress } = useScroll({ target: banner, offset: ['start end', 'end end'] });
  const wordY = useTransform(scrollYProgress, [0, 1], ['18%', '0%']);

  const top = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  return (
    <footer>
      <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-20 sm:px-8">
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
            <p className="mt-1 text-[13px] text-muted">©2026 {profile.name}</p>
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
      </div>

      {/* Full-bleed white banner: the name, set edge to edge */}
      <div ref={banner} className="relative overflow-hidden bg-white text-[#111111]">
        <div ref={box} className="relative w-full pt-12 sm:pt-16" aria-hidden>
          <span ref={probe} className="invisible absolute left-0 top-0 whitespace-nowrap font-cond font-extrabold leading-none" style={{ fontSize: 100, ...condensed }}>
            {word}
          </span>
          <motion.p
            style={{ y: wordY, fontSize: size, ...condensed }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex select-none justify-center whitespace-nowrap font-cond font-extrabold uppercase leading-[0.8]"
          >
            {word.split('').map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.02em]">
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { y: '100%' }, show: { y: 0, transition: { duration: 0.9, ease, delay: i * 0.06 } } }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </motion.p>
        </div>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[#111111]/10 px-5 py-5 font-mono text-[11px] text-[#111111]/60 sm:px-8">
          <span>©2026 {profile.fullName}</span>
          <span>Cairo, Egypt · <CairoTime /></span>
          <span className="hidden sm:inline">Software engineer, in progress.</span>
        </div>
      </div>
    </footer>
  );
}
