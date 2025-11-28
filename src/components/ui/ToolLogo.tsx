'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ToolLogoProps {
  name: 'photoshop' | 'illustrator' | 'affinity';
  index: number;
}

const toolsData = {
  photoshop: {
    label: 'Adobe Photoshop',
    color: '#31A8FF',
    shortLabel: 'Ps',
    image: '/tools/photoshop.svg',
  },
  illustrator: {
    label: 'Adobe Illustrator',
    color: '#FF9A00',
    shortLabel: 'Ai',
    image: '/tools/illustrator.svg',
  },
  affinity: {
    label: 'Affinity Designer',
    color: '#59C9F0',
    shortLabel: 'Af',
    image: '/tools/affinity.svg',
  },
};

const ToolLogo = ({ name, index }: ToolLogoProps) => {
  const { colors, theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  const tool = toolsData[name];

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30, rotateY: -30 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        duration: 0.6,
        delay: 1.2 + index * 0.15,
        ease: 'easeOut',
      }}
      style={{ perspective: '1000px' }}
    >
      {/* Container principal */}
      <motion.div
        className="relative cursor-pointer"
        whileHover={{
          scale: 1.1,
          rotateY: 15,
          rotateX: -10,
          z: 50,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow animé derrière */}
        <motion.div
          className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
          style={{ backgroundColor: tool.color }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Cercles orbitaux */}
        <motion.div
          className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: `${tool.color}${30 - i * 10}`,
                transform: `rotateX(${60 + i * 10}deg) rotateY(${i * 30}deg)`,
              }}
              animate={{
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </motion.div>

        {/* Card du logo */}
        <motion.div
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            border: `2px solid ${colors.border}`,
            boxShadow: theme === 'dark' 
              ? `0 10px 40px ${tool.color}20, inset 0 1px 0 rgba(255,255,255,0.1)` 
              : `0 10px 40px ${tool.color}30`,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{
            borderColor: tool.color,
            boxShadow: `0 20px 60px ${tool.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
          }}
        >
          {/* Effet de reflet */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${tool.color}20 0%, transparent 50%, ${tool.color}10 100%)`,
            }}
          />

          {/* Logo SVG ou Fallback */}
          {!imageError ? (
            <div 
              className="relative z-10 w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110"
              style={{ transform: 'translateZ(20px)' }}
            >
              <Image
                src={tool.image}
                alt={tool.label}
                fill
                className="object-contain"
                onError={() => setImageError(true)}
                unoptimized
              />
            </div>
          ) : (
            <motion.div
              className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${tool.color} 0%, ${tool.color}99 100%)`,
                transform: 'translateZ(20px)',
              }}
            >
              {tool.shortLabel}
            </motion.div>
          )}

          {/* Particules flottantes */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: tool.color,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Label en dessous */}
        <motion.div
          className="absolute -bottom-8 left-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-bottom-10"
          style={{ 
            transform: 'translateX(-50%) translateZ(30px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <span
            className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full"
            style={{
              color: colors.text,
              backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
              fontFamily: 'var(--font-body)',
              border: `1px solid ${tool.color}50`,
              boxShadow: `0 4px 15px ${tool.color}30`,
            }}
          >
            {tool.label}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ToolLogo;