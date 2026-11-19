import { motion } from 'framer-motion';
import { ArrowRight, Building2, Cpu, GraduationCap, Download } from 'lucide-react';
import { profile } from '../data';
import Magnetic from './Magnetic';

const icons = [GraduationCap, Cpu, Building2];
const spring = { type: 'spring', stiffness: 90, damping: 18 };

const col = (dir) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: dir === 'right' ? 0.15 : 0 } },
});
const item = (dir) => ({
  hidden: { opacity: 0, x: dir === 'left' ? -40 : 40, y: 12 },
  show: { opacity: 1, x: 0, y: 0, transition: spring },
});

export default function Intro() {
  return (
    <section id="about" className="relative mx-auto -mt-[30vh] max-w-7xl px-4 pb-32 pt-10 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div variants={col('left')} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }}>
          <motion.p variants={item('left')} className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            01 — About
          </motion.p>
          <motion.h2 variants={item('left')} className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
            Hi, I&apos;m Nadine.
          </motion.h2>
          <motion.p variants={item('left')} className="mt-5 max-w-md text-lg text-muted">
            {profile.role}
          </motion.p>
          <ul className="mt-10 space-y-3">
            {profile.affiliations.map((a, i) => {
              const Icon = icons[i];
              return (
                <motion.li
                  key={a}
                  variants={item('left')}
                  whileHover={{ x: 6 }}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-surface/60 px-4 py-3 transition-colors hover:border-white/20 hover:bg-raised"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-ink text-muted transition-colors group-hover:bg-white group-hover:text-ink">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm font-medium text-fg">{a}</span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div variants={col('right')} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} className="lg:pt-16">
          <motion.p variants={item('right')} className="text-xl leading-relaxed text-fg/90 sm:text-2xl sm:leading-relaxed">
            {profile.bio}
          </motion.p>
          <motion.div variants={item('right')} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
              >
                Explore projects
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href={`${import.meta.env.BASE_URL}${profile.cv}`}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-white/30 hover:bg-white/5"
              >
                <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
