"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface TransitionWrapperProps {
  children: ReactNode;
  modeKey: string;
  className?: string;
}

export function TransitionWrapper({ children, modeKey, className }: TransitionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modeKey}
        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}