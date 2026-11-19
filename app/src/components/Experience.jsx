import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { experience } from '../data';
import SectionTitle from './SectionTitle';
import { ease, inView } from './motion';

const WAVE_H = 96;
const AMP = 26;

// Smooth wave through points with horizontal tangents at every node (peaks & valleys).
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
  const wrap = useRef(null);
  const cols = useRef([]);
  const [geo, setGeo] = useState({ w: 0, nodes: [], d: '' });
  const [lit, setLit] = useState(0);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mid = WAVE_H / 2;
    const nodes = cols.current.filter(Boolean).map((c, i) => ({
      x: c.getBoundingClientRect().left - r.left + 5,
      y: i % 2 === 0 ? mid - AMP : mid + AMP,
    }));
    const pts = [...nodes, { x: r.width, y: nodes.length % 2 ? mid + AMP * 0.6 : mid - AMP * 0.6 }];
    setGeo({ w: r.width, nodes, d: wavePath(pts) });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 85%', 'center 50%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
  useMotionValueEvent(draw, 'change', (v) => {
    // node i sits at roughly (i + 0.5) / n along the path
    const n = experience.length;
    const count = experience.filter((_, i) => v >= (i + 0.35) / (n + 0.2)).length;
    setLit((c) => (c === count ? c : count));
  });

  return (
    <section id="experience" className="mx-auto max-w-[1240px] py-28">
      <div className="flex items-end justify-between gap-6 px-5 sm:px-8">
        <SectionTitle size={36}>Experience.</SectionTitle>
        <div className="text-right font-mono text-[11px] leading-relaxed text-muted">
          <p>Current work</p>
          <p>Back to the foundations</p>
        </div>
      </div>

      <div className="no-scrollbar mt-14 overflow-x-auto px-5 sm:px-8">
        <div ref={wrap} className="relative min-w-[880px]">
          <svg aria-hidden width={geo.w} height={WAVE_H} className="block overflow-visible">
            <path d={geo.d} fill="none" stroke="#262626" strokeWidth="1.5" />
            <motion.path d={geo.d} fill="none" stroke="#333333" strokeWidth="1.5" style={{ pathLength: draw }} />
            <motion.path d={geo.d} fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1" style={{ pathLength: draw }} />
          </svg>

          {geo.nodes.map((n, i) => {
            const on = active === i;
            return (
              <motion.button
                key={i}
                type="button"
                aria-label={`Highlight ${experience[i].role}`}
                onClick={() => setActive(i)}
                onPointerEnter={() => setActive(i)}
                initial={false}
                animate={{ scale: i < lit ? 1 : 0, opacity: i < lit ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="absolute -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full"
                style={{
                  left: n.x,
                  top: n.y,
                  background: on ? '#FFFFFF' : '#1A1A1A',
                  border: on ? '1px solid #FFFFFF' : '1px solid #333333',
                  boxShadow: on ? '0 0 0 4px #111111, 0 0 0 5px #FFFFFF' : 'none',
                  transition: 'background 200ms, box-shadow 200ms, border-color 200ms',
                }}
              />
            );
          })}

          <ol className="mt-6 grid grid-cols-4 gap-8">
            {experience.map((e, i) => (
              <motion.li
                key={e.role}
                ref={(el) => (cols.current[i] = el)}
                onPointerEnter={() => setActive(i)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.12 }}
                className="cursor-default"
              >
                <span
                  className={`inline-block rounded-full px-2.5 py-[3px] font-mono text-[10px] transition-colors duration-200 ${
                    active === i ? 'bg-white text-[#111111]' : 'border border-line text-white'
                  }`}
                >
                  {e.date}
                </span>
                <h3 className="mt-4 text-[16px] font-bold leading-snug text-white">{e.role}</h3>
                <p className="mt-1 text-[13px] text-muted">{e.org}</p>
                <p className={`mt-3 max-w-[260px] text-[13px] leading-relaxed transition-colors duration-200 ${active === i ? 'text-white/75' : 'text-muted'}`}>
                  {e.summary}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
      <p className="mt-6 px-5 font-mono text-[10px] text-muted sm:hidden">Swipe →</p>
    </section>
  );
}
