"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.6 });

  useEffect(() => {
    // Check if device supports fine hover (desktop mouse)
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

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select, .interactive-card");
      if (interactiveEl) {
        setIsHovered(true);
        const customLabel = interactiveEl.getAttribute("data-cursor");
        setCursorText(customLabel || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Lime Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_12px_#D7FF64]"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isHovered && cursorText ? 0 : 1,
        }}
      />

      {/* Trailing Responsive Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/60 backdrop-blur-[1px] flex items-center justify-center transition-colors duration-200"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? (cursorText ? 84 : 48) : 34,
          height: isHovered ? (cursorText ? 84 : 48) : 34,
          backgroundColor: isHovered ? "rgba(215, 255, 100, 0.12)" : "transparent",
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-lime px-2 text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
