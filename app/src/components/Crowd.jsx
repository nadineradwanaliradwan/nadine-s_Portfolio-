import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

// Deterministic PRNG so the crowd looks the same on every render/visit.
function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const INK = '#0E0E10';
const PAPER = '#F2F1EC';
const S = { stroke: INK, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

// One line-art figure, drawn upward from (0,0) = bottom centre.
function Person({ f }) {
  const { h, bw, r, hair, acc, face } = f;
  const top = -(h - r * 2 - 6); // shoulder line
  const sr = Math.min(18, bw * 0.7); // shoulder roundness
  const hy = top - 6 - r; // head centre y
  const body = `M ${-bw} 4 L ${-bw} ${top + sr} Q ${-bw} ${top} ${-bw + sr} ${top} L ${bw - sr} ${top} Q ${bw} ${top} ${bw} ${top + sr} L ${bw} 4`;

  return (
    <>
      <path d={body} fill={PAPER} {...S} />
      {hair === 'hijab' && (
        <path
          d={`M ${-r * 1.9} ${top + 4} Q ${-r * 1.6} ${hy - r * 1.6} 0 ${hy - r * 1.35} Q ${r * 1.6} ${hy - r * 1.6} ${r * 1.9} ${top + 4} Z`}
          fill={PAPER}
          {...S}
        />
      )}
      {hair !== 'hijab' && <line x1={0} y1={top} x2={0} y2={hy + r} {...S} />}
      {hair === 'long' && (
        <path d={`M ${-r * 1.15} ${top + 10} Q ${-r * 1.35} ${hy - r * 1.3} 0 ${hy - r * 1.15} Q ${r * 1.35} ${hy - r * 1.3} ${r * 1.15} ${top + 10}`} fill={PAPER} {...S} />
      )}
      <circle cx={0} cy={hy} r={r} fill={PAPER} {...S} />
      {hair === 'short' && <path d={`M ${-r} ${hy - 1} Q ${-r * 0.9} ${hy - r * 1.25} 0 ${hy - r} Q ${r * 0.9} ${hy - r * 1.25} ${r} ${hy - 1}`} fill={INK} {...S} />}
      {hair === 'bun' && (
        <>
          <circle cx={0} cy={hy - r * 1.25} r={r * 0.42} fill={INK} {...S} />
          <path d={`M ${-r} ${hy} Q 0 ${hy - r * 1.5} ${r} ${hy}`} fill="none" {...S} />
        </>
      )}
      {hair === 'curly' && [-0.7, -0.25, 0.25, 0.7].map((dx, i) => <circle key={i} cx={dx * r} cy={hy - r * 0.85} r={r * 0.36} fill={INK} {...S} />)}
      {hair === 'cap' && (
        <>
          <path d={`M ${-r} ${hy - 2} Q 0 ${hy - r * 1.6} ${r} ${hy - 2} Z`} fill={INK} {...S} />
          <line x1={r * 0.3} y1={hy - 2} x2={r * 1.7} y2={hy - 1} {...S} />
        </>
      )}
      {/* face */}
      {face && (
        <>
          <circle cx={-r * 0.35} cy={hy - r * 0.05} r={1.2} fill={INK} />
          <circle cx={r * 0.35} cy={hy - r * 0.05} r={1.2} fill={INK} />
          <path d={`M ${-r * 0.3} ${hy + r * 0.38} Q 0 ${hy + r * 0.6} ${r * 0.3} ${hy + r * 0.38}`} fill="none" {...S} strokeWidth={1.4} />
        </>
      )}
      {acc === 'glasses' && (
        <>
          <circle cx={-r * 0.38} cy={hy} r={r * 0.28} fill="none" {...S} strokeWidth={1.4} />
          <circle cx={r * 0.38} cy={hy} r={r * 0.28} fill="none" {...S} strokeWidth={1.4} />
        </>
      )}
      {acc === 'headphones' && <path d={`M ${-r * 1.05} ${hy + 3} Q 0 ${hy - r * 1.9} ${r * 1.05} ${hy + 3}`} fill="none" {...S} strokeWidth={2.4} />}
      {acc === 'lanyard' && <path d={`M ${-bw * 0.35} ${top} L 0 ${top + 26} L ${bw * 0.35} ${top}`} fill="none" {...S} strokeWidth={1.4} />}
      {acc === 'laptop' && (
        <>
          <rect x={-bw * 0.75} y={top + 22} width={bw * 1.5} height={bw * 0.95} rx={3} fill={PAPER} {...S} />
          <circle cx={0} cy={top + 22 + bw * 0.47} r={2} fill={INK} />
        </>
      )}
      {acc === 'coffee' && (
        <>
          <path d={`M ${bw * 0.2} ${top + 30} L ${bw * 0.28} ${top + 50} L ${bw * 0.62} ${top + 50} L ${bw * 0.7} ${top + 30} Z`} fill={PAPER} {...S} />
          <line x1={bw * 0.15} y1={top + 30} x2={bw * 0.75} y2={top + 30} {...S} />
        </>
      )}
    </>
  );
}

const HAIR = ['short', 'hijab', 'long', 'bun', 'curly', 'cap', 'short', 'hijab', 'long'];
const ACC = [null, 'glasses', null, 'laptop', 'headphones', null, 'lanyard', 'coffee', null];

function makeCrowd(seed, count, width) {
  const rnd = mulberry32(seed);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const step = width / count;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: step * (i + 0.5) + (rnd() - 0.5) * step * 0.4,
    h: 140 + rnd() * 70,
    bw: 24 + rnd() * 14,
    r: 13 + rnd() * 4,
    hair: pick(HAIR),
    acc: pick(ACC),
    face: rnd() > 0.35,
    d: 3 + rnd() * 2.5,
    delay: -rnd() * 4,
    a: 0.6 + rnd() * 1.2,
  }));
}

function Crowd() {
  const W = 1440;
  const H = 220;
  const back = useMemo(() => makeCrowd(7, 26, W), []);
  const front = useMemo(() => makeCrowd(21, 20, W), []);

  const row = (people, scale, yOff, delayBase) =>
    people.map((f, i) => (
      <g key={`${delayBase}-${f.id}`} transform={`translate(${f.x} ${H + yOff}) scale(${scale})`}>
        <motion.g
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 90, damping: 14, delay: delayBase + i * 0.025 }}
        >
          <g className="sway" style={{ '--d': `${f.d}s`, '--delay': `${f.delay}s`, '--a': `${f.a}deg` }}>
            <Person f={f} />
          </g>
        </motion.g>
      </g>
    ));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="block h-[150px] w-full sm:h-[200px] lg:h-[230px]" role="img" aria-label="Line-art illustration of a crowd of people">
      {row(back, 0.78, 0, 0)}
      {row(front, 1, 30, 0.25)}
    </svg>
  );
}

export default memo(Crowd);
