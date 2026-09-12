"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  ArrowUpRight,
  Download,
  Sparkles,
  Code2,
  Brain,
  Database,
  Zap,
} from "lucide-react";

const techCards = [
  {
    label: "Python",
    icon: Code2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    position: "top-left",
  },
  {
    label: "OpenAI",
    icon: Brain,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    position: "top-right",
  },
  {
    label: "RAG",
    icon: Database,
    color: "text-purple-600",
    bg: "bg-purple-50",
    position: "bottom-left",
  },
  {
    label: "Next.js",
    icon: Zap,
    color: "text-stone-800",
    bg: "bg-stone-100",
    position: "bottom-right",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ---- Background gradient orbs ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #FF6B4A 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* ==================== LEFT ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          {/* Availability badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/60 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-stone-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for AI/ML roles
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            I build AI features
            <br />
            that{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">actually ship</span>
              {/* Underline swoosh */}
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
              >
                <motion.path
                  d="M2 8 Q 150 2, 298 6"
                  stroke="#7C3AED"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-base md:text-lg text-stone-600 leading-relaxed"
          >
            AI Engineer specialising in{" "}
            <span className="text-stone-900 font-medium">
              LLM applications, RAG pipelines
            </span>{" "}
            and agentic workflows — with full-stack delivery in Next.js &
            Node.js.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <motion.a
              href="#contact"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-stone-900 pl-5 pr-2 py-2 text-sm font-medium text-white"
            >
              <span className="relative z-10">Let's Talk</span>
              <span className="relative z-10 ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                <motion.span
                  variants={{ hover: { x: 2, y: -2 } }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  <ArrowUpRight size={14} />
                </motion.span>
              </span>
              <motion.span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                variants={{ hover: { translateX: "100%" } }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/50 backdrop-blur-sm px-5 py-3 text-sm font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-white"
            >
              <Download size={14} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Numbered info */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-2 gap-8 max-w-md"
          >
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-stone-900">
                  01
                </span>
                <div className="h-px flex-1 bg-stone-300" />
              </div>
              <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                2+ years shipping production apps with React, Next.js & Node.js
              </p>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-stone-900">
                  02
                </span>
                <div className="h-px flex-1 bg-stone-300" />
              </div>
              <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                Focused on RAG, embeddings & agentic LLM workflows end-to-end
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ==================== RIGHT ==================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center h-[400px] md:h-[500px]"
        >
          {/* Central glowing orb (behind image) */}
          <motion.div
            className="absolute h-64 w-64 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #A78BFA 0%, #7C3AED 40%, #4C1D95 100%)",
              boxShadow: "0 0 100px rgba(124, 58, 237, 0.35)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Rotating accent ring */}
          <motion.div
            className="absolute h-72 w-72 md:h-80 md:w-80 rounded-full border border-accent/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-accent shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
          </motion.div>

          {/* Profile image inside orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 h-56 w-56 md:h-64 md:w-64 overflow-hidden rounded-full ring-4 ring-white/40"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2)",
            }}
          >
            <Image
              src="/images/profile.png"
              alt="Sudais Khan"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 224px, 256px"
            />
          </motion.div>

          {/* Tech cards floating around */}
          {techCards.map((card, index) => {
            const Icon = card.icon;
            const positions = {
              "top-left": "top-4 left-4 md:top-8 md:left-8",
              "top-right": "top-4 right-4 md:top-12 md:right-8",
              "bottom-left": "bottom-4 left-4 md:bottom-12 md:left-12",
              "bottom-right": "bottom-4 right-4 md:bottom-8 md:right-8",
            };

            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.6 + index * 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute z-20 ${positions[card.position]}`}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-2.5 rounded-2xl border border-stone-200/80 bg-white/90 backdrop-blur-md px-3.5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl ${card.bg} ${card.color}`}
                  >
                    <Icon size={16} strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-stone-800">
                    {card.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Sparkle accents */}
          <motion.div
            className="absolute top-1/4 right-1/4 text-accent z-20"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={20} />
          </motion.div>

          <motion.div
            className="absolute bottom-1/3 left-1/4 text-accent z-20"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 1, 0.4],
              rotate: [0, -45, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Sparkles size={14} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-gradient-to-b from-stone-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}