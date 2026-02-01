"use client";

import { ReactNode, useMemo, useState, useEffect } from "react";

interface TransitionWrapperProps {
  children: ReactNode;
  modeKey: string;
  className?: string;
}

// Lightweight CSS-only fallback
function CSSFallback({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div 
      className={`transition-opacity duration-200 ${className}`}
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {children}
    </div>
  );
}

export function TransitionWrapper({ children, modeKey, className }: TransitionWrapperProps) {
  const [motionComponents, setMotionComponents] = useState<typeof import("framer-motion") | null>(null);
  
  // Reduce motion for better performance
  const shouldReduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Lazy load framer-motion only when needed
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    let mounted = true;
    import("framer-motion").then((mod) => {
      if (mounted) setMotionComponents(mod);
    });
    
    return () => { mounted = false; };
  }, [shouldReduceMotion]);

  // Use CSS fallback if reduced motion or framer-motion not loaded
  if (shouldReduceMotion || !motionComponents) {
    return <CSSFallback className={className}>{children}</CSSFallback>;
  }

  const { motion, AnimatePresence } = motionComponents;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
