import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { nav, profile } from '../data';
import Crowd from './Crowd';
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

      {/* Full-bleed white banner: watermark behind, crowd in front */}
      <div ref={banner} className="relative overflow-hidden bg-white">
        <div ref={box} className="relative w-full pb-[56px] pt-10 sm:pb-[90px] lg:pb-[120px]" aria-hidden>
          <span ref={probe} className="invisible absolute left-0 top-0 whitespace-nowrap font-cond font-extrabold leading-none" style={{ fontSize: 100, ...condensed }}>
            {word}
          </span>
          <motion.p
            style={{ y: wordY, fontSize: size, ...condensed }}
            className="select-none whitespace-nowrap text-center font-cond font-extrabold uppercase leading-[0.8] text-ghost"
          >
            {word}
          </motion.p>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <Crowd className="h-[120px] sm:h-[190px] lg:h-[240px]" />
        </div>
      </div>
    </footer>
  );
}
