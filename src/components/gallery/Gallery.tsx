'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';
import { useTheme } from '@/context/ThemeContext';

const Gallery = () => {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
      aria-labelledby="gallery-title"
    >
      {/* Ligne décorative latérale */}
      <motion.div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px hidden md:block"
        style={{ backgroundColor: colors.border }}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header avec parallax - ESPACE RÉDUIT */}
        <motion.div
          className="mb-8 md:mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors.primary }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-sm uppercase tracking-[0.3em]"
              style={{ color: colors.primary, fontFamily: 'var(--font-body)' }}
            >
              Portfolio
            </span>
          </motion.div>

          {/* Titre avec reveal */}
          <div className="overflow-hidden">
            <motion.h2
              id="gallery-title"
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4"
              style={{ color: colors.text, fontFamily: 'var(--font-heading)' }}
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Projets{' '}
              <span style={{ color: colors.primary }}>sélectionnés</span>
            </motion.h2>
          </div>

          {/* Ligne animée */}
          <motion.div
            className="h-1 w-20 md:w-32 rounded-full mb-4"
            style={{ backgroundColor: colors.primary }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Description */}
          <motion.p
            className="text-base md:text-lg max-w-xl"
            style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Une sélection de travaux récents en identité visuelle, affiches et
            direction artistique.
          </motion.p>
        </motion.div>

        {/* Grille de projets avec stagger */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              category={project.category}
              image={project.thumbnail}
              slug={project.slug}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bouton voir plus */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            className="group relative px-10 py-4 rounded-full font-semibold overflow-hidden"
            style={{
              border: `2px solid ${colors.primary}`,
              color: colors.primary,
              fontFamily: 'var(--font-heading)',
              backgroundColor: 'transparent',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background animé au hover */}
            <motion.span
              className="absolute inset-0 -z-10"
              style={{ backgroundColor: colors.primary }}
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Voir tous les projets
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;