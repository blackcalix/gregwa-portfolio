'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

const Sphere3D = () => {
  const { colors, theme } = useTheme();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll();
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const sphereScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);
  const sphereRotateZ = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const springConfig = { damping: 25, stiffness: 80 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, -40]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const isDark = theme === 'dark';

  // Anneaux (vitesse augmentée via duration)
  const rings = useMemo(() =>
    [...Array(16)].map((_, i) => ({
      id: i,
      rotateX: i * 11.25,
      rotateY: i * 22.5,
      scale: 1 - (i * 0.02),
      opacity: 0.15 - (i * 0.008),
      duration: 12 + i * 1.5, // RÉDUIT de ~25 à ~12 (2x plus rapide)
      delay: i * 0.1,
      thickness: i < 4 ? 1.5 : 1,
    })), []
  );

  // Particules (vitesse augmentée)
  const particles = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      orbitRadius: 100 + (i % 5) * 30,
      size: 1.5 + Math.random() * 2,
      speed: 6 + Math.random() * 8, // RÉDUIT de ~12-27 à ~6-14 (2x plus rapide)
      delay: Math.random() * 5,
      startAngle: (i / 30) * 360,
      orbitTilt: Math.random() * 60,
      glowIntensity: 0.3 + Math.random() * 0.7,
    })), []
  );

  // Points surface
  const surfacePoints = useMemo(() =>
    [...Array(50)].map((_, i) => ({
      id: i,
      phi: Math.acos(2 * Math.random() - 1),
      theta: Math.random() * Math.PI * 2,
      size: 1 + Math.random() * 2,
      pulseSpeed: 1.5 + Math.random() * 2, // RÉDUIT de ~2-5 à ~1.5-3.5
      delay: Math.random() * 3,
    })), []
  );

  return (
    <motion.div
      className="absolute right-[2%] xl:right-[8%] top-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px]"
      style={{
        perspective: '1500px',
        zIndex: 1,
        y: sphereY,
        opacity: sphereOpacity,
        scale: sphereScale,
        translateY: '-50%',
      }}
      initial={{ opacity: 0, scale: 0.3, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Glow externe */}
      <motion.div
        className="absolute inset-[-40%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${isDark ? 'rgba(255, 60, 0, 0.2)' : 'rgba(255, 60, 0, 0.1)'} 0%, transparent 50%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Container avec rotation souris */}
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          rotateZ: sphereRotateZ,
        }}
      >
        {/* Rotation automatique RAPIDE */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: [0, 360] }}
          transition={{
            duration: 30, // RÉDUIT de 60 à 30 (2x plus rapide)
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Anneaux horizontaux */}
          {rings.map((ring) => (
            <motion.div
              key={`ring-${ring.id}`}
              className="absolute inset-0 rounded-full"
              style={{
                border: `${ring.thickness}px solid ${isDark 
                  ? `rgba(255, 60, 0, ${ring.opacity})` 
                  : `rgba(255, 60, 0, ${ring.opacity * 0.7})`}`,
                transform: `rotateX(${ring.rotateX}deg) scale(${ring.scale})`,
                transformStyle: 'preserve-3d',
                boxShadow: isDark && ring.id < 4
                  ? `0 0 10px rgba(255, 60, 0, ${ring.opacity * 0.5})`
                  : 'none',
              }}
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: ring.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: ring.delay,
              }}
            />
          ))}

          {/* Anneaux verticaux */}
          {rings.slice(0, 8).map((ring) => (
            <motion.div
              key={`vring-${ring.id}`}
              className="absolute inset-0 rounded-full"
              style={{
                border: `${ring.thickness}px solid ${isDark
                  ? `rgba(255, 60, 0, ${ring.opacity * 0.8})`
                  : `rgba(255, 60, 0, ${ring.opacity * 0.6})`}`,
                transform: `rotateY(${ring.rotateY}deg) scale(${ring.scale})`,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateX: [0, 360],
              }}
              transition={{
                duration: ring.duration + 5,
                repeat: Infinity,
                ease: 'linear',
                delay: ring.delay,
              }}
            />
          ))}

          {/* Anneau équateur brillant */}
          <motion.div
            className="absolute inset-[5%] rounded-full"
            style={{
              border: `2px solid ${colors.primary}`,
              boxShadow: `0 0 30px ${colors.primary}80, 0 0 60px ${colors.primary}40, inset 0 0 30px ${colors.primary}30`,
              transform: 'rotateX(80deg)',
            }}
            animate={{
              rotateZ: [0, 360],
              scale: [1, 1.03, 1],
            }}
            transition={{
              rotateZ: { duration: 8, repeat: Infinity, ease: 'linear' }, // RÉDUIT de 12 à 8
              scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          {/* Second anneau */}
          <motion.div
            className="absolute inset-[12%] rounded-full"
            style={{
              border: `1.5px solid ${colors.primary}90`,
              boxShadow: `0 0 20px ${colors.primary}50`,
              transform: 'rotateX(80deg) rotateZ(30deg)',
            }}
            animate={{
              rotateZ: [30, 390],
            }}
            transition={{
              duration: 10, // RÉDUIT de 18 à 10
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Troisième anneau */}
          <motion.div
            className="absolute inset-[8%] rounded-full"
            style={{
              border: `1px solid ${colors.primary}70`,
              transform: 'rotateX(45deg) rotateY(45deg)',
            }}
            animate={{
              rotateZ: [0, -360],
            }}
            transition={{
              duration: 14, // RÉDUIT de 25 à 14
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        {/* Noyau central */}
        <motion.div
          className="absolute inset-[25%] rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, 
              ${isDark ? 'rgba(255, 100, 50, 0.6)' : 'rgba(255, 80, 30, 0.4)'} 0%, 
              ${isDark ? 'rgba(255, 60, 0, 0.3)' : 'rgba(255, 60, 0, 0.2)'} 50%, 
              transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Point central */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: `
              0 0 20px ${colors.primary},
              0 0 40px ${colors.primary},
              0 0 60px ${colors.primary}cc,
              0 0 100px ${colors.primary}80,
              0 0 150px ${colors.primary}40
            `,
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Halo */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 60,
            height: 60,
            background: `radial-gradient(circle, ${colors.primary}60 0%, transparent 70%)`,
            filter: 'blur(10px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Particules orbitales */}
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: isDark ? colors.primary : `${colors.primary}cc`,
              boxShadow: isDark
                ? `0 0 ${particle.size * 4}px ${colors.primary}${Math.floor(particle.glowIntensity * 99).toString(16)}`
                : `0 0 ${particle.size * 2}px ${colors.primary}60`,
              transformStyle: 'preserve-3d',
              transform: `rotateX(${particle.orbitTilt}deg)`,
            }}
            animate={{
              rotateZ: [particle.startAngle, particle.startAngle + 360],
              x: [0, particle.orbitRadius, 0, -particle.orbitRadius, 0],
              y: [particle.orbitRadius, 0, -particle.orbitRadius, 0, particle.orbitRadius],
              opacity: [0.4, 1, 0.4, 1, 0.4],
            }}
            transition={{
              duration: particle.speed,
              repeat: Infinity,
              ease: 'linear',
              delay: particle.delay,
            }}
          />
        ))}

        {/* Points surface */}
        {surfacePoints.map((point) => {
          const radius = 48;
          const x = Math.sin(point.phi) * Math.cos(point.theta) * radius;
          const y = Math.sin(point.phi) * Math.sin(point.theta) * radius;
          const z = Math.cos(point.phi) * radius;

          return (
            <motion.div
              key={`surface-${point.id}`}
              className="absolute rounded-full"
              style={{
                width: point.size,
                height: point.size,
                backgroundColor: isDark ? '#ffffff' : colors.primary,
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${y}%)`,
                transform: `translateZ(${z}px)`,
                boxShadow: isDark ? `0 0 ${point.size * 3}px ${colors.primary}` : 'none',
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: point.pulseSpeed,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: point.delay,
              }}
            />
          );
        })}

        {/* Traînées lumineuses */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`trail-${i}`}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              width: 2,
              height: '45%',
              background: `linear-gradient(to top, ${colors.primary}90, ${colors.primary}40, transparent)`,
              transform: `rotate(${i * 60}deg)`,
              marginLeft: -1,
              borderRadius: '2px',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* Cercles concentriques */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`outer-circle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: `${-15 - i * 10}%`,
            border: `1px solid ${isDark 
              ? `rgba(255, 60, 0, ${0.15 - i * 0.04})` 
              : `rgba(255, 60, 0, ${0.1 - i * 0.03})`}`,
          }}
          animate={{
            scale: [1, 1.05 + i * 0.02, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Sphere3D;