'use client';

import { motion } from 'framer-motion';

interface ToolIconProps {
  name: 'photoshop' | 'illustrator' | 'affinity';
  size?: number;
}

const ToolIcon = ({ name, size = 48 }: ToolIconProps) => {
  const tools = {
    photoshop: {
      bg: 'linear-gradient(135deg, #31A8FF 0%, #001E36 100%)',
      label: 'Ps',
      name: 'Adobe Photoshop',
    },
    illustrator: {
      bg: 'linear-gradient(135deg, #FF9A00 0%, #330000 100%)',
      label: 'Ai',
      name: 'Adobe Illustrator',
    },
    affinity: {
      bg: 'linear-gradient(135deg, #59C9F0 0%, #1B3B4B 100%)',
      label: 'A',
      name: 'Affinity',
    },
  };

  const tool = tools[name];

  return (
    <motion.div
      className="group relative flex flex-col items-center gap-3"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Icône */}
      <motion.div
        className="relative rounded-2xl flex items-center justify-center font-bold text-white shadow-2xl"
        style={{
          width: size,
          height: size,
          background: tool.bg,
          fontFamily: 'var(--font-heading)',
          fontSize: size * 0.4,
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {tool.label}

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: tool.bg,
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
      </motion.div>

      {/* Nom */}
      <motion.span
        className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
        style={{ color: '#8f9194', fontFamily: 'var(--font-body)' }}
      >
        {tool.name}
      </motion.span>

      {/* Ligne connecteur */}
      <motion.div
        className="absolute -bottom-8 w-px h-8 opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: '#383738' }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ToolIcon;