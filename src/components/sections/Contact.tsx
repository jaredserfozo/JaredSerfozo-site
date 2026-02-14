'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GradientButton from '@/components/ui/GradientButton';

interface FormData {
  name: string;
  email: string;
  message: string;
}

function FloatingInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="group relative">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        className="peer w-full rounded-lg border border-surface-hover bg-surface px-4 pb-2 pt-6 text-text-primary outline-none transition-colors focus:border-accent"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-2 text-xs text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind? Let's create something together."
          className="text-center"
        />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <FloatingInput label="Name" name="name" value={form.name} onChange={handleChange} />
          <FloatingInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <div className="group relative">
            <textarea
              name="message"
              id="message"
              value={form.message}
              onChange={handleChange}
              placeholder=" "
              required
              rows={5}
              className="peer w-full resize-none rounded-lg border border-surface-hover bg-surface px-4 pb-2 pt-6 text-text-primary outline-none transition-colors focus:border-accent"
            />
            <label
              htmlFor="message"
              className="pointer-events-none absolute left-4 top-2 text-xs text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
            >
              Message
            </label>
          </div>

          <div className="text-center">
            <GradientButton type="submit">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </GradientButton>
          </div>

          {status === 'sent' && (
            <p className="text-center text-sm text-accent">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-red-400">
              Something went wrong. Email me directly at{' '}
              <a href="mailto:jared@heytheremedia.com" className="underline">
                jared@heytheremedia.com
              </a>
            </p>
          )}
        </motion.form>

        {/* Social links */}
        <div className="mt-12 flex items-center justify-center gap-6">
          {[
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jaredserfozo/' },
            { label: 'Instagram', href: 'https://www.instagram.com/jaredserfozo/' },
            { label: 'YouTube', href: 'https://www.youtube.com/@jaredserfozo' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
