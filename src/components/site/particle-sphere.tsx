"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Rotating dotted sphere drawn on canvas. Colour comes from a CSS custom property. */
export function ParticleSphere({
  className,
  colorVar = "--ink",
  count = 1100,
  dot = 1.3,
  speed = 0.12,
  dashes = false,
}: {
  className?: string;
  colorVar?: string;
  count?: number;
  dot?: number;
  speed?: number;
  dashes?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    let raf = 0;
    let visible = false;
    let angle = 0;
    let last = performance.now();

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const color = getComputedStyle(canvas).getPropertyValue(colorVar).trim() || "#171717";
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      const R = Math.min(w, h * 2) / 2 - 2;
      const cx = w / 2;
      const cy = h;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      for (const [x, y, z] of pts) {
        const rx = x * cos - z * sin;
        const rz = x * sin + z * cos;
        if (rz < -0.15) continue;
        const px = cx + rx * R;
        const py = cy - y * R * (h > w / 2 ? 1 : h / (w / 2));
        const depth = (rz + 1) / 2;
        ctx.globalAlpha = 0.15 + depth * 0.85;
        if (dashes) {
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px - 2.5, py + 1.5);
          ctx.lineTo(px + 2.5, py - 1.5);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(px, py, dot * (0.5 + depth * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      angle += ((now - last) / 1000) * speed;
      last = now;
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else draw();
    });
    io.observe(canvas);
    draw();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [colorVar, count, dot, speed, dashes]);

  return <canvas ref={ref} aria-hidden="true" className={cn("block", className)} />;
}
