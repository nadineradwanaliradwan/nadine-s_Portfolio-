import { AnimatePresence, motion } from 'framer-motion';
import { projects, stack } from '../data';
import { SectionHeading } from './Reveal';

function SkillUsage({ skill }) {
  const used = projects.filter((p) => p.stack.includes(skill)).map((p) => p.title);
  if (!used.length) return <span><span className="text-fg">{skill}</span> — used outside the featured projects.</span>;
  return (
    <span>
      <span className="text-fg">{skill}</span> → {used.join(' · ')}
    </span>
  );
}

const list = { hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.15 } } };
const chip = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export default function TechStack({ activeSkill, setActiveSkill }) {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading kicker="02 — Skills">Tech Stack</SectionHeading>
        <div className="h-10 max-w-sm font-mono text-xs text-muted" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeSkill || 'hint'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {activeSkill ? <SkillUsage skill={activeSkill} /> : 'Hover a skill to see where it was used.'}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {stack.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: gi * 0.1 }}
            className="rounded-2xl border border-line bg-surface/50 p-6 transition-colors hover:border-white/15"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{group.title}</h3>
              <span className="font-mono text-[11px] text-muted">0{gi + 1}</span>
            </div>
            <motion.ul variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="flex flex-wrap gap-2">
              {group.items.map((s) => {
                const on = activeSkill === s;
                return (
                  <motion.li key={s} variants={chip}>
                    <motion.button
                      type="button"
                      onPointerEnter={() => setActiveSkill(s)}
                      onPointerLeave={() => setActiveSkill(null)}
                      onFocus={() => setActiveSkill(s)}
                      onBlur={() => setActiveSkill(null)}
                      onClick={() => setActiveSkill(on ? null : s)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                        on ? 'border-white bg-white text-ink' : 'border-line bg-raised text-fg/85 hover:border-white hover:bg-white hover:text-ink'
                      }`}
                    >
                      {s}
                    </motion.button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
