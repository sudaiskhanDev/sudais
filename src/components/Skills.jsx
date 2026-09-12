"use client";

import { motion, useInView, useScroll, useTransform, useMotionValue, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import {
  Brain,
  Server,
  Monitor,
  Wrench,
  Sparkles,
} from "lucide-react";

/* ---------- Data ---------- */
const marqueeRow1 = [
  "Python", "OpenAI API", "LangChain", "RAG", "Embeddings", "Vector DBs",
  "Prompt Engineering", "NLP", "Pandas", "NumPy", "FastAPI",
];

const marqueeRow2 = [
  "Next.js", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS",
  "JavaScript", "REST APIs", "Git", "GitHub", "Vercel", "Figma",
];

const categories = [
  {
    title: "AI / ML",
    icon: Brain,
    accent: "from-violet-500/10 to-violet-500/0",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    skills: [
      "Python", "OpenAI API", "Prompt Engineering",
      "RAG Pipelines", "Embeddings", "Vector Search",
      "NLP Fundamentals", "Pandas", "NumPy",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    accent: "from-emerald-500/10 to-emerald-500/0",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    skills: [
      "Node.js", "Express.js", "REST APIs",
      "MongoDB", "FastAPI", "Auth & Sessions",
    ],
  },
  {
    title: "Frontend",
    icon: Monitor,
    accent: "from-blue-500/10 to-blue-500/0",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    skills: [
      "React", "Next.js", "Tailwind CSS",
      "JavaScript", "Framer Motion", "Responsive Design",
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    accent: "from-orange-500/10 to-orange-500/0",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    skills: [
      "Git", "GitHub", "Vercel",
      "Figma", "Postman", "VS Code",
    ],
  },
];

const proficiency = [
  { label: "Python & AI/ML", value: 90 },
  { label: "Next.js & React", value: 85 },
  { label: "Node.js & APIs", value: 82 },
  { label: "MongoDB & Data", value: 78 },
  { label: "UI/UX & Figma", value: 72 },
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

/* ---------- Marquee ---------- */
function Marquee({ items, direction = "left", speed = 40 }) {
  const duplicated = [...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-3"
        animate={{
          x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- Category Card ---------- */
function CategoryCard({ category, index }) {
  const Icon = category.icon;
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(400px circle at ${x}px ${y}px, rgba(124,58,237,0.06), transparent 60%)`;

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`group relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br ${category.accent} p-6 transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]`}
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      <div className="relative">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${category.iconBg} ${category.iconColor}`}
        >
          <Icon size={22} strokeWidth={1.8} />
        </motion.div>

        {/* Title */}
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-stone-900">
          {category.title}
        </h3>

        {/* Skills list */}
        <ul className="mt-4 flex flex-col gap-2">
          {category.skills.map((skill, i) => (
            <motion.li
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 + i * 0.04, duration: 0.3 }}
              className="flex items-center gap-2.5 text-sm text-stone-600"
            >
              <span className="h-1 w-1 rounded-full bg-stone-400" />
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ---------- Proficiency Bar ---------- */
function ProficiencyBar({ label, value, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-stone-800">{label}</span>
        <span className="text-xs font-mono text-stone-500">
          {isInView ? value : 0}%
        </span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{
            delay: 0.3 + index * 0.1,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-violet-400"
        />
      </div>
    </motion.div>
  );
}

/* ---------- Main Component ---------- */
export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll-linked background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.3, 0.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.12, 0.05]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      {/* ---- Scroll-linked glow ---- */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      {/* ---- Subtle grid ---- */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative">
        {/* ==================== HEADER ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mx-auto max-w-7xl px-6 mb-16"
        >
          <div className="max-w-3xl">
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
              03 / Skills
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-stone-900"
            >
              The tools I use to{" "}
              <span className="text-accent">build and ship</span>.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-base md:text-lg text-stone-600 leading-relaxed"
            >
              A focused stack — from model to interface. Everything here I've
              used on real projects, not just tutorials.
            </motion.p>
          </div>
        </motion.div>

        {/* ==================== MARQUEES ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20 flex flex-col gap-1"
        >
          <Marquee items={marqueeRow1} direction="left" speed={45} />
          <Marquee items={marqueeRow2} direction="right" speed={55} />
        </motion.div>

        {/* ==================== CATEGORY GRID ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {categories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} />
          ))}
        </motion.div>

        {/* ==================== PROFICIENCY ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mx-auto max-w-7xl px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Label */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500">
                <Sparkles size={12} className="text-accent" />
                Proficiency
              </div>
              <h3 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 leading-tight">
                Where I'm strongest
              </h3>
              <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                An honest snapshot of what I use day-to-day — not aspirational.
              </p>
            </motion.div>

            {/* Bars */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {proficiency.map((p, i) => (
                <ProficiencyBar
                  key={p.label}
                  label={p.label}
                  value={p.value}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}