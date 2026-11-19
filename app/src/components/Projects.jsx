import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X, Lock } from 'lucide-react';
import { projects } from '../data';
import { SectionHeading, ease } from './Reveal';

/* ---------- Mini preview sheets (pure CSS/SVG, no images) ---------- */
const Bar = ({ w, dark }) => <div className={`h-1.5 rounded-full ${dark ? 'bg-neutral-800' : 'bg-neutral-300'}`} style={{ width: w }} />;

function SheetContent({ kind }) {
  switch (kind) {
    case 'edges':
      return (
        <svg viewBox="0 0 100 70" className="h-full w-full">
          {[[30, 36, 16], [62, 30, 12], [70, 52, 9]].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#111" strokeWidth="1.2" strokeDasharray={i === 1 ? '3 2' : undefined} />
          ))}
          <text x="4" y="66" fontSize="6" fontFamily="monospace" fill="#666">edges.png · 3 coins</text>
        </svg>
      );
    case 'chart':
      return (
        <div className="flex h-full items-end gap-1.5 px-1 pb-1">
          {[40, 65, 50, 85, 30].map((h, i) => (
            <div key={i} className={`flex-1 rounded-sm ${i === 3 ? 'bg-neutral-900' : 'bg-neutral-300'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      );
    case 'ui':
      return (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-full bg-neutral-800" /><Bar w="40%" dark /></div>
          <div className="h-8 rounded bg-neutral-200" />
          <Bar w="90%" /><Bar w="70%" />
        </div>
      );
    case 'api':
      return (
        <div className="space-y-1 font-mono text-[7px] leading-tight text-neutral-700">
          <div><b className="text-neutral-900">GET</b> /api/posts</div>
          <div><b className="text-neutral-900">POST</b> /api/auth</div>
          <div><b className="text-neutral-900">PUT</b> /api/votes/:id</div>
          <div className="text-neutral-400">200 OK · 34ms</div>
        </div>
      );
    case 'table':
      return (
        <div className="grid grid-cols-3 gap-[3px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`h-2.5 rounded-[2px] ${i < 3 ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
          ))}
        </div>
      );
    case 'kanban':
      return (
        <div className="grid h-full grid-cols-3 gap-1">
          {[3, 2, 1].map((n, c) => (
            <div key={c} className="space-y-1 rounded bg-neutral-200 p-1">
              {Array.from({ length: n }).map((_, i) => <div key={i} className={`h-2.5 rounded-sm ${c === 2 ? 'bg-neutral-800' : 'bg-white'}`} />)}
            </div>
          ))}
        </div>
      );
    default: // code
      return (
        <div className="space-y-1.5">
          {['55%', '80%', '35%', '70%', '60%'].map((w, i) => (
            <div key={i} className="flex gap-1" style={{ paddingLeft: i % 3 ? 8 : 0 }}>
              <Bar w={w} dark={i === 0} />
            </div>
          ))}
        </div>
      );
  }
}

const sheetVariants = (i) => {
  const rot = [-4, 0, 4][i];
  const x = [-16, 0, 16][i];
  return {
    rest: { y: 0, x: 0, rotate: 0 },
    peek: { y: -10 - i * 2, x: x * 0.3, rotate: rot * 0.4 },
    hover: { y: -44 - (i === 1 ? 18 : 0), x: x * 1.4, rotate: rot },
  };
};

const pocket = {
  rest: { rotateX: 0 },
  peek: { rotateX: -5 },
  hover: { rotateX: -12 },
};

function Folder({ project, index, onOpen, dimmed, matched }) {
  const [touch, setTouch] = useState(false);
  useEffect(() => setTouch(window.matchMedia('(hover: none)').matches), []);
  const resting = matched || touch ? 'peek' : 'rest';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay: (index % 2) * 0.12 }}
    >
      <motion.div animate={{ opacity: dimmed ? 0.35 : 1, scale: matched ? 1.015 : 1 }} transition={{ duration: 0.3 }}>
      <motion.button
        type="button"
        onClick={() => onOpen(project)}
        initial="rest"
        animate={resting}
        whileHover="hover"
        whileFocus="hover"
        aria-label={`Open case study: ${project.title}`}
        className="group relative block aspect-[5/4] w-full text-left outline-none [perspective:1100px] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-ink rounded-2xl"
      >
        {/* Back panel + tab */}
        <div className="absolute left-0 top-0 h-[14%] w-[42%] rounded-t-xl border border-b-0 border-white/10 bg-[#1D1D21]" />
        <div className="absolute inset-x-0 bottom-0 top-[10%] rounded-2xl rounded-tl-none border border-white/10 bg-[#1D1D21]" />

        {/* Preview sheets */}
        {project.sheets.map((kind, i) => (
          <motion.div
            key={i}
            variants={sheetVariants(i)}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.03 }}
            className="absolute left-[12%] right-[12%] top-[18%] h-[58%] rounded-lg border border-black/5 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            style={{ background: i === 1 ? '#FFFFFF' : '#E9E8E4', zIndex: i === 1 ? 2 : 1 }}
          >
            <SheetContent kind={kind} />
          </motion.div>
        ))}

        {/* Front pocket */}
        <motion.div
          variants={pocket}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          style={{ transformOrigin: '50% 100%', zIndex: 3 }}
          className={`absolute inset-x-0 bottom-0 flex h-[64%] flex-col justify-between rounded-2xl border bg-gradient-to-b from-[#2A2A30] to-[#17171A] p-5 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] transition-colors sm:p-6 ${
            matched ? 'border-white/40' : 'border-white/10'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg/80">
              {project.tag}
            </span>
            <span className="font-mono text-[11px] text-muted">0{index + 1}</span>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">{project.title}</h3>
            <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-muted">{project.summary}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg/70 transition-colors group-hover:text-fg">
              Open case study
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.div>
      </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Case-study modal ---------- */
function CaseStudy({ project, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } };
  const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cs-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface p-6 shadow-2xl sm:rounded-3xl sm:p-10"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:rotate-90 hover:border-white/30 hover:text-fg"
        >
          <X size={18} />
        </button>

        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.span variants={rise} className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Case study · {project.tag}
          </motion.span>
          <motion.h3 variants={rise} id="cs-title" className="mt-3 pr-10 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </motion.h3>
          <motion.p variants={rise} className="mt-4 text-base leading-relaxed text-fg/80">
            {project.summary}
          </motion.p>

          <motion.h4 variants={rise} className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">Architecture</motion.h4>
          <ol className="relative mt-5 space-y-5 border-l border-line pl-6">
            {project.architecture.map(([k, v], i) => (
              <motion.li key={k} variants={rise} className="relative">
                <span className="absolute -left-[29px] top-1 grid h-[9px] w-[9px] place-items-center rounded-full bg-white ring-4 ring-surface" />
                <p className="text-sm font-semibold text-fg">
                  <span className="mr-2 font-mono text-muted">{String(i + 1).padStart(2, '0')}</span>
                  {k}
                </p>
                <p className="mt-1 text-sm text-muted">{v}</p>
              </motion.li>
            ))}
          </ol>

          <motion.h4 variants={rise} className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">Engineering highlights</motion.h4>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <motion.li key={h} variants={rise} className="rounded-xl border border-line bg-raised px-4 py-3 text-sm text-fg/90">
                {h}
              </motion.li>
            ))}
          </ul>

          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-fg/80">{s}</span>
            ))}
          </motion.div>

          <motion.div variants={rise} className="mt-10 flex flex-wrap gap-3">
            {project.links.length ? (
              project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                >
                  {l.label}
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted">
                <Lock size={14} /> Repository not public yet
              </span>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ activeSkill }) {
  const [open, setOpen] = useState(null);
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading kicker="03 — Projects">Featured Projects</SectionHeading>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-md text-sm leading-relaxed text-muted"
        >
          Selected engineering, full-stack, and computer vision builds. Hover or open a folder to inspect architecture and case study details.
        </motion.p>
      </div>

      <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2">
        {projects.map((p, i) => {
          const matched = !!activeSkill && p.stack.includes(activeSkill);
          return (
            <Folder key={p.id} project={p} index={i} onOpen={setOpen} matched={matched} dimmed={!!activeSkill && !matched} />
          );
        })}
      </div>

      <AnimatePresence>{open && <CaseStudy project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
