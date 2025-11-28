'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

const AnimatedBackground = () => {
  const { colors, theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll();

  // Parallax sur le grid
  const gridRotateX = useTransform(scrollYProgress, [0, 1], [60, 80]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [2.5, 4]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.3]);

  // Intensité des orbes selon le scroll
  const orbIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.4]);

  // Particules
  const particles = useMemo(() =>
    [...Array(50)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.5 + 0.3,
      drift: (Math.random() - 0.5) * 100,
    })), []
  );

  // Étoiles
  const stars = useMemo(() =>
    [...Array(80)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 8,
    })), []
  );

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isMounted) return null;

  const isDark = theme === 'dark';

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      animate={{ backgroundColor: colors.bg }}
      transition={{ duration: 0.8 }}
    >
      {/* === LAYER 1: Gradient de base amélioré === */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? `
              radial-gradient(ellipse 80% 60% at 20% 10%, rgba(255, 60, 0, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 90%, rgba(255, 60, 0, 0.08) 0%, transparent 40%),
              radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 60, 0, 0.05) 0%, transparent 60%),
              ${colors.bg}
            `
            : `
              radial-gradient(ellipse 80% 60% at 20% 10%, rgba(255, 60, 0, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 90%, rgba(255, 60, 0, 0.05) 0%, transparent 40%),
              ${colors.bg}
            `,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* === LAYER 2: Grille 3D avec parallax === */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(255, 60, 0, 0.12)' : 'rgba(255, 60, 0, 0.08)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255, 60, 0, 0.12)' : 'rgba(255, 60, 0, 0.08)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transformOrigin: 'center top',
          rotateX: gridRotateX,
          scale: gridScale,
          opacity: gridOpacity,
        }}
      />

      {/* Grille fine secondaire */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'} 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
          transform: 'perspective(600px) rotateX(70deg) scale(3)',
          transformOrigin: 'center top',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '25px 25px'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* === LAYER 3: Gradient souris === */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '55vw',
          height: '55vw',
          maxWidth: '900px',
          maxHeight: '900px',
          background: `radial-gradient(circle, ${isDark ? 'rgba(255, 60, 0, 0.18)' : 'rgba(255, 60, 0, 0.1)'} 0%, transparent 55%)`,
          filter: 'blur(50px)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 90,
        }}
      />

      {/* === LAYER 4: Orbes avec intensité variable === */}
      <motion.div
        className="absolute"
        style={{
          width: '45vw',
          height: '45vw',
          maxWidth: '650px',
          maxHeight: '650px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.orb1} 0%, transparent 55%)`,
          filter: 'blur(70px)',
          right: '-12vw',
          top: '3vh',
          opacity: orbIntensity,
        }}
        animate={{
          y: [0, 100, 0],
          x: [0, -50, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute"
        style={{
          width: '38vw',
          height: '38vw',
          maxWidth: '550px',
          maxHeight: '550px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.orb2} 0%, transparent 55%)`,
          filter: 'blur(65px)',
          left: '-10vw',
          bottom: '8vh',
          opacity: orbIntensity,
        }}
        animate={{
          y: [0, -80, 0],
          x: [0, 70, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute"
        style={{
          width: '30vw',
          height: '30vw',
          maxWidth: '420px',
          maxHeight: '420px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.orb3} 0%, transparent 55%)`,
          filter: 'blur(55px)',
          left: '55%',
          top: '45%',
          transform: 'translate(-50%, -50%)',
          opacity: orbIntensity,
        }}
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* === LAYER 5: Particules dynamiques === */}
      {particles.map((particle) => (
        <motion.div
          key={`p-${particle.id}`}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: isDark
              ? `rgba(255, 60, 0, ${particle.opacity})`
              : `rgba(255, 60, 0, ${particle.opacity * 0.7})`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: isDark ? `0 0 ${particle.size * 3}px rgba(255, 60, 0, 0.4)` : 'none',
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, particle.drift, 0],
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}

      {/* === LAYER 6: Étoiles scintillantes === */}
      {stars.map((star) => (
        <motion.div
          key={`s-${star.id}`}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 60, 0, 0.5)',
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        />
      ))}

      {/* === LAYER 7: Lignes lumineuses === */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${18 + i * 18}%`,
            background: `linear-gradient(90deg, transparent 0%, ${colors.primary}50 50%, transparent 100%)`,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scaleX: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2.5,
          }}
        />
      ))}

      {/* === LAYER 8: Grain === */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: isDark ? 0.25 : 0.12,
          mixBlendMode: 'overlay',
        }}
      />

      {/* === LAYER 9: Vignette === */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse 70% 70% at center, transparent 25%, ${colors.bg}70 65%, ${colors.bg} 100%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* === LAYER 10: Ambiance orangée === */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(255, 60, 0, 0.03) 0%, transparent 30%, transparent 70%, rgba(255, 60, 0, 0.02) 100%)'
            : 'linear-gradient(180deg, rgba(255, 60, 0, 0.02) 0%, transparent 30%, transparent 70%, rgba(255, 60, 0, 0.01) 100%)',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;