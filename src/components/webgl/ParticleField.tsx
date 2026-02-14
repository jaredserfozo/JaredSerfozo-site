'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import ParticleSystem from './ParticleSystem';

export default function ParticleField() {
  const [count, setCount] = useState(2000);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Reduce particles on mobile
    if (window.innerWidth < 768) {
      setCount(800);
    }

    // Scroll-driven fade
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      setVisible(scrollY < vh * 1.2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ParticleSystem count={count} />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
