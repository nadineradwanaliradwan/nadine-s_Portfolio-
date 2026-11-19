import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppWindow, ArrowLeft, ArrowRight, ArrowUpRight, BrainCircuit, Cpu, Layers, Lock, X } from 'lucide-react';
import { categories, profile } from '../data';
import SectionTitle from './SectionTitle';
import { ease, inView } from './motion';

const icons = { layers: Layers, brain: BrainCircuit, cpu: Cpu, window: AppWindow };
const pad = (n) => String(n).padStart(2, '0');

/* ---------- Folder (one per category) ---------- */
const sheetV = [
  { rest: { y: 0, rotate: 0, x: 0 }, hover: { y: -22, rotate: -3, x: -6 } },
  { rest: { y: 0, rotate: 0, x: 0 }, hover: { y: -22, rotate: 4, x: 8 } },
];
const flap = { rest: { rotateX: 0 }, hover: { rotateX: -10 } };

// A preview sheet shows a real project from the folder: its title plus a few faux lines.
function Sheet({ project }) {
  return (
    <div>
      <p className="truncate font-mono text-[8px] uppercase tracking-wider text-[#888888]">{project.category}</p>
      <p className="mt-1 truncate text-[11px] font-semibold leading-tight text-[#111111]">{project.title}</p>
      <div className="mt-2.5 space-y-[5px]">
        <div className="h-[4px] w-[85%] rounded-[1px] bg-ghost" />
        <div className="h-[4px] w-[65%] rounded-[1px] bg-ghost" />
        <div className="h-[4px] w-[75%] rounded-[1px] bg-ghost" />
      </div>
    </div>
  );
}

function Folder({ cat, i, onOpen }) {
  const Icon = icons[cat.icon] || Layers;
  const [a, b] = cat.projects;
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.7, ease, delay: i * 0.08 }}>
      <motion.button
        type="button"
        onClick={() => onOpen(cat)}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        aria-label={`Open folder: ${cat.title}, ${cat.projects.length} projects`}
        className="relative block aspect-[1/0.86] w-full text-left outline-none [perspective:900px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <div className="absolute left-0 top-0 h-[22px] w-[42%] rounded-t-[8px] border border-b-0 border-folderEdge bg-card" />
        <div className="absolute inset-x-0 bottom-0 top-[20px] rounded-[10px] rounded-tl-none border border-line bg-card" />

        {[b || a, a].map((p, s) => (
          <motion.div
            key={s}
            variants={sheetV[s]}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute left-[11%] right-[11%] top-[13%] h-[56%] rounded-[4px] bg-white p-3 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
            style={{ zIndex: 1 + s }}
          >
            <Sheet project={p} />
          </motion.div>
        ))}

        <motion.div
          variants={flap}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          style={{ transformOrigin: '50% 100%', zIndex: 5 }}
          className="absolute inset-x-0 bottom-0 flex h-[66%] flex-col justify-between rounded-[10px] border border-line border-t-folderEdge bg-folder p-4 shadow-[0_-10px_24px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[17px] font-semibold leading-tight tracking-head text-white">{cat.title}</h3>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[4px] bg-white text-[#111111]">
              <Icon size={13} strokeWidth={2.2} />
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
            <span>{pad(cat.projects.length)} projects</span>
            <span className="flex items-center gap-1 text-white/80">Open folder <ArrowRight size={11} /></span>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

/* ---------- Modal: folder contents ⇄ project detail ---------- */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const up = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } } };
const Label = ({ children }) => <motion.p variants={up} className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{children}</motion.p>;

function FolderView({ cat, onPick }) {
  const Icon = icons[cat.icon] || Layers;
  return (
    <motion.div key="folder" variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}>
      <motion.div variants={up} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <span className="grid h-5 w-5 place-items-center rounded-[3px] bg-white text-[#111111]"><Icon size={11} strokeWidth={2.2} /></span>
        Folder · {pad(cat.projects.length)} projects
      </motion.div>
      <motion.h3 variants={up} id="pm-title" className="mt-3 pr-10 text-[30px] font-bold leading-tight tracking-head">{cat.title}</motion.h3>
      <motion.p variants={up} className="mt-2 text-[14px] text-muted">{cat.blurb}</motion.p>

      <ul className="mt-8 border-t border-line">
        {cat.projects.map((p, i) => (
          <motion.li key={p.id} variants={up} className="border-b border-line">
            <button
              type="button"
              onClick={() => onPick(p)}
              className="group grid w-full grid-cols-[28px_1fr_18px] items-baseline gap-3 px-2 py-4 text-left transition-colors duration-200 hover:bg-white"
            >
              <span className="font-mono text-[11px] text-muted group-hover:text-[#111111]">{pad(i + 1)}</span>
              <span>
                <span className="block text-[15px] font-semibold tracking-head text-white group-hover:text-[#111111]">{p.title}</span>
                <span className="mt-1 block text-[13px] leading-snug text-muted group-hover:text-[#111111]/70">{p.summary}</span>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-wider text-muted group-hover:text-[#111111]/60">{p.stack.slice(0, 4).join(' · ')}</span>
              </span>
              <ArrowRight size={15} className="self-center text-muted transition-transform group-hover:translate-x-1 group-hover:text-[#111111]" />
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectView({ p, cat, onBack }) {
  return (
    <motion.div key={p.id} variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}>
      <motion.button variants={up} type="button" onClick={onBack} className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-white">
        <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" /> {cat.title}
      </motion.button>
      <motion.p variants={up} className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{p.category}</motion.p>
      <motion.h3 variants={up} id="pm-title" className="mt-2 pr-10 text-[30px] font-bold leading-tight tracking-head">{p.title}</motion.h3>
      <motion.p variants={up} className="mt-4 text-[15px] leading-relaxed text-white/85">{p.summary}</motion.p>

      {p.role && (<><Label>My part</Label><motion.p variants={up} className="mt-2 text-[15px] text-white">{p.role}</motion.p></>)}

      {p.stages && (
        <>
          <Label>Pipeline</Label>
          <ol className="mt-3 border-t border-line">
            {p.stages.map(([k, v], i) => (
              <motion.li key={k} variants={up} className="grid grid-cols-[32px_1fr] gap-2 border-b border-line py-3 text-[14px]">
                <span className="font-mono text-muted">{pad(i + 1)}</span>
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
  );
}

function Modal({ cat, onClose }) {
  const [project, setProject] = useState(null);
  const close = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    close.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    // Esc steps back out of a project first, then closes the folder.
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (project) setProject(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  useEffect(() => { panel.current?.scrollTo({ top: 0 }); }, [project]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[#111111]/80 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="relative max-h-[90svh] w-full max-w-[720px] overflow-y-auto overflow-x-hidden rounded-t-[10px] border border-line bg-card p-6 sm:rounded-[8px] sm:p-10"
      >
        <button ref={close} onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-[4px] border border-line text-muted transition-colors hover:bg-white hover:text-[#111111]">
          <X size={16} />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          {project
            ? <ProjectView key={project.id} p={project} cat={cat} onBack={() => setProject(null)} />
            : <FolderView key="folder" cat={cat} onPick={setProject} />}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const total = categories.reduce((n, c) => n + c.projects.length, 0);
  return (
    <section id="projects" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <SectionTitle size={36}>Featured<br />Projects</SectionTitle>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={inView} transition={{ delay: 0.3, duration: 0.6 }} className="mt-4 max-w-[360px] text-[13px] leading-relaxed text-muted">
            {total} projects, filed by discipline. Open a folder to see what&apos;s inside.
          </motion.p>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="group flex shrink-0 items-center gap-1.5 text-[13px] text-white">
          GitHub <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => <Folder key={c.id} cat={c} i={i} onOpen={setOpen} />)}
      </div>

      <AnimatePresence>{open && <Modal cat={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
