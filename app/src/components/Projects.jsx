import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, Building2, Layers, Lock, ScanLine, X } from 'lucide-react';
import { moreProjects, profile, projects } from '../data';
import SectionTitle from './SectionTitle';
import { ease, inView } from './motion';

const icons = { scan: ScanLine, layers: Layers, book: BookOpen, building: Building2 };

/* Tiny monochrome mock content for the preview sheets */
function SheetLines({ variant }) {
  const bar = (w, dark) => <div className={`h-[5px] rounded-[1px] ${dark ? 'bg-[#111111]' : 'bg-ghost'}`} style={{ width: w }} />;
  return variant === 0 ? (
    <div className="space-y-[6px]">
      {bar('45%', true)}{bar('85%')}{bar('70%')}{bar('78%')}{bar('40%')}
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-[4px]">
      {Array.from({ length: 9 }).map((_, i) => <div key={i} className={`h-[10px] rounded-[1px] ${i < 3 ? 'bg-[#111111]' : 'bg-ghost'}`} />)}
    </div>
  );
}

const sheet = [
  { rest: { y: 0, rotate: 0, x: 0 }, hover: { y: -22, rotate: -3, x: -6 } },
  { rest: { y: 0, rotate: 0, x: 0 }, hover: { y: -22, rotate: 4, x: 8 } },
];
const flap = { rest: { rotateX: 0 }, hover: { rotateX: -10 } };

function Folder({ p, i, onOpen }) {
  const Icon = icons[p.icon] || Layers;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, ease, delay: i * 0.08 }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(p)}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        aria-label={`Open project: ${p.title}`}
        className="relative block aspect-[1/0.86] w-full text-left outline-none [perspective:900px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {/* back + tab */}
        <div className="absolute left-0 top-0 h-[22px] w-[42%] rounded-t-[8px] border border-b-0 border-folderEdge bg-card" />
        <div className="absolute inset-x-0 bottom-0 top-[20px] rounded-[10px] rounded-tl-none border border-line bg-card" />

        {/* preview sheets */}
        {sheet.map((v, s) => (
          <motion.div
            key={s}
            variants={v}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute left-[11%] right-[11%] top-[13%] h-[56%] rounded-[4px] bg-white p-3 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
            style={{ zIndex: 1 + s }}
          >
            <SheetLines variant={(s + i) % 2} />
          </motion.div>
        ))}

        {/* front pocket */}
        <motion.div
          variants={flap}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          style={{ transformOrigin: '50% 100%', zIndex: 5 }}
          className="absolute inset-x-0 bottom-0 flex h-[66%] flex-col justify-between rounded-[10px] border border-line border-t-folderEdge bg-folder p-4 shadow-[0_-10px_24px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[17px] font-semibold leading-tight tracking-head text-white">{p.title}</h3>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[4px] bg-white text-[#111111]">
              <Icon size={13} strokeWidth={2.2} />
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
            <span>{p.category}</span>
            <span className="flex items-center gap-1 text-white/80">
              View project <ArrowRight size={11} />
            </span>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

function Modal({ p, onClose }) {
  const close = useRef(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    close.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const list = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } };
  const up = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } };
  const Label = ({ children }) => <motion.p variants={up} className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{children}</motion.p>;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[#111111]/80 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="relative max-h-[90svh] w-full max-w-[680px] overflow-y-auto rounded-t-[10px] border border-line bg-card p-6 sm:rounded-[8px] sm:p-10"
      >
        <button ref={close} onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-[4px] border border-line text-muted transition-colors hover:bg-white hover:text-[#111111]">
          <X size={16} />
        </button>
        <motion.div variants={list} initial="hidden" animate="show">
          <motion.p variants={up} className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{p.category}</motion.p>
          <motion.h3 variants={up} id="pm-title" className="mt-2 pr-10 text-[32px] font-bold leading-tight tracking-head">{p.title}</motion.h3>
          <motion.p variants={up} className="mt-4 text-[15px] leading-relaxed text-white/85">{p.summary}</motion.p>

          {p.role && (<><Label>My part</Label><motion.p variants={up} className="mt-2 text-[15px] text-white">{p.role}</motion.p></>)}

          {p.stages && (
            <>
              <Label>Pipeline</Label>
              <ol className="mt-3 border-t border-line">
                {p.stages.map(([k, v], i) => (
                  <motion.li key={k} variants={up} className="grid grid-cols-[32px_1fr] gap-2 border-b border-line py-3 text-[14px]">
                    <span className="font-mono text-muted">0{i + 1}</span>
                    <span><span className="text-white">{k}</span><span className="text-muted"> — {v}</span></span>
                  </motion.li>
                ))}
              </ol>
            </>
          )}

          {p.highlights && (
            <>
              <Label>Highlights</Label>
              <ul className="mt-3 space-y-2">
                {p.highlights.map((h) => (
                  <motion.li key={h} variants={up} className="flex gap-3 text-[14px] text-white/85">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-white" />{h}
                  </motion.li>
                ))}
              </ul>
            </>
          )}

          <Label>Stack</Label>
          <motion.div variants={up} className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => <span key={s} className="rounded-[3px] border border-tagLine bg-tag px-3 py-1.5 text-[12px] text-tagText">{s}</span>)}
          </motion.div>

          <motion.div variants={up} className="mt-10 flex flex-wrap gap-3">
            {p.links.length ? p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-[4px] bg-white px-[18px] py-[10px] text-[14px] font-semibold text-[#111111]">
                {l.label}<ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )) : (
              <span className="inline-flex items-center gap-2 rounded-[4px] border border-line px-[18px] py-[10px] text-[14px] text-muted"><Lock size={14} /> Repository not public</span>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* Full index of everything else, editorial list style */
function MoreWork({ onOpen }) {
  let n = projects.length;
  return (
    <div id="all-work" className="mt-28 scroll-mt-24">
      <div className="flex items-end justify-between gap-6">
        <SectionTitle size={24}>All work</SectionTitle>
        <a href={profile.github} target="_blank" rel="noreferrer" className="group flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-white">
          GitHub <ArrowUpRight size={13} />
        </a>
      </div>
      {moreProjects.map((g) => (
        <div key={g.area} className="mt-10">
          <p className="border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{g.area}</p>
          <ul>
            {g.items.map((p) => {
              n += 1;
              const idx = String(n).padStart(2, '0');
              return (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.5, ease }}
                  className="border-b border-line"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(p)}
                    className="group grid w-full grid-cols-[32px_1fr_20px] items-baseline gap-4 px-2 py-4 text-left transition-colors duration-200 hover:bg-white md:grid-cols-[40px_minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,0.9fr)_20px]"
                  >
                    <span className="font-mono text-[11px] text-muted group-hover:text-[#111111]">{idx}</span>
                    <span>
                      <span className="block text-[15px] font-semibold tracking-head text-white group-hover:text-[#111111]">{p.title}</span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted group-hover:text-[#111111]/60 md:hidden">{p.category}</span>
                    </span>
                    <span className="hidden text-[13px] leading-snug text-muted group-hover:text-[#111111]/70 md:block">{p.summary}</span>
                    <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted group-hover:text-[#111111]/70 md:block">{p.stack.slice(0, 3).join(' · ')}</span>
                    <ArrowUpRight size={15} className="self-center text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#111111]" />
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <section id="projects" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <SectionTitle size={36}>Featured<br />Projects</SectionTitle>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={inView} transition={{ delay: 0.3, duration: 0.6 }} className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-muted">
            Independent projects and engineering work. Open a folder to explore a project or case study.
          </motion.p>
        </div>
        <a href="#all-work" className="group flex shrink-0 items-center gap-1.5 text-[13px] text-white">
          All work <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => <Folder key={p.id} p={p} i={i} onOpen={setOpen} />)}
      </div>

      <MoreWork onOpen={setOpen} />

      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
