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
 * Section headline that scrubs from scale 1.15 / y -400 to its resting place while the
 * section scrolls from the bottom of the viewport to about a quarter from the top.
 */
export function ScrubHeadline({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.27"] });
  const [shift, setShift] = useState(400);
  useEffect(() => {
    const update = () => setShift(window.innerWidth < 810 ? 160 : 400);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-shift, 0]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? { scale: 1, y: 0 } : { scale, y }}>{children}</motion.div>
    </div>
  );
}

/** Word-by-word reveal (opacity + 10px rise, staggered). */
export function WordReveal({ text, className, as = "h3" }: { text: string; className?: string; as?: "h2" | "h3" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const lines = text.split("\n");
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className}>
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </Plain>
    );
  }
  let index = 0;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((w) => {
            const i = index++;
            return (
              <motion.span
                key={`${w}-${i}`}
                className="inline-block"
                variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
                transition={{ ...SPRING, duration: 0.45, delay: i * 0.05 }}
              >
                {w}
                {"\u00a0"}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Words brighten one by one as the block scrolls through the viewport, as on the reference's story page. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  if (reduce)
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <HighlightWord key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </HighlightWord>
      ))}
    </p>
  );
}

function HighlightWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {children}{" "}
    </motion.span>
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
