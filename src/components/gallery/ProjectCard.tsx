'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  slug: string;
  index: number;
}

const ProjectCard = ({ title, category, image, slug, index }: ProjectCardProps) => {
  const { colors, theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  // Motion values pour l'effet 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 90 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 90 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  // Effet de lumière qui suit la souris
  const lightX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const lightY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      style={{ perspective: '1000px' }}
    >
      <Link href={`/projet/${slug}`} aria-label={`Voir le projet ${title}`}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative"
        >
          {/* Glow effect externe */}
          <motion.div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${colors.primary}50, transparent 70%)`,
            }}
          />

          {/* Bordure animée */}
          <motion.div
            className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}30, ${colors.primary})`,
              backgroundSize: '300% 300%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Container principal - COMPACT */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              backgroundColor: colors.card,
              transform: 'translateZ(0)',
            }}
          >
            {/* Image - Aspect ratio plus compact */}
            <div className="relative aspect-[4/4] overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to top, ${colors.bg}f0 0%, ${colors.bg}80 40%, transparent 100%)`,
                }}
              />

              {/* Effet de lumière dynamique */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at var(--light-x) var(--light-y), ${colors.primary}60, transparent 50%)`,
                  // @ts-ignore
                  '--light-x': lightX,
                  '--light-y': lightY,
                }}
              />

              {/* Badge catégorie - Visible au hover */}
              <motion.div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0"
                style={{
                  backgroundColor: colors.primary,
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {category}
              </motion.div>

              {/* Icône flèche */}
              <motion.div
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                whileHover={{ scale: 1.2, backgroundColor: colors.primary }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.text}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </motion.div>

              {/* Titre en bas */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <motion.h3
                  className="text-lg md:text-xl font-bold leading-tight"
                  style={{ 
                    color: colors.text, 
                    fontFamily: 'var(--font-heading)',
                    textShadow: theme === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
                  }}
                >
                  {title}
                </motion.h3>
              </div>
            </div>
          </div>

          {/* Reflet 3D sous la carte */}
          <motion.div
            className="absolute -bottom-4 left-4 right-4 h-8 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-md"
            style={{
              background: `linear-gradient(to bottom, ${colors.primary}40, transparent)`,
              transform: 'translateZ(-20px) rotateX(90deg)',
            }}
          />
        </motion.div>
      </Link>
    </motion.article>
  );
};

export default ProjectCard;