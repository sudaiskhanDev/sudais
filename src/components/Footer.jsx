"use client";

import { motion } from "motion/react";
import { ArrowUp, Heart } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/sudaiskhanDev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sudais-khan-78b3a6341/" },
  { label: "Email", href: "mailto:sudaisinbox@gmail.com" },
];

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-stone-200 bg-[#FAFAF9] overflow-hidden">
      {/* ---- Big name strip ---- */}
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Name */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover="hover"
            className="group inline-block"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-none text-stone-900">
              Sudais Khan
              <motion.span
                variants={{ hover: { rotate: 45, scale: 1.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="inline-block text-accent ml-1"
              >
                .
              </motion.span>
            </h2>
            <motion.div
              variants={{ hover: { scaleX: 1 } }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-2 h-[2px] bg-accent origin-left"
            />
          </motion.a>

          {/* Back to top */}
          <motion.button
            onClick={handleBackToTop}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50"
          >
            Back to top
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-white transition-transform group-hover:-translate-y-0.5">
              <ArrowUp size={12} />
            </span>
          </motion.button>
        </div>
      </div>

      {/* ---- Bottom strip ---- */}
      <div className="relative border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-stone-500">
              <span>© {new Date().getFullYear()} Sudais Khan. All rights reserved.</span>
              <span className="hidden md:inline h-1 w-1 rounded-full bg-stone-300" />
              <span className="inline-flex items-center gap-1.5">
                Built with <Heart size={10} className="fill-accent text-accent" /> in Next.js
              </span>
            </div>

            {/* Socials */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group relative text-xs font-medium uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900"
                >
                  {s.label}
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-accent origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}