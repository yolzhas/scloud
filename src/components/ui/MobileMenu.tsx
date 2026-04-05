"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

export const MobileMenuItem = ({ children }: { children: ReactNode }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 100, damping: 20 },
      },
    }}
  >
    {children}
  </motion.div>
);

export default function MobileMenu({
  isOpen,
  onClose,
  children,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="absolute inset-0 flex flex-col"
            variants={panelVariants}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-white hover:text-zinc-300 transition-colors"
                aria-label="Close menu"
              >
                <X size={28} weight="bold" />
              </button>
            </div>

            {/* Content */}
            <motion.div
              className="flex-1 flex flex-col items-center justify-center gap-8 px-8"
              variants={contentVariants}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
