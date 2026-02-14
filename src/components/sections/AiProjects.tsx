'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import SectionHeading from '@/components/ui/SectionHeading';

const DataStream = dynamic(() => import('@/components/webgl/DataStream'), {
  ssr: false,
});

interface AiProject {
  title: string;
  description: string;
  tags: string[];
}

const aiProjects: AiProject[] = [
  {
    title: 'AI-Powered Video Analysis',
    description:
      'Leveraging computer vision and machine learning to analyze video content, automatically generate highlights, and optimize editing workflows.',
    tags: ['Computer Vision', 'Python', 'FFmpeg', 'ML'],
  },
  {
    title: 'Automated Content Pipeline',
    description:
      'Building intelligent pipelines that use AI to repurpose long-form video content into social media clips, thumbnails, and transcriptions.',
    tags: ['Automation', 'NLP', 'API Integration', 'Node.js'],
  },
  {
    title: 'Interactive Media Experiences',
    description:
      'Exploring the intersection of AI and interactive media to create personalized viewing experiences and data-driven storytelling.',
    tags: ['WebGL', 'React', 'Real-time', 'Generative AI'],
  },
];

export default function AiProjects() {
  return (
    <>
      {/* Data Stream Divider */}
      <DataStream />

      <section id="ai" className="bg-ai-bg px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="AI Projects"
            subtitle="Exploring the future of media through artificial intelligence."
            gradient
          />

          <div className="space-y-8">
            {aiProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="card-glow flex flex-col gap-6 rounded-2xl bg-surface p-6 md:flex-row md:items-center md:p-8"
              >
                {/* Icon area */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-secondary/20 to-accent/20">
                  <svg
                    className="h-10 w-10 text-accent-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-text-secondary">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent-secondary/10 px-3 py-1 font-mono text-xs text-accent-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
