import { motion } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1];

// Section heading with a masked rise and an underline that draws on view.
export function SectionHeading({ children, kicker, className = '' }) {
  return (
    <div className={className}>
      {kicker && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"
        >
          {kicker}
        </motion.p>
      )}
      <div className="overflow-hidden pb-1">
        <motion.h2
          initial={{ y: '105%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-6xl"
        >
          {children}
        </motion.h2>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease, delay: 0.25 }}
        className="mt-4 h-px w-24 origin-left bg-white/40"
      />
    </div>
  );
}
