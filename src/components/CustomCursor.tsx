"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apple-grade fluid spring physics for the liquid glass circle
  const glassX = useSpring(mouseX, { damping: 26, stiffness: 320, mass: 0.45 });
  const glassY = useSpring(mouseY, { damping: 26, stiffness: 320, mass: 0.45 });

  // Direct dot tracking with high responsiveness
  const dotX = useSpring(mouseX, { damping: 35, stiffness: 600, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 600, mass: 0.1 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "a, button, [role='button'], input, textarea, select, .interactive-card, [data-cursor], label"
      );

      if (interactiveEl) {
        setIsHovered(true);
        const customLabel = interactiveEl.getAttribute("data-cursor");
        setCursorText(customLabel || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || isTouchDevice) return null;

  // Determine dynamic diameter based on interaction state
  const targetSize = isHovered ? (cursorText ? 86 : 56) : 26;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Central Precision Point Indicator (Fades out smoothly when liquid glass lens expands) */}
      <motion.div
        className="fixed top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_8px_#D7FF64]"
        style={{
          x: dotX,
          y: dotY,
          opacity: isHovered ? 0 : 0.85,
          scale: isHovered ? 0.3 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Apple Liquid Glass Morphing Lens */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center select-none backdrop-blur-md backdrop-saturate-150"
        style={{
          x: glassX,
          y: glassY,
          width: targetSize,
          height: targetSize,
          scale: isMouseDown ? 0.88 : 1,
          // Apple Liquid Glass Specular Styling
          backgroundColor: isHovered
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(255, 255, 255, 0.03)",
          backgroundImage: isHovered
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(215, 255, 100, 0.06) 50%, rgba(255, 255, 255, 0.02) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%)",
          border: isHovered
            ? "1px solid rgba(255, 255, 255, 0.24)"
            : "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: isHovered
            ? "inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 16px rgba(215, 255, 100, 0.18)"
            : "inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), 0 4px 16px rgba(0, 0, 0, 0.2)",
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 24,
          mass: 0.4,
        }}
      >
        {/* Subtle Specular Top Reflection Pill */}
        <div
          className={`absolute top-1 left-1/2 -translate-x-1/2 h-1/4 w-3/5 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Custom Contextual Cursor Label (when data-cursor exists) */}
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-white/95 px-2 text-center drop-shadow-md select-none relative z-10"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
