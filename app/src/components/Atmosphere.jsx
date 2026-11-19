import { useEffect, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-white/70"
    />
  );
}

// Soft radial spotlight that trails the pointer. Desktop / fine pointers only.
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 300, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 40, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setEnabled(mq.matches && !reduce);
    if (!mq.matches || reduce) return;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[1] -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full"
    >
      <div className="h-full w-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 35%, transparent 65%)' }} />
    </motion.div>
  );
}
