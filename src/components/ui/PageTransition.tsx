'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll, useAnimationControls, Variants } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useRef, useEffect, useState } from 'react';
import ToolsSection from './ToolsSection';
import { Sphere3D } from '@/components/ui';

const Hero = () => {
  const { colors, theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimationControls();

  // Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const toolsY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Effet 3D souris
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  useEffect(() => {
    setIsLoaded(true);
    controls.start('visible');
  }, [controls]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const titleLetters = 'Gregwa'.split('');
  const isDark = theme === 'dark';

  // Variants TYPÉS CORRECTEMENT
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 150,
      rotateX: -90,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction Gregwa"
      style={{ perspective: '2000px' }}
    >
      {/* Sphère 3D */}
      <div className="hidden lg:block">
        <Sphere3D />
      </div>

      {/* Contenu principal */}
      <motion.div
        className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full pt-20 md:pt-24 pb-16"
        style={{ opacity }}
      >
        {/* Surtitre */}
        <motion.div
          className="overflow-hidden mb-6"
          style={{ y: subtitleY }}
        >
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Ligne animée */}
            <motion.span
              className="h-[2px] w-12 md:w-20 rounded-full relative overflow-hidden"
              style={{ backgroundColor: colors.primary }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <motion.span
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)`,
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: 1.5,
                }}
              />
            </motion.span>

            {/* Texte */}
            <div className="overflow-hidden">
              <motion.p
                className="text-sm md:text-base tracking-[0.4em] uppercase font-medium"
                style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Graphic Designer
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Titre GREGWA */}
        <motion.div
          className="overflow-visible mb-6"
          style={{ y: titleY, perspective: '1500px' }}
        >
          <motion.h1
            className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] font-bold tracking-[-0.04em] leading-[0.85] flex flex-wrap items-end"
            style={{
              fontFamily: 'var(--font-heading)',
              transformStyle: 'preserve-3d',
              rotateX,
              rotateY,
            }}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="inline-block relative select-none transition-colors duration-300"
                style={{
                  color: colors.primary,
                  textShadow: isDark
                    ? `0 0 80px ${colors.primary}50, 0 0 160px ${colors.primary}30, 0 20px 60px rgba(0,0,0,0.5)`
                    : `0 10px 40px ${colors.primary}30`,
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  color: isDark ? '#ffffff' : '#070707',
                  transition: { duration: 0.2 },
                }}
              >
                {letter}

                {/* Soulignement au hover */}
                <motion.span
                  className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-1 md:h-1.5 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    boxShadow: `0 0 15px ${colors.primary}80`,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            ))}

            {/* Point animé */}
            <motion.span
              className="inline-block relative select-none ml-1"
              style={{ color: colors.text }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.5,
                type: 'spring',
                stiffness: 150,
              }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 15, -15, 0],
                  color: [colors.text, colors.primary, colors.text],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                .
              </motion.span>

              {/* Glow */}
              <motion.span
                className="absolute inset-0 blur-md"
                style={{ color: colors.primary }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                .
              </motion.span>
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Ligne décorative */}
        <motion.div
          className="relative h-1 md:h-1.5 w-28 md:w-48 mb-8 rounded-full overflow-hidden"
          style={{ y: subtitleY }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: colors.border }}
          />

          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.primary}cc, ${colors.primary})`,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1, delay: 1.4 }}
          />

          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)`,
            }}
            animate={{ x: ['-200%', '300%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
              delay: 2.5,
            }}
          />

          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-md"
            style={{ backgroundColor: colors.primary }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="max-w-2xl mb-12"
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <p
            className="text-lg md:text-xl lg:text-2xl leading-relaxed"
            style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
          >
            Création d&apos;
            <HighlightedWord delay={1.8} colors={colors} theme={theme}>
              identités visuelles fortes
            </HighlightedWord>
            ,{' '}
            <HighlightedWord delay={2.0} colors={colors} theme={theme}>
              affiches percutantes
            </HighlightedWord>{' '}
            et{' '}
            <HighlightedWord delay={2.2} colors={colors} theme={theme}>
              branding mémorable
            </HighlightedWord>
            .
          </p>
        </motion.div>

        {/* Section Outils */}
        <motion.div style={{ y: toolsY }}>
          <ToolsSection />
        </motion.div>
      </motion.div>

      {/* Indicateur scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
        style={{ opacity }}
      >
        <motion.span
          className="text-[10px] tracking-[0.4em] uppercase font-medium"
          style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>

        <motion.div
          className="relative w-6 h-11 rounded-full border-2 overflow-hidden"
          style={{ borderColor: colors.border }}
          whileHover={{ borderColor: colors.primary }}
        >
          <motion.div
            className="absolute inset-0 opacity-0"
            style={{
              background: `linear-gradient(to bottom, transparent, ${colors.primary}30)`,
            }}
            whileHover={{ opacity: 1 }}
          />

          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: colors.primary,
              top: 6,
              boxShadow: `0 0 10px ${colors.primary}`,
            }}
            animate={{
              y: [0, 18, 0],
              opacity: [1, 0.4, 1],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        <motion.div
          className="w-px h-20 overflow-hidden rounded-full"
          style={{ backgroundColor: colors.border }}
        >
          <motion.div
            className="w-full h-8 rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${colors.primary}, transparent)`,
            }}
            animate={{ y: ['-100%', '300%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Composant HighlightedWord
interface HighlightedWordProps {
  children: React.ReactNode;
  delay: number;
  colors: {
    text: string;
    primary: string;
  };
  theme: string;
}

const HighlightedWord = ({ children, delay, colors, theme }: HighlightedWordProps) => {
  const isDark = theme === 'dark';

  return (
    <motion.span
      className="relative inline-block group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span
        style={{ color: colors.text, fontWeight: 500 }}
        className="relative z-10"
      >
        {children}
      </span>

      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full origin-left"
        style={{
          backgroundColor: colors.primary,
          boxShadow: isDark ? `0 0 10px ${colors.primary}80` : 'none',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      />

      <motion.span
        className="absolute inset-0 -z-10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundColor: `${colors.primary}15`,
          margin: '-4px -8px',
          padding: '4px 8px',
        }}
      />
    </motion.span>
  );
};

export default Hero;