import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experience } from '../data';
import { ease } from './motion';

const WAVE_H = 96;
const PAD_END = 80; // room after the last column
const AMP = 26;
const certBase = `${import.meta.env.BASE_URL}certs/`;

// Smooth wave with horizontal tangents at every node, so nodes sit on peaks & valleys.
function wavePath(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mx = (b.x - a.x) / 2;
    d += ` C ${a.x + mx} ${a.y}, ${b.x - mx} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
}

export default function Experience() {
  const section = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  const cols = useRef([]);
  const list = useRef(null);
  const [geo, setGeo] = useState({ w: 0, vw: 0, start: 0, nodes: [], d: '', h: 0 });
  const [lit, setLit] = useState(1);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const t = track.current;
    const v = viewport.current;
    if (!t || !v) return;
    const r = t.getBoundingClientRect();
    const mid = WAVE_H / 2;
    const nodes = cols.current.filter(Boolean).map((c, i) => ({
      x: c.getBoundingClientRect().left - r.left + 5,
      y: i % 2 === 0 ? mid - AMP : mid + AMP,
    }));
    const w = list.current ? list.current.offsetWidth : 0; // columns only, never the svg (avoids a feedback loop)
    const last = nodes[nodes.length - 1];
    const pts = [...nodes, { x: w, y: last ? (nodes.length % 2 ? mid + AMP * 0.6 : mid - AMP * 0.6) : mid }];
    const vw = v.clientWidth;
    const start = parseFloat(getComputedStyle(t.parentElement).paddingLeft) || 0; // track's left inset
    // Section height = horizontal distance to travel + one screen.
    setGeo({ w, vw, start, nodes, d: wavePath(pts), h: Math.max(0, start + w + PAD_END - vw) + window.innerHeight });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    ro.observe(viewport.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [measure]);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const travel = Math.max(0, geo.start + geo.w + PAD_END - geo.vw);
  const x = useTransform(p, (v) => -v * travel);
  // The line is drawn up to ~70% across the visible window.
  const drawnX = useTransform(p, (v) => v * travel + geo.vw * 0.7 - geo.start);
  const pathLength = useTransform(drawnX, (dx) => (geo.w ? Math.min(1, dx / geo.w) : 0));

  useMotionValueEvent(drawnX, 'change', (dx) => {
    const count = Math.max(1, geo.nodes.filter((n) => n.x <= dx).length);
    setLit((c) => (c === count ? c : count));
  });

  return (
    <section id="experience" ref={section} style={{ height: geo.h || '100vh' }} className="relative">
      <div ref={viewport} className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1240px] items-end justify-between gap-6 px-5 sm:px-8">
          <div className="shrink-0 overflow-hidden pb-1">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-[36px] font-bold leading-[1.05] tracking-head"
            >
              Experience.
            </motion.h2>
          </div>
          <div className="text-right font-mono text-[10px] leading-relaxed text-muted sm:text-[11px]">
            <p>Current work →</p>
            <p>Back to the foundations</p>
          </div>
        </div>

        <div className="mt-12 pl-5 sm:pl-8 xl:pl-[max(2rem,calc((100vw-1240px)/2+2rem))]">
          <motion.div ref={track} style={{ x }} className="relative w-max">
            <svg aria-hidden width={geo.w} height={WAVE_H} className="block overflow-visible">
              <path d={geo.d} fill="none" stroke="#262626" strokeWidth="1.5" />
              <motion.path d={geo.d} fill="none" stroke="#888888" strokeWidth="1.5" style={{ pathLength }} />
            </svg>

            {geo.nodes.map((n, i) => {
              const on = active === i;
              const reached = i < lit;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Highlight ${experience[i].role}`}
                  onClick={() => setActive(i)}
                  onPointerEnter={() => setActive(i)}
                  className="absolute -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full transition-all duration-300"
                  style={{
                    left: n.x,
                    top: n.y,
                    background: on ? '#FFFFFF' : reached ? '#888888' : '#1A1A1A',
                    border: `1px solid ${on || reached ? '#FFFFFF' : '#333333'}`,
                    boxShadow: on ? '0 0 0 4px #111111, 0 0 0 5px #FFFFFF' : 'none',
                    transform: reached ? 'scale(1)' : 'scale(0.8)',
                  }}
                />
              );
            })}

            <ol ref={list} className="mt-6 flex w-max gap-12">
              {experience.map((e, i) => {
                const on = active === i;
                return (
                  <li
                    key={e.role}
                    ref={(el) => (cols.current[i] = el)}
                    onPointerEnter={() => setActive(i)}
                    className={`w-[250px] shrink-0 transition-opacity duration-500 sm:w-[270px] ${i < lit ? 'opacity-100' : 'opacity-40'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`inline-block rounded-full px-2.5 py-[3px] font-mono text-[10px] transition-colors duration-200 ${on ? 'bg-white text-[#111111]' : 'border border-line text-white'}`}>
                        {e.date}
                      </span>
                      <span className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <h3 className="mt-4 text-[16px] font-bold leading-snug text-white">{e.role}</h3>
                    <p className="mt-1 text-[13px] text-muted">{e.org}</p>
                    <p className={`mt-3 text-[13px] leading-relaxed transition-colors duration-200 ${on ? 'text-white/75' : 'text-muted'}`}>{e.summary}</p>
                    {(e.cert || e.link) && (
                      <a
                        href={e.cert ? certBase + e.cert : e.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-4 inline-flex items-center gap-1 border-b border-line pb-0.5 text-[12px] text-white transition-colors hover:border-white"
                      >
                        {e.cert ? 'View certificate' : e.link.label}
                        <ArrowUpRight size={12} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.div>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-[1240px] items-center gap-4 px-5 font-mono text-[10px] text-muted sm:px-8">
          <span className="tabular-nums text-white">{String(lit).padStart(2, '0')}</span>
          <span className="relative h-px w-24 bg-line">
            <motion.span style={{ scaleX: p }} className="absolute inset-0 origin-left bg-white" />
          </span>
          <span className="tabular-nums">{String(experience.length).padStart(2, '0')}</span>
          <span className="ml-2">Keep scrolling</span>
        </div>
      </div>
    </section>
  );
}
