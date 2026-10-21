"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");

  // Raw mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity for 3D tilt
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  // Spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower spring for the glowing trail
  const trailConfig = { damping: 30, stiffness: 150, mass: 1 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  // 3D Tilt based on mouse velocity
  const rotateX = useTransform(velocityY, [-2, 2], [30, -30]);
  const rotateY = useTransform(velocityX, [-2, 2], [-30, 30]);

  // Reset tilt when idle
  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 200 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 200 });

  useEffect(() => {
    // Hide default cursor globally
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Calculate velocity for the 3D tilt
      velocityX.set(e.clientX - lastX);
      velocityY.set(e.clientY - lastY);
      lastX = e.clientX;
      lastY = e.clientY;

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactiveElement = target.closest('a') || target.closest('button') || target.closest('[data-cursor]');
      
      if (interactiveElement) {
        setIsHovering(true);
        // Check for custom text (e.g., data-cursor-text="View")
        const text = interactiveElement.getAttribute('data-cursor-text');
        setHoverText(text || "");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, velocityX, velocityY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Global CSS to force hide cursor everywhere except inputs */}
      <style jsx global>{`
        * { cursor: none !important; }
        input, textarea, select { cursor: text !important; }
      `}</style>

      {/* 1. Ambient Glowing Trail (Slowest) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-32 w-32 rounded-full bg-accent/20 blur-3xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
      />

      {/* 2. Outer 3D Ring (Springy + Tilts) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full border-2 border-accent/60 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        animate={{
          width: isHovering ? 64 : 28,
          height: isHovering ? 64 : 28,
          backgroundColor: isHovering ? "rgba(124, 58, 237, 0.1)" : "rgba(124, 58, 237, 0.02)",
          borderColor: isHovering ? "rgba(124, 58, 237, 0.8)" : "rgba(124, 58, 237, 0.4)",
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Optional Hover Text */}
        {hoverText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-medium uppercase tracking-widest text-accent"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
      
      {/* 3. Inner 3D Sphere (Instant) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2 w-2 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle at 30% 30%, #ffffff 0%, #7C3AED 60%, #4C1D95 100%)",
          boxShadow: "0 0 10px rgba(124, 58, 237, 0.8)",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}