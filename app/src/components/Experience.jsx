import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experience } from '../data';
import SectionTitle from './SectionTitle';
import { ease, inView } from './motion';

const certBase = `${import.meta.env.BASE_URL}certs/`;

export default function Experience() {
  const list = useRef(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Each node lights once the white rail has reached it (works for jumps too, not just slow scrolling).
  const rows = useRef([]);
  const [stops, setStops] = useState([]);
  const [lit, setLit] = useState(0);
  const measure = useCallback(() => {
    const el = list.current;
    if (!el) return;
    const h = el.offsetHeight || 1;
    setStops(rows.current.filter(Boolean).map((r) => (r.offsetTop + 12) / h));
  }, []);
  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list.current);
    return () => ro.disconnect();
  }, [measure]);
  useMotionValueEvent(fill, 'change', (v) => {
    const n = stops.filter((s) => s <= v + 0.01).length;
    setLit((c) => (c === n ? c : n));
  });

  return (
    <section id="experience" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
      <div className="flex items-end justify-between gap-6">
        <SectionTitle size={36} className="shrink-0">Experience.</SectionTitle>
        <div className="text-right font-mono text-[10px] leading-relaxed text-muted sm:text-[11px]">
          <p>Current work ↓</p>
          <p>Back to the foundations</p>
        </div>
      </div>

      <div ref={list} className="relative mt-14">
        {/* rail: grey track + white fill that follows scroll */}
        <div aria-hidden className="absolute bottom-2 left-[4px] top-2 w-px bg-line md:left-[204px]">
          <motion.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-white" />
        </div>

        <ol>
          {experience.map((e, i) => (
            <motion.li
              key={e.role}
              ref={(el) => (rows.current[i] = el)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, ease }}
              className="group relative grid grid-cols-[24px_1fr] gap-x-4 border-b border-line py-7 first:pt-0 last:border-b-0 md:grid-cols-[180px_48px_1fr] md:gap-x-0"
            >
              <p className="col-start-2 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors group-hover:text-white md:col-start-1 md:row-start-1 md:pt-[3px]">
                {e.date}
              </p>

              <span className="col-start-1 row-span-3 row-start-1 flex justify-start md:col-start-2 md:justify-center md:pt-[5px]">
                <motion.span
                  initial={false}
                  animate={i < lit ? { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', scale: 1 } : { backgroundColor: '#111111', borderColor: '#333333', scale: 0.8 }}
                  transition={{ duration: 0.4, ease }}
                  className="mt-[3px] block h-[9px] w-[9px] rounded-full border md:mt-0"
                />
              </span>

              <div className="col-start-2 mt-2 md:col-start-3 md:row-start-1 md:mt-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[18px] font-bold leading-snug tracking-head text-white">{e.role}</h3>
                  <span className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-1 text-[14px] text-muted">{e.org}</p>
                <p className="mt-3 max-w-[620px] text-[14px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/80">
                  {e.summary}
                </p>
                {(e.cert || e.link) && (
                  <a
                    href={e.cert ? certBase + e.cert : e.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link mt-4 inline-flex items-center gap-1 border-b border-line pb-0.5 text-[12px] text-white transition-colors hover:border-white"
                  >
                    {e.cert ? 'View certificate' : e.link.label}
                    <ArrowUpRight size={12} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
