'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  gradient = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${className}`}
    >
      <h2
        className={`font-heading text-3xl font-bold md:text-5xl ${
          gradient ? 'gradient-text' : 'text-text-primary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">{subtitle}</p>
      )}
    </motion.div>
  );
}
