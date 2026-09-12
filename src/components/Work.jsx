"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles, Star } from "lucide-react";
import { works, categories } from "@/lib/works";
import { cn } from "@/lib/utils";

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

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWorks =
    activeCategory === "All"
      ? works
      : works.filter((w) => w.category === activeCategory);

  const featuredWork = filteredWorks.find((w) => w.featured);
  const otherWorks = filteredWorks.filter((w) => !w.featured);

  return (
    <section
      id="work"
      ref={ref}
      className="relative bg-[#FAFAF9] py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(#0A0A0A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ==================== HEADER ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              {/* Section label */}
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
                02 / Selected Work
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={itemVariants}
                className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-stone-900"
              >
                Things I've{" "}
                <span className="text-accent">built</span> and shipped.
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mt-5 text-base md:text-lg text-stone-600 leading-relaxed"
              >
                A selection of projects spanning applied AI and full-stack
                delivery. Each one is deployed, working, and solving a real
                problem.
              </motion.p>
            </div>

            {/* Filter tabs */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-1 rounded-full border border-stone-200 bg-white p-1 self-start md:self-auto"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-xs font-medium transition-colors",
                    activeCategory === cat
                      ? "text-white"
                      : "text-stone-600 hover:text-stone-900"
                  )}
                >
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-full bg-stone-900"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ==================== CARDS ==================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ---- Featured Project ---- */}
            {featuredWork && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6"
              >
                <FeaturedCard work={featuredWork} />
              </motion.div>
            )}

            {/* ---- Other Projects Grid ---- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherWorks.map((work, i) => (
                <motion.div
                  key={work.slug}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectCard work={work} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ==================== BOTTOM CTA ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition-all hover:border-stone-400 hover:bg-stone-50"
          >
            <span>View all projects on GitHub</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-white transition-transform group-hover:translate-x-1">
              <ArrowRight size={12} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   Featured Card — big, full-width project
   ============================================================ */
function FeaturedCard({ work }) {
  return (
    <Link href={`/work/${work.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image side */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
            {/* Placeholder visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  className="h-40 w-40 rounded-full opacity-40 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={48} className="text-accent/60" />
                </div>
              </div>
            </div>

            {/* Featured badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1.5 text-xs font-medium text-white">
              <Star size={12} className="fill-accent text-accent" />
              Featured
            </div>

            {/* Image zoom on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-between p-8 lg:p-10">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-400 uppercase">
                <span>{work.year}</span>
                <span className="h-px w-4 bg-stone-300" />
                <span>{work.category}</span>
              </div>

              <h3 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 transition-colors group-hover:text-accent">
                {work.title}
              </h3>

              <p className="mt-3 text-base text-stone-600 leading-relaxed">
                {work.tagline}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-stone-900">
              <span>View project</span>
              <motion.span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-white"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:rotate-45"
                />
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ============================================================
   Regular Project Card
   ============================================================ */
function ProjectCard({ work }) {
  return (
    <Link href={`/work/${work.slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft"
      >
        {/* Image / Visual */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <motion.div
                className="h-32 w-32 rounded-full opacity-30 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={32} className="text-accent/50" />
              </div>
            </div>
          </motion.div>

          {/* Year badge */}
          <div className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-stone-600">
            {work.year}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-stone-900 transition-colors group-hover:text-accent">
              {work.title}
            </h3>

            <motion.span
              className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-400 transition-colors group-hover:border-stone-900 group-hover:bg-stone-900 group-hover:text-white"
              whileHover={{ rotate: 45 }}
            >
              <ArrowUpRight size={12} />
            </motion.span>
          </div>

          <p className="mt-2 text-sm text-stone-600 leading-relaxed line-clamp-2">
            {work.tagline}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {work.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600"
              >
                {tag}
              </span>
            ))}
            {work.tags.length > 3 && (
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-500">
                +{work.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}