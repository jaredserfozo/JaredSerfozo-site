'use client';

import dynamic from 'next/dynamic';
import AnimatedText from '@/components/ui/AnimatedText';
import GradientButton from '@/components/ui/GradientButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ParticleField = dynamic(() => import('@/components/webgl/ParticleField'), {
  ssr: false,
});

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {!reduced && <ParticleField />}

      <div className="relative z-10 px-6 text-center">
        <h1 className="font-heading text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
          <AnimatedText text="Jared Serfozo" className="gradient-text" />
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary md:text-xl">
          <AnimatedText text="Digital Media Consultant" delay={0.6} />
        </p>
        <div className="mt-10">
          <GradientButton href="#work">View My Work</GradientButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-text-secondary/30 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
}
