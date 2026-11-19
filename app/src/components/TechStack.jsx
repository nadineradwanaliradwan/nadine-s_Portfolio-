import { motion } from 'framer-motion';
import { stack } from '../data';
import SectionTitle from './SectionTitle';
import { ease, inView } from './motion';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } } };
const tagV = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } };

export default function TechStack() {
  return (
    <section id="skills" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
      <SectionTitle>Tech Stack</SectionTitle>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={inView}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        className="mt-5 h-px origin-left bg-line"
      />

      <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
        {stack.map((col, ci) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease, delay: ci * 0.1 }}
          >
            <h3 className="text-[16px] font-semibold text-white">{col.title}</h3>
            <p className="mt-1 text-[13px] text-muted">{col.subtitle}</p>
            <motion.ul variants={list} initial="hidden" whileInView="show" viewport={inView} className="mt-5 flex flex-wrap gap-2">
              {col.tags.map((t) => (
                <motion.li key={t.name} variants={tagV}>
                  <span
                    className={`inline-block cursor-default rounded-[3px] border px-3 py-1.5 text-[12px] transition-colors duration-200 ${
                      t.key
                        ? 'border-white bg-white font-semibold text-[#111111]'
                        : 'border-tagLine bg-tag text-tagText hover:border-white hover:bg-white hover:text-[#111111]'
                    }`}
                  >
                    {t.name}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
