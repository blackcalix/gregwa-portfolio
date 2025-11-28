'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ui';

const Header = () => {
  const { colors } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projets', href: '#gallery' },
    { name: 'À propos', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? `${colors.bg}f5` : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? `1px solid ${colors.border}50` : '1px solid transparent',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between h-14 md:h-16"
          role="navigation"
          aria-label="Navigation principale"
        >
          {/* Logo - Compact */}
          <motion.a
            href="#"
            className="text-xl md:text-2xl font-bold z-50 relative"
            style={{ fontFamily: 'var(--font-heading)', color: colors.text }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            aria-label="Gregwa - Accueil"
          >
            <span className="hidden sm:inline">Gregwa</span>
            <span className="sm:hidden">G</span>
            <span style={{ color: colors.primary }}>.</span>
          </motion.a>

          {/* Navigation Desktop - Compact */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium transition-colors duration-300"
                style={{ color: colors.text, fontFamily: 'var(--font-body)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ y: -2, color: colors.primary }}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 origin-left"
                  style={{ backgroundColor: colors.primary }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>

            {/* CTA Button - Plus petit */}
            <motion.a
              href="#contact"
              className="px-5 py-2 rounded-full font-semibold text-xs tracking-wider transition-all duration-300"
              style={{
                backgroundColor: colors.primary,
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Contact
            </motion.a>
          </div>

          {/* Mobile: Theme Toggle + Burger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />

            <motion.button
              className="relative z-50 w-9 h-9 flex flex-col justify-center items-center gap-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="w-5 h-0.5 block"
                style={{ backgroundColor: colors.text }}
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 3 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 block"
                style={{ backgroundColor: colors.text }}
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  x: isMobileMenuOpen ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 block"
                style={{ backgroundColor: colors.text }}
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -3 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Menu Mobile Fullscreen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center items-center"
            style={{ backgroundColor: colors.bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 30%, ${colors.primary}20 0%, transparent 60%)`,
              }}
              aria-hidden="true"
            />

            <nav className="relative z-10 flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-3xl sm:text-4xl font-bold transition-colors duration-300"
                  style={{ color: colors.text, fontFamily: 'var(--font-heading)' }}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ x: 10, color: colors.primary }}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className="mt-6 px-8 py-3 rounded-full font-semibold text-base"
                style={{
                  backgroundColor: colors.primary,
                  color: '#ffffff',
                  fontFamily: 'var(--font-heading)',
                }}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;