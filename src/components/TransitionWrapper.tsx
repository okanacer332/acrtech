"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface TransitionWrapperProps {
  children: ReactNode;
  modeKey: string;
  className?: string;
}

export function TransitionWrapper({ children, modeKey, className }: TransitionWrapperProps) {
  // Reduce motion for better performance
  const shouldReduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

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
