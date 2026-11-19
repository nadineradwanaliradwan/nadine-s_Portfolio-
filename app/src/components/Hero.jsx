import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { ease } from './Reveal';

const portrait = `${import.meta.env.BASE_URL}portrait.jpg`;

/* ---------- Stage 1: masked character reveal ---------- */
function Chars({ text, delay = 0 }) {
  return (
    <span aria-hidden className="inline-flex">
      {text.split('').map((c, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.035 }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Bracket({ children, from, delay }) {
  return (
    <motion.span
      aria-hidden
      className="inline-block text-white/30"
      initial={{ x: from, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay }}
    >
      {children}
    </motion.span>
  );
}

/* ---------- Typewriter for the corner metadata ---------- */
const phrases = ['AI, CV & FULL-STACK DEVELOPMENT', 'COMPUTER VISION FROM SCRATCH', 'EMBEDDED & REAL-TIME SYSTEMS'];

function Typewriter() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(reduce ? phrases[0].length : 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const full = phrases[i];
    let t;
    if (!deleting && n < full.length) t = setTimeout(() => setN(n + 1), 45);
    else if (!deleting && n === full.length) t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && n > 0) t = setTimeout(() => setN(n - 1), 22);
    else { setDeleting(false); setI((i + 1) % phrases.length); }
    return () => clearTimeout(t);
  }, [n, deleting, i, reduce]);

  return (
    <span>
      {'{{ '}
      <span className="text-fg">{phrases[i].slice(0, n)}</span>
      <span className="caret ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-fg/80" />
      {' }}'}
    </span>
  );
}

/* ---------- Drifting watermarks in the background ---------- */
const marks = [
  { t: 'lat 30.0444° N · lon 31.2357° E', c: 'left-[6%] top-[22%]' },
  { t: 'grad = np.hypot(gx, gy)', c: 'right-[8%] top-[18%]' },
  { t: 'app.get("/api/feed", auth, …)', c: 'left-[10%] bottom-[30%] hidden sm:block' },
  { t: 'SELECT * FROM Courses;', c: 'right-[12%] bottom-[34%] hidden sm:block' },
  { t: '// x: 1440  y: 0900', c: 'left-[44%] top-[12%] hidden lg:block' },
];

function Watermarks() {
  const reduce = useReducedMotion();
  return marks.map((m, i) => (
    <motion.span
      key={m.t}
      aria-hidden
      className={`absolute font-mono text-[11px] text-white/[0.13] ${m.c}`}
      initial={{ opacity: 0 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -14, 0], x: [0, i % 2 ? 8 : -8, 0] }}
      transition={{
        opacity: { duration: 1.2, delay: 1.6 + i * 0.15 },
        y: { duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: 11 + i * 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {m.t}
    </motion.span>
  ));
}

/* ---------- Stage 2: flip-in portrait that becomes a tilt card ---------- */
function PortraitCard() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const glareX = useTransform(sry, [-14, 14], ['20%', '80%']);
  const glare = useTransform(glareX, (v) => `radial-gradient(circle at ${v} 20%, rgba(255,255,255,0.18), transparent 55%)`);

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 28);
    rx.set(-py * 22);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <div style={{ perspective: 1200 }} className="w-[min(46vw,230px)] md:w-[clamp(150px,21vw,290px)]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="group relative"
      >
        <motion.div
          initial={reduce ? false : { rotateY: 180, scale: 0.85 }}
          animate={{ rotateY: 0, scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 1.0 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative aspect-[3/4] w-full"
        >
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-raised shadow-[0_30px_80px_rgba(0,0,0,0.6)] [backface-visibility:hidden]">
            <img
              src={portrait}
              alt="Portrait of Nadine Radwan Ali"
              className="h-full w-full object-cover grayscale contrast-[1.15] transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
              draggable={false}
            />
            <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0 mix-blend-overlay" />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/80" style={{ transform: 'translateZ(30px)' }}>
              <span>N.R.A</span>
              <span>CAI · 2026</span>
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 grid place-items-center rounded-2xl border border-white/10 bg-surface [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="dot-grid absolute inset-0 rounded-2xl opacity-60" />
            <span className="relative font-mono text-5xl font-medium text-white/80">NR</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- Hero ---------- */
export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Stage-3 exit: type recedes, card lifts and turns, metadata drops away.
  const textScale = useTransform(p, [0, 0.6], [1, 0.82]);
  const textOpacity = useTransform(p, [0.05, 0.55], [1, 0]);
  const textY = useTransform(p, [0, 0.6], [0, -60]);
  const cardY = useTransform(p, [0, 0.7], [0, -120]);
  const cardRotY = useTransform(p, [0, 0.7], [0, -18]);
  const cardScale = useTransform(p, [0, 0.7], [1, 0.78]);
  const cardOpacity = useTransform(p, [0.45, 0.75], [1, 0]);
  const metaOpacity = useTransform(p, [0, 0.25], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[175vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
        <Watermarks />

        <div className="relative flex h-full flex-col items-center justify-center gap-8 px-4 md:block">
          <motion.h1
            style={{ scale: textScale, opacity: textOpacity, y: textY }}
            className="relative select-none text-center font-display text-[13.5vw] font-bold uppercase leading-[0.86] tracking-[-0.04em] text-fg md:flex md:h-full md:flex-col md:justify-center md:text-[12.5vw]"
          >
            <span className="sr-only">Computer Engineer</span>
            <span className="flex items-baseline justify-center gap-[0.12em]">
              <Bracket from={60} delay={0.9}>&lt;</Bracket>
              <Chars text="COMPUTER" delay={0.15} />
            </span>
            <span className="flex items-baseline justify-center gap-[0.12em]">
              <Chars text="ENGINEER" delay={0.4} />
              <Bracket from={-60} delay={1.0}>/&gt;</Bracket>
            </span>
          </motion.h1>

          <div className="pointer-events-none order-first grid place-items-center md:absolute md:inset-0" style={{ perspective: 1400 }}>
            <motion.div style={{ y: cardY, rotateY: cardRotY, scale: cardScale, opacity: cardOpacity }} className="pointer-events-auto">
              <PortraitCard />
            </motion.div>
          </div>
        </div>

        <motion.div style={{ opacity: metaOpacity }} className="absolute inset-x-0 bottom-20 flex flex-col gap-2 px-4 font-mono text-[11px] uppercase tracking-widest text-muted sm:bottom-8 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8, ease }}>
            ©2026 — Nadine Radwan Ali
          </motion.span>
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="hidden items-center gap-2 transition-colors hover:text-fg sm:flex"
          >
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowDown size={14} />
            </motion.span>
            Scroll
          </motion.a>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8, ease }}>
            <Typewriter />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
