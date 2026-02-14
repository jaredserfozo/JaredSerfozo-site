'use client';

import { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const nodes: Node[] = [];
    const nodeCount = 40;
    const connectionDist = 120;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    resize();
    initNodes();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
        } else {
          cancelAnimationFrame(animRef.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = 1 - dist / connectionDist;
            const gradient = ctx!.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha * 0.3})`);
            gradient.addColorStop(1, `rgba(0, 212, 255, ${alpha * 0.3})`);
            ctx!.strokeStyle = gradient;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const gradient = ctx!.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, 3
        );
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-32 w-full md:h-48"
      style={{ display: 'block' }}
    />
  );
}
