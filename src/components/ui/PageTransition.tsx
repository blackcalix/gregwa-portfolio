'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Overlay de transition */}
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ backgroundColor: '#FF3C00' }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: 'top' }}
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;