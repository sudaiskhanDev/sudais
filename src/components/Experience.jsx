"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

/* ---------- Data ---------- */
const experiences = [
  {
    type: "work",
    role: "Freelance AI & Full-Stack Developer",
    company: "Self-employed",
    location: "Remote",
    period: "2024 — Present",
    ongoing: true,
    description:
      "Delivering production web applications end-to-end — from scoping and design to deployment. Building AI features (RAG, LLM integrations) alongside full-stack delivery in React, Next.js, Node.js, and MongoDB.",
    highlights: [
      "Shipped multiple client projects solo from brief to deployment",
      "Integrated OpenAI APIs and RAG pipelines into real products",
      "Handled everything: frontend, backend, database, and hosting",
    ],
    tags: ["Python", "Next.js", "Node.js", "MongoDB", "OpenAI"],
  },
  {
    type: "work",
    role: "Full Stack Developer",
    company: "SkillifyZone",
    location: "Internship",
    period: "July 2025",
    ongoing: false,
    description:
      "Built four complete full-stack applications from scratch during a focused internship. Designed responsive React frontends, developed Express.js APIs, and structured MongoDB schemas for efficient data retrieval.",
    highlights: [
      "Delivered four production-grade applications in one month",
      "Designed RESTful APIs with Express.js middleware chains",
      "Built responsive UIs in React integrated with live APIs",
    ],
    tags: ["React", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    type: "education",
    role: "BS Computer Science",
    company: "NUN",
    location: "Pakistan",
    period: "2023 — 2027",
    ongoing: true,
    description:
      "Pursuing a Bachelor's degree in Mathematics and Computer Science while building professionally. Coursework spans algorithms, data structures, linear algebra, and machine learning fundamentals.",
    highlights: [
      "Building real products alongside academic study",
      "Focus on applied mathematics and computer science theory",
    ],
    tags: ["Algorithms", "Mathematics", "CS Fundamentals"],
  },
];

/* ---------- Variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------- Timeline Card ---------- */
function TimelineCard({ exp, index, isInView }) {
  const Icon = exp.type === "work" ? Briefcase : GraduationCap;
  const isLeft = index % 2 === 0; // alternate sides on desktop

  return (
    <div
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.9,
          delay: 0.2 + index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full md:w-[calc(50%-3rem)]"
      >
        <div className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 md:p-8 shadow-soft transition-all duration-500 hover:border-accent/30 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.15)]">
          {/* Soft glow on hover */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-accent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20" />

          <div className="relative">
            {/* Top row — icon + meta */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    exp.type === "work"
                      ? "bg-accent/10 text-accent"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                </motion.div>

                {exp.ongoing && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-700">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    {exp.type === "work" ? "Current" : "Ongoing"}
                  </span>
                )}
              </div>

              {/* Period */}
              <div className="flex items-center gap-1.5 text-xs font-mono text-stone-500">
                <Calendar size={12} />
                {exp.period}
              </div>
            </div>

            {/* Role + company */}
            <h3 className="mt-5 text-xl md:text-2xl font-semibold tracking-tight text-stone-900">
              {exp.role}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500">
              <span className="font-medium text-stone-700">{exp.company}</span>
              <span className="h-1 w-1 rounded-full bg-stone-300" />
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} />
                {exp.location}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm md:text-base text-stone-600 leading-relaxed">
              {exp.description}
            </p>

            {/* Highlights */}
            <ul className="mt-5 flex flex-col gap-2">
              {exp.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.5 + index * 0.15 + i * 0.08,
                    duration: 0.4,
                  }}
                  className="flex items-start gap-2.5 text-xs md:text-sm text-stone-600 leading-relaxed"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </motion.li>
              ))}
            </ul>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-stone-100 px-2 py-1 text-[11px] font-medium text-stone-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Empty spacer for the other side */}
      <div className="hidden md:block md:w-[calc(50%-3rem)]" />
    </div>
  );
}

/* ---------- Timeline Dot ---------- */
function TimelineDot({ index, isInView, isActive }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.15,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10"
    >
      <div className="relative">
        {/* Pulse ring for active */}
        {isActive && (
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* Dot */}
        <div
          className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${
            isActive
              ? "border-accent bg-accent"
              : "border-stone-300 bg-white"
          }`}
        >
          {isActive && (
            <span className="h-1 w-1 rounded-full bg-white" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Main Component ---------- */
export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll-linked timeline line fill
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 20%", "end 70%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative bg-[#FAFAF9] py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(#0A0A0A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ==================== HEADER ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-20 max-w-3xl"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-500 uppercase"
          >
            <motion.span
              className="h-px w-8 bg-stone-300"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            04 / Experience
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-stone-900"
          >
            A timeline of{" "}
            <span className="text-accent">building</span> things.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base md:text-lg text-stone-600 leading-relaxed"
          >
            Two years of shipping — freelance, internships, and ongoing
            education. Every entry here has produced something real.
          </motion.p>
        </motion.div>

        {/* ==================== TIMELINE ==================== */}
        <div ref={timelineRef} className="relative">
          {/* Base timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-stone-200" />

          {/* Filled timeline line (grows with scroll) */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent via-accent to-accent/40 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Entries */}
          <div className="flex flex-col gap-16 md:gap-24">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <TimelineDot
                  index={index}
                  isInView={isInView}
                  isActive={exp.ongoing}
                />
                <TimelineCard exp={exp} index={index} isInView={isInView} />
              </div>
            ))}
          </div>
        </div>

        {/* ==================== BOTTOM CTA ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-20 flex justify-center"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-stone-800"
          >
            <span>Download full resume</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent transition-transform group-hover:rotate-45">
              <ArrowUpRight size={12} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}