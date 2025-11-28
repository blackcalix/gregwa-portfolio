'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/gregwa' },
    { name: 'Behance', href: 'https://behance.net/gregwa' },
    { name: 'Dribbble', href: 'https://dribbble.com/gregwa' },
    { name: 'Instagram', href: 'https://instagram.com/gregwa' },
  ];

  return (
    <footer
      className="py-12 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: `${colors.bgAlt}60`, borderTop: `1px solid ${colors.border}` }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.a
            href="#"
            className="text-2xl font-bold transition-colors duration-300"
            style={{ color: colors.text, fontFamily: 'var(--font-heading)' }}
            whileHover={{ color: colors.primary }}
          >
            Gregwa<span style={{ color: colors.primary }}>.</span>
          </motion.a>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-widest transition-colors duration-300"
                style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
                whileHover={{ color: colors.primary, y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <p
            className="text-sm"
            style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
          >
            © {currentYear} Gregwa. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;