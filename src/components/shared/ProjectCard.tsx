"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [4, -4]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-4, 4]),
    springConfig,
  );

  const spotX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const spotY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const spotBackground = useTransform(
    [spotX, spotY],
    ([sx, sy]) =>
      `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.08), transparent 60%)`,
  );

  function handleMouse(event: React.MouseEvent) {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? {}
          : { rotateX, rotateY, transformPerspective: 800 }
      }
      className={`group relative cursor-pointer ${index % 2 === 1 ? "lg:mt-20" : ""}`}
    >
      <div className="border-border/50 relative aspect-[4/3] overflow-hidden rounded-xl border">
        {/* Gradient placeholder */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          style={{
            background: `linear-gradient(135deg, ${project.color}25, ${project.color}08 40%, ${project.color}15)`,
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Cursor light spot */}
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotBackground }}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/60 max-lg:bg-black/40" />

        {/* Project number */}
        <div className="absolute top-5 left-5">
          <span className="font-mono text-xs tracking-[0.08em] text-white/40 transition-colors duration-300 group-hover:text-white/70">
            {project.id}
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute top-5 right-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 opacity-0 transition-all duration-300 group-hover:border-white/30 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
          <span className="mb-1 font-mono text-[10px] tracking-[0.1em] text-white/70 uppercase transition-all duration-300 sm:text-xs lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            {project.category} — {project.year}
          </span>
          <h3 className="font-heading font-700 mb-1 text-base tracking-tight text-white transition-all duration-300 sm:mb-2 sm:text-xl md:text-2xl lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            {project.title}
          </h3>
          <p className="text-xs leading-relaxed text-white/75 transition-all duration-500 sm:text-sm lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
