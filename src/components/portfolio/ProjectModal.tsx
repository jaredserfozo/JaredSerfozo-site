'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoEmbed from './VideoEmbed';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-surface shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-bg/60 text-text-primary backdrop-blur transition-colors hover:bg-bg/80"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video or external link content */}
            {project.videoProvider !== 'link' ? (
              <div className="w-full">
                <VideoEmbed
                  provider={project.videoProvider}
                  videoId={project.videoId}
                  title={project.title}
                />
              </div>
            ) : project.thumbnailUrl ? (
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}

            {/* Info */}
            <div className="p-6">
              <h3 className="font-heading text-xl font-bold text-text-primary md:text-2xl">
                {project.title}
              </h3>
              <span className="mt-2 inline-block rounded-full bg-surface-hover px-3 py-1 text-xs text-text-secondary">
                {project.category}
              </span>
              {project.description && (
                <p className="mt-4 text-text-secondary">{project.description}</p>
              )}
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-6 py-2 text-sm font-medium text-bg transition-shadow hover:shadow-lg hover:shadow-accent/25"
                >
                  View Project
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
