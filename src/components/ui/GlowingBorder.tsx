'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ReactNode } from 'react';

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

const GlowingBorder = ({ children, className = '', animated = true }: GlowingBorderProps) => {
  const { colors } = useTheme();

  return (
    <div className={`relative group ${className}`}>
      {/* Bordure animée */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.primary}60, ${colors.primary})`,
          backgroundSize: '200% 100%',
        }}
        animate={
          animated
            ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Glow externe */}
      <motion.div
        className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, transparent, ${colors.primary})`,
          backgroundSize: '200% 100%',
        }}
        animate={
          animated
            ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Contenu */}
      <div className="relative rounded-xl overflow-hidden" style={{ backgroundColor: colors.card }}>
        {children}
      </div>
    </div>
  );
};

export default GlowingBorder;