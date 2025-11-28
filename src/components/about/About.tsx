'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

const skills = [
  { name: 'Identité visuelle', level: 95 },
  { name: 'Direction artistique', level: 90 },
  { name: 'Affiches & Print', level: 92 },
  { name: 'Branding', level: 88 },
];

const About = () => {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax réduit sur mobile pour éviter les bugs
  const leftX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]); // Apparaît plus vite

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-16 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ backgroundColor: `${colors.bgAlt}30` }}
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Colonne gauche */}
          <motion.div style={{ x: leftX, opacity }}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }} // Trigger plus tôt
              transition={{ duration: 0.5 }}
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
                À propos
              </span>
            </motion.div>

            {/* Titre */}
            <div className="mb-6">
              <motion.h2
                id="about-title"
                className="text-3xl md:text-5xl lg:text-6xl font-bold"
                style={{ color: colors.text, fontFamily: 'var(--font-heading)' }}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }} // Trigger plus tôt
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Créer des visuels qui
                <span style={{ color: colors.primary }}> marquent</span>
              </motion.h2>
            </div>

            {/* Texte */}
            <motion.div
              className="space-y-4 text-base md:text-lg leading-relaxed mb-8"
              style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }} // Délai réduit
            >
              <p>
                Je suis <span style={{ color: colors.text, fontWeight: 600 }}>Gregwa</span>, graphic designer
                passionné par la création d&apos;identités visuelles fortes et mémorables.
              </p>
              <p>
                Mon approche combine{' '}
                <span style={{ color: colors.text, fontWeight: 600 }}>créativité audacieuse</span> et
                <span style={{ color: colors.text, fontWeight: 600 }}> rigueur technique</span> pour donner vie à des projets
                qui captent l&apos;attention.
              </p>
            </motion.div>

            {/* Outils */}
            <motion.div
              className="pt-6"
              style={{ borderTop: `1px solid ${colors.border}` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2 }} // Délai réduit
            >
              <p
                className="text-xs md:text-sm uppercase tracking-[0.2em] mb-4"
                style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
              >
                Outils de prédilection
              </p>
              <div className="flex flex-wrap gap-3">
                {['Adobe Photoshop', 'Adobe Illustrator', 'Affinity'].map((tool, i) => (
                  <motion.span
                    key={tool}
                    className="px-4 py-2 rounded-full text-xs md:text-sm font-medium"
                    style={{
                      backgroundColor: colors.card,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      fontFamily: 'var(--font-body)',
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: 0.3 + i * 0.05 }} // Délai réduit
                    whileHover={{
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                      scale: 1.05,
                    }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne droite */}
          <motion.div style={{ x: rightX, opacity }}>
            {/* Compétences */}
            <div className="space-y-6 mb-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }} // Délai réduit
                >
                  <div className="flex justify-between mb-2">
                    <span
                      className="text-sm md:text-base font-medium"
                      style={{ color: colors.text, fontFamily: 'var(--font-body)' }}
                    >
                      {skill.name}
                    </span>
                    <motion.span
                      className="text-sm md:text-base font-bold"
                      style={{ color: colors.primary, fontFamily: 'var(--font-heading)' }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>

                  {/* Barre de progression */}
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: colors.border }}
                  >
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ backgroundColor: colors.primary }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + index * 0.1, // Délai réduit
                        ease: 'easeOut',
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Statistiques */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-6"
              style={{ borderTop: `1px solid ${colors.border}` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.4 }}
            >
              {[
                { value: '5+', label: 'Années exp.' },
                { value: '50+', label: 'Projets' },
                { value: '30+', label: 'Clients' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <p
                    className="text-2xl md:text-4xl font-bold mb-1"
                    style={{ color: colors.primary, fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs md:text-sm"
                    style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;