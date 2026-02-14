'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Simple Perlin-like noise
function noise3D(x: number, y: number, z: number): number {
  const p = x * 0.8 + y * 1.2 + z * 0.5;
  return Math.sin(p * 1.5) * Math.cos(y * 2.1 + z) * Math.sin(z * 1.3 + x);
}

interface ParticleSystemProps {
  count: number;
}

export default function ParticleSystem({ count }: ParticleSystemProps) {
  const points = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const { positions, velocities, initialPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 12;
      pos[i3 + 2] = (Math.random() - 0.5) * 8;
      init[i3] = pos[i3];
      init[i3 + 1] = pos[i3 + 1];
      init[i3 + 2] = pos[i3 + 2];
      vel[i3] = 0;
      vel[i3 + 1] = 0;
      vel[i3 + 2] = 0;
    }

    return { positions: pos, velocities: vel, initialPositions: init };
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  // Track mouse
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    const geo = points.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime * 0.3;
    const mx = mousePos.current.x * viewport.width * 0.5;
    const my = mousePos.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Perlin noise velocity field
      const nx = noise3D(pos[i3] * 0.1, pos[i3 + 1] * 0.1, time) * 0.01;
      const ny = noise3D(pos[i3 + 1] * 0.1, pos[i3 + 2] * 0.1, time + 100) * 0.01;
      const nz = noise3D(pos[i3 + 2] * 0.1, pos[i3] * 0.1, time + 200) * 0.005;

      velocities[i3] += nx;
      velocities[i3 + 1] += ny;
      velocities[i3 + 2] += nz;

      // Mouse repulsion
      const dx = pos[i3] - mx;
      const dy = pos[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulsionRadius = 2.5;

      if (dist < repulsionRadius && dist > 0) {
        const force = (1 - dist / repulsionRadius) * 0.03;
        velocities[i3] += (dx / dist) * force;
        velocities[i3 + 1] += (dy / dist) * force;
      }

      // Spring back to initial position
      velocities[i3] += (initialPositions[i3] - pos[i3]) * 0.001;
      velocities[i3 + 1] += (initialPositions[i3 + 1] - pos[i3 + 1]) * 0.001;
      velocities[i3 + 2] += (initialPositions[i3 + 2] - pos[i3 + 2]) * 0.001;

      // Damping
      velocities[i3] *= 0.96;
      velocities[i3 + 1] *= 0.96;
      velocities[i3 + 2] *= 0.96;

      // Apply velocity
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];
    }

    geo.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#00D4FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
