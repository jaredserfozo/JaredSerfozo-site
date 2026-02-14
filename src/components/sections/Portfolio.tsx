'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import FilterBar from '@/components/portfolio/FilterBar';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ProjectModal from '@/components/portfolio/ProjectModal';
import { projects } from '@/data/projects';
import type { Category, Project } from '@/types/project';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="work" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Work"
          subtitle="A selection of projects spanning storytelling, events, promotions, and more."
        />

        <FilterBar active={activeCategory} onChange={setActiveCategory} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
