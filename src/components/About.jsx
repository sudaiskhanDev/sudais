"use client";

import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import {
  Sparkles,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Rocket,
} from "lucide-react";

/* ---------- Data ---------- */
const stats = [
  { value: 2, suffix: "+", label: "Years shipping" },
  { value: 4, suffix: "", label: "Full-stack apps" },
];

const focusAreas = [
  "LLM applications & prompt engineering",
  "RAG pipelines over private documents",
  "Embeddings & vector search",
  "Agentic workflows & automation",
  "Full-stack delivery with Next.js & MERN",
];

const techPills = [
  "Python", "OpenAI API", "LangChain", "RAG", "Vector DBs",
  "Node.js", "Express", "MongoDB", "Next.js", "React",
  "Tailwind", "FastAPI",
];

/* ---------- Variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

/* ---------- Animated Counter ---------- */
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  // Trigger animation when in view
  if (isInView && motionValue.get() === 0) {
    motionValue.set(value);
  }

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{displayValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

/* ---------- 3D Tilt Card ---------- */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, rgba(124,58,237,0.08), transparent 60%)`;

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}

/* ---------- Main Component ---------- */
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /* Parallax background */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.06, 0.12, 0.06]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      {/* ---- Animated Background Grid (Parallax) ---- */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          y: bgY,
        }}
      />

      {/* ---- Scroll-linked Accent Glow ---- */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      {/* ---- Floating Decorative Particles ---- */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-accent"
          style={{
            top: `${15 + i * 12}%`,
            left: `${10 + (i % 3) * 35}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ==================== HEADER ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-16 max-w-3xl"
        >
          {/* Section Label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-500 uppercase"
          >
            <motion.span
              className="h-px w-8 bg-stone-300"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            01 / About
          </motion.div>

          {/* Heading with Letter Animation */}
          <motion.h2
            variants={itemVariants}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-stone-900"
          >
            {"From notebooks to ".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.2 + i * 0.02,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span
              className="text-accent inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              production
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              .
            </motion.span>
          </motion.h2>

          {/* Sub-line */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-base md:text-lg text-stone-600 leading-relaxed"
          >
            I don't just train models — I ship them. Behind every interface I
            build is a working API, a deployed product, and a user who can
            actually reach it.
          </motion.p>
        </motion.div>

        {/* ==================== MAIN GRID ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ---------- LEFT: Bio & Tech ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Bio Paragraphs */}
            {[
              "I'm an AI/ML engineer working on applied LLM applications — retrieval-augmented generation over private documents, prompt engineering, and AI-powered workflow automation. My work is in Python, using the OpenAI API and modern LLM tooling.",
              "What separates me from most people entering AI: I already know how to ship. Over the past two years I've delivered production web applications as a freelance full-stack developer — React and Next.js front-ends, Node.js and Express APIs, MongoDB data layers. During a full-stack internship at SkillifyZone, I built four complete applications from scratch.",
              "A model is only useful when it's behind a working API, inside a real interface, deployed where users can reach it. Most AI work fails at exactly that step. Mine doesn't — because building and deploying applications is what I've been doing for two years.",
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={itemVariants}
                className="text-base md:text-lg text-stone-700 leading-relaxed"
              >
                {text}
              </motion.p>
            ))}

            {/* Tech Pills with Advanced Entrance */}
            <motion.div variants={itemVariants} className="mt-4">
              <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {techPills.map((pill, i) => (
                  <motion.span
                    key={pill}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0, y: 0 } : {}}
                    transition={{
                      delay: 0.4 + i * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                      rotate: 2,
                      transition: { type: "spring", stiffness: 400, damping: 15 },
                    }}
                    className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent cursor-default"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT: Cards ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Stats Card with Animated Counters */}
            <motion.div variants={itemVariants}>
              <TiltCard className="group">
                <div className="rounded-3xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white p-6 shadow-soft">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">
                          <Counter value={s.value} suffix={s.suffix} />
                        </div>
                        <div className="mt-1 text-xs text-stone-500 leading-tight">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Focus Card (Dark) with Interactive List */}
            <motion.div variants={itemVariants}>
              <TiltCard className="group">
                <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-900 p-6 text-white shadow-soft">
                  {/* Inner Glow */}
                  <motion.div
                    className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-2xl"
                    style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50">
                      <Sparkles size={12} className="text-accent" />
                      Currently focused on
                    </div>

                    <ul className="mt-5 flex flex-col gap-3">
                      {focusAreas.map((area, i) => (
                        <motion.li
                          key={area}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                          whileHover={{ x: 6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                          className="flex items-start gap-3 text-sm leading-relaxed text-white/85 cursor-default"
                        >
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                          {area}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
              {[
                { icon: GraduationCap, color: "bg-accent/10 text-accent", title: "BS Mathematics & Computer Science", subtitle: "NUN · 2023 — 2027" },
                { icon: MapPin, color: "bg-emerald-50 text-emerald-600", title: "Nowshera, Khyber Pakhtunkhwa", subtitle: "Open to remote & on-site roles" },
                { icon: Rocket, color: "bg-blue-50 text-blue-600", title: "Available for AI Engineer roles", subtitle: "Internship or full-time" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 8, borderColor: "#7C3AED" }}
                    className="group flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 transition-colors"
                  >
                    <motion.div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Icon size={18} />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-stone-900">{item.title}</div>
                      <div className="text-xs text-stone-500">{item.subtitle}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}