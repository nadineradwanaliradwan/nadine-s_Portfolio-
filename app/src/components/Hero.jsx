import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profile } from '../data';
import { ease, inView } from './motion';

const portrait = `${import.meta.env.BASE_URL}portrait.jpg`;

function useMedia(q) {
  const [m, setM] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(q).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return m;
}

/* ---------- Faint full-width code backdrop ---------- */
const code = [
  'def canny(img, lo=0.1, hi=0.3):',
  '    blur = gaussian_filter(img, sigma=1.4)',
  '    gx, gy = sobel(blur, 1), sobel(blur, 0)',
  '    mag, ang = np.hypot(gx, gy), np.arctan2(gy, gx)',
  '    return hysteresis(nms(mag, ang), lo, hi)',
  'router.get("/api/feed", auth, async (req, res) => {',
  '  const posts = await Post.find().sort({ score: -1 }).limit(25);',
  '  res.json(posts);',
  '});',
  'public async Task<IActionResult> Index() => View(await _db.Courses.ToListAsync());',
  'SELECT c.Title, COUNT(e.StudentId) FROM Courses c JOIN Enrollments e ON …',
  'const summary = await summarize(post.body, { maxTokens: 120 });',
  'xTaskCreate(vTask, "sensor", 256, NULL, 2, NULL);  // FreeRTOS',
  'git commit -m "feat(facilities): first module increment"',
];
const lines = Array.from({ length: 56 }, (_, i) => `${code[(i * 5) % code.length]}        ${code[(i * 3 + 7) % code.length]}        ${code[(i * 7 + 2) % code.length]}`);

function CodeBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
      <div className="code-drift whitespace-pre px-6 font-mono text-[13px] leading-[22px] text-white">
        {[...lines, ...lines].map((l, i) => (
          <div key={i} style={{ paddingLeft: `${(i * 37) % 160}px` }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Portrait card ---------- */
function Portrait({ rotateY, small }) {
  const reduce = useReducedMotion();
  const [colour, setColour] = useState(false); // tap-to-toggle for touch screens (no hover)
  return (
    <div style={{ perspective: 1000 }}>
      <motion.div style={{ rotateY, transformStyle: 'preserve-3d' }}>
        <motion.div
          initial={reduce ? false : { rotateY: -180, opacity: 0.2 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1.3, ease, delay: 0.7 }}
          style={{ transformStyle: 'preserve-3d' }}
          className={`group relative ${small ? 'h-[205px] w-[160px]' : 'h-[280px] w-[220px]'}`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-ghost [backface-visibility:hidden]">
            <img
              src={portrait}
              alt="Portrait of Nadine Radwan"
              draggable={false}
              onClick={() => setColour((c) => !c)}
              className={`h-full w-full cursor-pointer object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:contrast-100 group-hover:grayscale-0 ${colour ? 'contrast-100 grayscale-0' : 'contrast-[1.15] grayscale'}`}
            />
          </div>
          <div className="absolute inset-0 grid place-items-center rounded-[12px] border border-line bg-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="font-mono text-2xl text-white">N.</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- Headline ---------- */
function Headline({ className = '' }) {
  const [a, b] = profile.headline;
  const word = (text, delay) => (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span className="inline-block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay }}>
        {text}
      </motion.span>
    </span>
  );
  return (
    <h1 className={`select-none text-center font-extrabold uppercase leading-[0.95] tracking-head text-white ${className}`}>
      <span className="sr-only">{`${a} ${b}`.toLowerCase()}</span>
      <span aria-hidden className="block whitespace-nowrap">
        {word('< ', 0.1)}
        {word(a, 0.18)}
      </span>
      <span aria-hidden className="block whitespace-nowrap">
        {word(b, 0.3)}
        {word(' />', 0.38)}
      </span>
    </h1>
  );
}

function Corners({ style }) {
  return (
    <motion.div style={style} className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-6 sm:px-8">
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }} className="text-[14px] text-white">
        ©2026
      </motion.span>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {'{{ '}{profile.meta}<span className="caret ml-0.5 inline-block h-[9px] w-[5px] translate-y-[1px] bg-muted" />{' }}'}
      </motion.span>
    </motion.div>
  );
}

/* ---------- Intro columns (shared by desktop morph + mobile stack) ---------- */
function IntroLeft({ align = 'right' }) {
  return (
    <div className={align === 'right' ? 'text-right' : ''}>
      <h2 className="text-[40px] font-bold leading-[1.02] tracking-head text-white xl:text-[48px]">Hi, I&apos;m Nadine.</h2>
      <p className="mt-3 text-balance text-[17px] leading-snug text-white/90">{profile.sub}</p>
      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Currently at</p>
      <ul className="mt-2 space-y-1 text-[14px] text-muted">
        {profile.currently.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </div>
  );
}

function IntroRight() {
  return (
    <div>
      <p className="max-w-[300px] text-[17px] leading-relaxed text-white/90">{profile.bio}</p>
      <a
        href="#projects"
        className="group mt-8 inline-flex items-center gap-2 rounded-[4px] bg-accent px-[18px] py-[10px] text-[14px] font-semibold text-[#111111] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-accentHover"
      >
        Explore projects
        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
}

/* ---------- Desktop: sticky 2-state morph ---------- */
function DesktopHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  const headOpacity = useTransform(p, [0.04, 0.3], [1, 0]);
  const headScale = useTransform(p, [0, 0.35], [1, 0.88]);
  const cornerOpacity = useTransform(p, [0, 0.2], [1, 0]);
  const cardY = useTransform(p, [0.08, 0.42], [140, 0]);
  const cardRot = useTransform(p, [0.08, 0.42], [0, reduce ? 0 : 360]);
  const colOpacity = useTransform(p, [0.36, 0.56], [0, 1]);
  const leftX = useTransform(p, [0.36, 0.6], [-40, 0]);
  const rightX = useTransform(p, [0.36, 0.6], [40, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[260vh]">
      <div id="about" className="sticky top-0 h-screen overflow-hidden">
        <CodeBackdrop />

        <motion.div style={{ opacity: headOpacity, scale: headScale }} className="absolute inset-0 grid place-items-center">
          <Headline className="text-[10.8vw]" />
        </motion.div>

        <div className="absolute inset-0 mx-auto grid max-w-[1240px] grid-cols-[1fr_220px_1fr] items-center gap-16 px-8">
          <motion.div style={{ opacity: colOpacity, x: leftX }}>
            <IntroLeft />
          </motion.div>
          <motion.div style={{ y: cardY }}>
            <Portrait rotateY={cardRot} />
          </motion.div>
          <motion.div style={{ opacity: colOpacity, x: rightX }}>
            <IntroRight />
          </motion.div>
        </div>

        <Corners style={{ opacity: cornerOpacity }} />
      </div>
    </section>
  );
}

/* ---------- Mobile / tablet: stacked ---------- */
function MobileHero() {
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
  return (
    <>
      <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-24">
        <CodeBackdrop />
        <Headline className="relative text-[13vw]" />
        <div className="relative -mt-[2vw]">
          <Portrait small />
        </div>
        <Corners />
      </section>
      <motion.section
        id="about"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        transition={{ staggerChildren: 0.12 }}
        className="mx-auto grid max-w-[640px] gap-10 px-5 pb-24"
      >
        <motion.div variants={item}><IntroLeft align="left" /></motion.div>
        <motion.div variants={item}><IntroRight /></motion.div>
      </motion.section>
    </>
  );
}

export default function Hero() {
  const desktop = useMedia('(min-width: 1024px)');
  return desktop ? <DesktopHero /> : <MobileHero />;
}
