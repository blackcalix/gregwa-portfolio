'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-6 md:px-12 lg:px-24 mt-auto"
      style={{
        backgroundColor: `${colors.bgAlt}60`,
        borderTop: `1px solid ${colors.border}`,
      }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold transition-colors duration-300"
            style={{ color: colors.text, fontFamily: 'var(--font-heading)' }}
            whileHover={{ color: colors.primary }}
          >
            Gregwa<span style={{ color: colors.primary }}>.</span>
          </motion.a>

          {/* Liens Sociaux */}
          <div className="flex items-center gap-8">
            <motion.a
              href="mailto:woodshleico@gmail.com"
              className="text-sm uppercase tracking-widest transition-colors duration-300"
              style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
              whileHover={{ color: colors.primary, y: -2 }}
            >
              Email
            </motion.a>
            
            <motion.a
              href="https://www.instagram.com/gregwadizay/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest transition-colors duration-300"
              style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
              whileHover={{ color: colors.primary, y: -2 }}
            >
              Instagram
            </motion.a>
          </div>

          {/* Copyright */}
          <p
            className="text-xs opacity-60 text-center md:text-right"
            style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
          >
            © {currentYear} Gregwa.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;