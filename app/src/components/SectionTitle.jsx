import { motion } from 'framer-motion';
import { ease, inView } from './motion';

export default function SectionTitle({ children, size = 32, className = '' }) {
  return (
    <div className={className}>
      <div className="overflow-hidden pb-1">
        <motion.h2
          initial={{ y: '105%' }}
          whileInView={{ y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease }}
          style={{ fontSize: size }}
          className="font-bold leading-[1.05] tracking-head text-white"
        >
          {children}
        </motion.h2>
      </div>
    </div>
  );
}
