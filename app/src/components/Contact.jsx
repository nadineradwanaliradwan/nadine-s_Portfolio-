import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { profile } from '../data';
import Magnetic from './Magnetic';
import { ease } from './Reveal';

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
  return Promise.resolve();
}

function Field({ label, id, as = 'input', ...props }) {
  const [focus, setFocus] = useState(false);
  const Tag = as;
  return (
    <label htmlFor={id} className="block">
      <span className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${focus ? 'text-fg' : 'text-muted'}`}>{label}</span>
      <div className="relative mt-2">
        <Tag
          id={id}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="w-full resize-none border-b border-line bg-transparent pb-3 text-lg text-fg outline-none placeholder:text-white/20"
          {...props}
        />
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: focus ? 1 : 0 }}
          transition={{ duration: 0.45, ease }}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-white"
        />
      </div>
    </label>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setSent(false); };

  const subject = form.name ? `Hello from ${form.name}` : 'Hello Nadine';
  const body = useMemo(
    () => `${form.msg || '…'}\n\n— ${form.name || 'Your name'}${form.email ? ` (${form.email})` : ''}`,
    [form]
  );
  const ready = form.name.trim() && form.msg.trim();

  const onCopy = async () => {
    try { await copyText(profile.email); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!ready) return;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const socials = [
    { label: 'GitHub', href: profile.github, Icon: Github },
    { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">05 — Contact</p>
          <div className="overflow-hidden pb-2">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="font-display text-6xl font-bold tracking-tight sm:text-8xl"
            >
              Let&apos;s talk.
            </motion.h2>
          </div>
          <p className="mt-6 max-w-sm text-muted">
            Open to software engineering internships and entry-level roles — also embedded, AI/ML and data.
          </p>

          <Magnetic strength={0.15} className="mt-10">
            <button
              type="button"
              onClick={onCopy}
              className="group relative flex h-14 min-w-[280px] items-center gap-3 overflow-hidden rounded-full border border-line bg-surface pl-5 pr-6 text-left transition-colors hover:border-white/30"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="ok" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-3 text-sm font-medium text-emerald-300">
                    <Check size={16} /> Copied to clipboard ✓
                  </motion.span>
                ) : (
                  <motion.span key="mail" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-3 text-sm text-fg">
                    <Mail size={16} className="text-muted" />
                    {profile.email}
                    <Copy size={14} className="text-muted transition-colors group-hover:text-fg" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </Magnetic>

          <ul className="mt-8 flex gap-3">
            {socials.map(({ label, href, Icon }, i) => (
              <motion.li key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-fg/85 transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink"
                >
                  <Icon size={15} /> {label}
                  <ArrowUpRight size={13} className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          className="rounded-3xl border border-line bg-surface/50 p-6 sm:p-10"
        >
          <div className="space-y-8">
            <Field id="c-name" label="What should I call you?" placeholder="Your name" value={form.name} onChange={set('name')} autoComplete="name" />
            <Field id="c-email" label="Email address" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} autoComplete="email" />
            <Field id="c-msg" as="textarea" rows={3} label="What do you have in mind?" placeholder="A role, a project, a question…" value={form.msg} onChange={set('msg')} />
          </div>

          {/* Live draft preview */}
          <div className="mt-8 rounded-2xl border border-dashed border-line bg-ink/60 p-4 font-mono text-xs leading-relaxed text-muted">
            <p><span className="text-white/40">to:</span> {profile.email}</p>
            <p><span className="text-white/40">subject:</span> <span className="text-fg">{subject}</span></p>
            <p className="mt-2 line-clamp-3 whitespace-pre-line text-fg/70">{body}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <motion.button
                type="submit"
                disabled={!ready}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
              >
                Create email draft
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Magnetic>
            <AnimatePresence>
              {sent && (
                <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-emerald-300">
                  <Check size={15} /> Draft opened in your mail app
                </motion.span>
              )}
              {!ready && !sent && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-muted">
                  Add your name and a message to continue.
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
