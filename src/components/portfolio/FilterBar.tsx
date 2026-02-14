'use client';

import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import type { Category } from '@/types/project';

interface FilterBarProps {
  active: Category | 'All';
  onChange: (cat: Category | 'All') => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.label)}
          className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            active === cat.label
              ? 'text-bg'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {active === cat.label && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
