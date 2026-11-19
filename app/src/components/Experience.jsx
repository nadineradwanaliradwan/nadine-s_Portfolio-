import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { Plus } from 'lucide-react';
import { experience } from '../data';
import { SectionHeading, ease } from './Reveal';

// Builds an undulating path through the measured node centres.
function buildPath(pts, swing) {
  if (pts.length < 2) return '';
  const [first] = pts;
  let d = `M ${first.x} ${Math.max(0, first.y - 60)} L ${first.x} ${first.y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dy = b.y - a.y;
    const s = (i % 2 ? 1 : -1) * swing;
    d += ` C ${a.x + s} ${a.y + dy * 0.45}, ${b.x + s} ${b.y - dy * 0.45}, ${b.x} ${b.y}`;
  }
  const last = pts[pts.length - 1];
  return `${d} L ${last.x} ${last.y + 60}`;
}

export default function Experience() {
  const wrap = useRef(null);
  const anchors = useRef([]);
  const [geo, setGeo] = useState({ w: 0, h: 0, d: '' });
  const [lit, setLit] = useState(0);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);

  const measure = useCallback(() => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pts = anchors.current.filter(Boolean).map((a) => {
      const b = a.getBoundingClientRect();
      return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 };
    });
    const swing = r.width < 768 ? 22 : 90;
    setGeo({ w: r.width, h: r.height, d: buildPath(pts, swing) });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure, active]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 75%', 'end 65%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });
  useMotionValueEvent(draw, 'change', (v) => {
    const n = experience.length;
    const count = v <= 0.02 ? 0 : Math.min(n, Math.floor(v * (n - 1) + 0.08) + 1);
    setLit((c) => (c === count ? c : count));
  });

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading kicker="04 — Experience">Experience.</SectionHeading>
        <div className="space-y-1 text-left font-mono text-xs text-muted md:text-right">
          <p>↑ Current work</p>
          <p>↓ Back to the foundations</p>
        </div>
      </div>

      <div ref={wrap} className="relative mt-16">
        <svg aria-hidden width={geo.w} height={geo.h} className="pointer-events-none absolute inset-0 overflow-visible">
          <path d={geo.d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 6" />
          <motion.path d={geo.d} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: draw }} />
        </svg>

        <ol className="relative space-y-10 md:space-y-4">
          {experience.map((e, i) => {
            const isLit = i < lit;
            const isOpen = active === i;
            const isHot = hover === i || isOpen;
            const left = i % 2 === 0;
            return (
              <li key={e.id} className="grid grid-cols-[44px_1fr] items-start gap-4 md:grid-cols-[1fr_200px_1fr] md:gap-0">
                {/* Node */}
                <div className={`row-start-1 flex justify-center pt-6 md:col-start-2 ${left ? 'md:-translate-x-8' : 'md:translate-x-8'} ${i % 2 ? 'translate-x-1' : '-translate-x-1'} md:translate-y-0`}>
                  <div ref={(el) => (anchors.current[i] = el)} className="relative h-5 w-5">
                    <button
                      type="button"
                      aria-label={`Show ${e.title}`}
                      onClick={() => setActive(i)}
                      onPointerEnter={() => setHover(i)}
                      onPointerLeave={() => setHover(null)}
                      className="absolute inset-0 grid place-items-center rounded-full"
                    >
                      {isLit && (
                        <motion.span
                          key="ring"
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 3, opacity: 0 }}
                          transition={{ duration: 1.1, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-full border border-white"
                        />
                      )}
                      {isOpen && isLit && <span className="pulse-ring absolute inset-0 rounded-full bg-white/30" />}
                      <motion.span
                        animate={{
                          scale: isHot ? 1.25 : 1,
                          backgroundColor: isLit ? '#FFFFFF' : '#0E0E10',
                          borderColor: isLit ? '#FFFFFF' : 'rgba(255,255,255,0.25)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        className="relative h-5 w-5 rounded-full border-2"
                      />
                    </button>
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: left ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease }}
                  className={`row-start-1 ${left ? 'md:col-start-1' : 'md:col-start-3'}`}
                >
                  <motion.button
                    type="button"
                    layout
                    onClick={() => setActive(i)}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(null)}
                    aria-expanded={isOpen}
                    animate={{ y: hover === i && !isOpen ? -3 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className={`w-full rounded-2xl border p-5 text-left transition-colors duration-300 sm:p-6 ${
                      isOpen ? 'border-white/30 bg-raised' : 'border-line bg-surface/50 hover:border-white/15'
                    } ${isLit ? '' : 'opacity-60'}`}
                  >
                    <motion.div layout="position" className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                          <span>{e.date}</span>
                          {e.note && <span className="rounded-full border border-line px-2 py-0.5 normal-case tracking-normal">{e.note}</span>}
                        </div>
                        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-fg sm:text-xl">{e.title}</h3>
                        <p className="mt-1 text-sm text-muted">{e.org}</p>
                      </div>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="mt-1 shrink-0 text-muted">
                        <Plus size={18} />
                      </motion.span>
                    </motion.div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                          onAnimationComplete={measure}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-sm leading-relaxed text-fg/80">{e.body}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {e.tags.map((t) => (
                              <span key={t} className="rounded-full border border-line px-2.5 py-1 text-xs text-fg/75">{t}</span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
