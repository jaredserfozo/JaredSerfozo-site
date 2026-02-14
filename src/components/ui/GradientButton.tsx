'use client';

import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export default function GradientButton({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
}: GradientButtonProps) {
  const classes = `relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-8 py-3 font-heading text-sm font-medium text-bg transition-all hover:shadow-lg hover:shadow-accent/25 ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
