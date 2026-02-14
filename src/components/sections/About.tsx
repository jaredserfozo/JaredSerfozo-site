'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="About" subtitle="The person behind the lens." />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-text-secondary">
              I&apos;m a Digital Media Consultant based in Atlanta, specializing in video
              production, live streaming, and creative storytelling. I&apos;ve worked
              with organizations ranging from startups to Fortune 500 companies, helping
              them tell their stories through compelling visual media.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              From producing promotional content and event recaps to managing live
              streams and building AI-driven media solutions, I bring a blend of
              technical expertise and creative vision to every project.
            </p>
          </motion.div>

          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-surface">
              <div className="flex h-full items-center justify-center text-text-secondary">
                <svg
                  className="h-24 w-24 opacity-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
