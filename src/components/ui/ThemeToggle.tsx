'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full p-1 transition-colors duration-500"
      style={{
        backgroundColor: theme === 'dark' ? '#383738' : '#e0e0e0',
        border: `2px solid ${colors.primary}`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Basculer vers le mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
    >
      {/* Slider */}
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}
        animate={{
          x: theme === 'dark' ? 0 : 28,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icône Soleil/Lune */}
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.5 }}
        >
          {theme === 'dark' ? (
            // Lune
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          ) : (
            // Soleil
            <>
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </>
          )}
        </motion.svg>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{
          boxShadow: `0 0 20px ${colors.primary}`,
        }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;