'use client';

import { motion } from 'framer-motion';
import ToolLogo from '@/components/ui/ToolLogo';
import { useTheme } from '@/context/ThemeContext';

const ToolsSection = () => {
  const { colors } = useTheme();
  const tools: Array<'photoshop' | 'illustrator' | 'affinity'> = [
    'photoshop',
    'illustrator',
    'affinity',
  ];

  return (
    <motion.div
      className="mt-12 md:mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.1 }}
    >
      {/* Label */}
      <motion.p
        className="text-xs md:text-sm uppercase tracking-widest mb-6 md:mb-8"
        style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.15 }}
      >
        Outils de prédilection
      </motion.p>

      {/* Logos des outils */}
      <div className="flex flex-wrap gap-6 md:gap-10">
        {tools.map((tool, index) => (
          <ToolLogo key={tool} name={tool} index={index} />
        ))}
      </div>

      {/* Ligne connectrice animée (optionnel) */}
      <motion.div
        className="hidden md:block relative h-px mt-16 overflow-hidden"
        style={{ backgroundColor: colors.border }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
      >
        {/* Effet de lumière qui parcourt la ligne */}
        <motion.div
          className="absolute inset-y-0 w-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
          }}
          animate={{ x: ['-100%', '500%'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ToolsSection;