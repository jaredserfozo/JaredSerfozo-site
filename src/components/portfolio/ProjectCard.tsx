'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTiltEffect } from '@/hooks/useTiltEffect';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useTiltEffect<HTMLDivElement>();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="card-glow group cursor-pointer overflow-hidden rounded-xl bg-surface transition-[transform] duration-200 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {/* Hover icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 text-bg">
              {project.externalUrl ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              ) : (
                <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-heading text-sm font-medium leading-tight text-text-primary line-clamp-2">
            {project.title}
          </h3>
          <span className="mt-2 inline-block rounded-full bg-surface-hover px-3 py-0.5 text-xs text-text-secondary">
            {project.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
