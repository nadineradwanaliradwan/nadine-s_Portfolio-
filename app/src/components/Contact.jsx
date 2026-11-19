import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { profile } from '../data';
import { ease, inView } from './motion';

function copyText(t) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(t);
  const ta = Object.assign(document.createElement('textarea'), { value: t });
  document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
  return Promise.resolve();
}

function Field({ id, label, as = 'input', className = '', ...rest }) {
  const [focus, setFocus] = useState(false);
  const Tag = as;
  return (
    <label htmlFor={id} className={`block ${className}`}>
      <span className={`text-[13px] transition-colors ${focus ? 'text-white' : 'text-muted'}`}>{label}</span>
      <span className="relative mt-2 block">
        <Tag
          id={id}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="block w-full resize-none border-0 border-b border-input bg-transparent px-0 pb-2.5 pt-1 text-[15px] text-white outline-none placeholder:text-[#444444]"
          {...rest}
        />
        <motion.span aria-hidden initial={false} animate={{ scaleX: focus ? 1 : 0 }} transition={{ duration: 0.4, ease }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-white" />
      </span>
    </label>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [f, setF] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => { setF((s) => ({ ...s, [k]: e.target.value })); setSent(false); };
  const ready = f.name.trim() && f.msg.trim();

  const onCopy = async () => {
    try { await copyText(profile.email); } catch { /* clipboard blocked */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!ready) return;
    const subject = `Hello from ${f.name}`;
    const body = `${f.msg}\n\n— ${f.name}${f.email ? ` (${f.email})` : ''}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.7, ease }}>
          <h2 className="text-[44px] font-bold leading-none tracking-head">Let&apos;s talk.</h2>
          <p className="mt-5 max-w-[360px] text-[15px] leading-relaxed text-muted">
            Whether it&apos;s an engineering role or a collaborative project, my inbox is open.
          </p>

          <button type="button" onClick={onCopy} className="group mt-8 flex h-8 items-center gap-2 text-[15px] text-white" aria-label={`Copy ${profile.email}`}>
            <span className="border-b border-transparent transition-colors group-hover:border-white">{profile.email}</span>
            <span className="relative grid h-6 w-[72px] place-items-start overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="ok" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} className="flex h-6 items-center gap-1 font-mono text-[11px] text-white">
                    Copied <Check size={12} />
                  </motion.span>
                ) : (
                  <motion.span key="cp" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} className="flex h-6 items-center text-muted transition-colors group-hover:text-white">
                    <Copy size={14} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>

          <ul className="mt-8 flex gap-6 text-[14px]">
            {[['in', 'LinkedIn', profile.linkedin], ['gh', 'GitHub', profile.github]].map(([k, label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white">
                  <span className="grid h-5 w-5 place-items-center rounded-[3px] border border-line font-mono text-[9px] text-muted transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[#111111]">{k}</span>
                  <span className="relative">
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="grid gap-x-8 gap-y-9 sm:grid-cols-2"
        >
          <Field id="c-name" label="What should I call you?" placeholder="Your name" autoComplete="name" value={f.name} onChange={set('name')} />
          <Field id="c-email" label="Email address" type="email" placeholder="you@company.com" autoComplete="email" value={f.email} onChange={set('email')} />
          <Field id="c-msg" as="textarea" rows={3} label="What do you have in mind?" placeholder="A role, a project, a question…" value={f.msg} onChange={set('msg')} className="sm:col-span-2" />
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <motion.button
              type="submit"
              disabled={!ready}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-[4px] bg-white px-[18px] py-[10px] text-[14px] font-semibold text-[#111111] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create email draft <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.span key="s" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[13px] text-white">
                  <Check size={14} /> Draft opened in your mail app
                </motion.span>
              ) : !ready ? (
                <motion.span key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[12px] text-muted">
                  Add your name and a message.
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
