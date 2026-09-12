"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Detect scroll for frosted glass
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeMobileMenu();
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/70 backdrop-blur-lg border-b border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* ---------- Logo ---------- */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center text-lg font-semibold tracking-tight"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            Sudais
            <motion.span
              className="text-accent inline-block"
              variants={{
                rest: { rotate: 0, scale: 1 },
                hover: { rotate: 180, scale: 1.3 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              .
            </motion.span>
          </motion.a>

          {/* ---------- Desktop Links ---------- */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.id;
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.06,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "group relative inline-flex items-center px-3 py-2 text-sm transition-colors duration-300",
                      isActive
                        ? "text-stone-900"
                        : "text-stone-500 hover:text-stone-900"
                    )}
                  >
                    {link.label}

                    {/* Animated underline */}
                    <motion.span
                      className="absolute left-3 right-3 -bottom-0.5 h-[1.5px] bg-accent origin-left"
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />

                    {/* Hover underline (only when not active) */}
                    {!isActive && (
                      <span className="absolute left-3 right-3 -bottom-0.5 h-[1.5px] bg-stone-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    )}

                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </ul>

          {/* ---------- Desktop CTA ---------- */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white md:inline-flex"
          >
            {/* Shine effect */}
            <motion.span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              variants={{
                hover: { translateX: "100%" },
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            <span className="relative">Let's Talk</span>
            <motion.span
              className="relative"
              variants={{
                hover: { x: 3, y: -3 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowUpRight size={14} />
            </motion.span>
          </motion.a>

          {/* ---------- Mobile Toggle (3-line morph) ---------- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                isMobileMenuOpen
                  ? { rotate: 45, y: 6, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-[1.5px] rounded-full bg-stone-900"
            />
            <motion.span
              animate={
                isMobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }
              }
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] w-5 rounded-full bg-stone-900"
            />
            <motion.span
              animate={
                isMobileMenuOpen
                  ? { rotate: -45, y: -6, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-[1.5px] rounded-full bg-stone-900"
            />
          </button>
        </nav>
      </motion.header>

      {/* ---------- Mobile Drawer ---------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-30 bg-stone-900/20 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-sm bg-white shadow-2xl md:hidden"
            >
              <div className="flex h-full flex-col pt-24 px-8">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.id;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{
                          delay: 0.15 + index * 0.06,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={cn(
                            "group flex items-center justify-between border-b border-stone-100 py-4 text-2xl font-medium transition-colors",
                            isActive
                              ? "text-accent"
                              : "text-stone-800 hover:text-accent"
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-xs text-stone-400 font-mono">
                              0{index + 1}
                            </span>
                            {link.label}
                          </span>
                          <ArrowUpRight
                            size={20}
                            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                          />
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Mobile CTA */}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white"
                >
                  Let's Talk
                  <ArrowUpRight size={16} />
                </motion.a>

                {/* Footer info in drawer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="mt-auto pb-8 text-xs text-stone-400"
                >
                  <p>official22033@gmail.com</p>
                  <p className="mt-1">Nowshera, Pakistan</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}