'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ui';

const Header = () => {
  const { colors, theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projets', href: '#gallery' },
    { name: 'À propos', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Couleurs dynamiques pour le menu mobile
  const isDark = theme === 'dark';

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          padding: isScrolled ? '1rem 1.5rem' : '1.5rem 2rem', // Padding responsive
          backgroundColor: isScrolled ? (isDark ? 'rgba(7, 7, 7, 0.85)' : 'rgba(255, 255, 255, 0.85)') : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? `1px solid ${colors.border}` : '1px solid transparent',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <motion.a
            href="#"
            className="relative z-[101] text-xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: colors.text }}
            whileHover={{ scale: 1.05 }}
            onClick={handleLinkClick}
          >
            Gregwa<span style={{ color: colors.primary }}>.</span>
          </motion.a>

          {/* NAVIGATION DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium transition-colors duration-300"
                style={{ color: colors.text, fontFamily: 'var(--font-body)' }}
                whileHover={{ color: colors.primary }}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full origin-right"
                  style={{ backgroundColor: colors.primary, scaleX: 0 }}
                  whileHover={{ scaleX: 1, originX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            <div className="w-px h-6 mx-2" style={{ backgroundColor: colors.border }} />
            
            <ThemeToggle />

            <motion.a
              href="#contact"
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: colors.primary,
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
              }}
              whileHover={{ scale: 1.05, backgroundColor: isDark ? '#ff5722' : '#e63600' }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s Talk
            </motion.a>
          </div>

          {/* CONTROLES MOBILE (Toggle + Burger) */}
          <div className="flex md:hidden items-center gap-4 relative z-[101]">
            <ThemeToggle />

            {/* Burger Menu Icon - PREMIUM */}
            <motion.button
              className="relative w-10 h-10 flex flex-col justify-center items-center gap-[6px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
              whileTap={{ scale: 0.9 }}
            >
              {/* Ligne du haut */}
              <motion.span
                className="w-6 h-[2px] rounded-full origin-center"
                style={{ backgroundColor: colors.text }}
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: "backOut" }}
              />
              {/* Ligne du milieu */}
              <motion.span
                className="w-6 h-[2px] rounded-full origin-center"
                style={{ backgroundColor: colors.text }}
                animate={{
                  scaleX: isMobileMenuOpen ? 0 : 1,
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Ligne du bas */}
              <motion.span
                className="w-6 h-[2px] rounded-full origin-center"
                style={{ backgroundColor: colors.text }}
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: "backOut" }}
              />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* MENU MOBILE FULLSCREEN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-center items-center"
            style={{ 
              backgroundColor: isDark ? 'rgba(7, 7, 7, 0.98)' : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)'
            }}
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Background décoratif */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute -top-[20%] -right-[20%] w-[80vw] h-[80vw] rounded-full blur-[100px]"
                style={{ background: `radial-gradient(circle, ${colors.primary}30, transparent 70%)` }}
              />
              <motion.div 
                className="absolute -bottom-[20%] -left-[20%] w-[80vw] h-[80vw] rounded-full blur-[100px]"
                style={{ background: `radial-gradient(circle, ${colors.primary}20, transparent 70%)` }}
              />
            </div>

            {/* Liens du menu */}
            <nav className="flex flex-col items-center gap-8 relative z-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-bold tracking-tight"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    color: colors.text,
                    WebkitTextStroke: isDark ? '1px rgba(255,255,255,0.1)' : '1px rgba(0,0,0,0.1)'
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  onClick={handleLinkClick}
                  whileTap={{ scale: 0.95, color: colors.primary }}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                className="w-12 h-1 rounded-full mt-4 mb-4"
                style={{ backgroundColor: colors.border }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4 }}
              />

              <motion.a
                href="#contact"
                className="text-lg font-medium uppercase tracking-widest"
                style={{ color: colors.primary, fontFamily: 'var(--font-body)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleLinkClick}
              >
                Contact Me
              </motion.a>
            </nav>

            {/* Réseaux sociaux en bas */}
            <motion.div 
              className="absolute bottom-12 flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a href="https://instagram.com/gregwadizay" target="_blank" rel="noreferrer" style={{ color: colors.textMuted }}>
                Instagram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;