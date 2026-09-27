"use client";

import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Lenis from "lenis";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { setLenis } from "@/lib/smooth-scroll";
import { useReducedMotion } from "./use-reduced-motion";

/** Framer's most common preset on the reference: spring, bounce 0.2, 0.4s. */
export const SPRING = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

/** Lenis with the reference's Framer Smooth Scroll settings (intensity 10 → duration 1s). */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1, autoRaf: true });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);
  return null;
}

type AppearProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  amount?: number;
  as?: "div" | "li" | "article";
  id?: string;
};

/** Fades a block in once it enters the viewport, like Framer's appear effect. */
export function Appear({ children, className, delay = 0, y = 0, scale = 1, amount = 0.25, as = "div", id }: AppearProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }
  return (
    <Comp
      id={id}
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </Comp>
  );
}

/**
 * Section headline that settles into place as its section scrolls in. The reference moves it
 * from scale 1.15 / y -400px; the PayKaro brief (s7) rules out motion that slows reading, so the
 * travel is short enough that the headline is legible from the first frame it is on screen.
 */
export function ScrubHeadline({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.45"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? { scale: 1, y: 0 } : { scale, y }}>{children}</motion.div>
    </div>
  );
}

/** Counts up from 0 when it enters the viewport. */
export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);
  return (
    <span ref={ref} className={className}>
      {reduce || value === 0 ? value : display}
    </span>
  );
}

/** Horizontal drift tied to scroll position, used by the logo tickers. */
export function ScrollDrift({ children, className, distance = 300 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={reduce ? { x: 0 } : { x }} className="flex w-max">
        {children}
      </motion.div>
    </div>
  );
}

/** Background that zooms from 1.6 to 1 as its section scrolls through. */
export function useSectionZoom(target: React.RefObject<HTMLElement | null>): MotionValue<number> | number {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.6, 1]);
  return reduce ? 1 : scale;
}
