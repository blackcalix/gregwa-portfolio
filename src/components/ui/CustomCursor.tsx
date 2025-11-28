'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const CustomCursor = () => {
  const { colors } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Point central */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          backgroundColor: colors.primary,
        }}
        animate={{
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Anneau externe */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full border-2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          borderColor: colors.primary,
        }}
        animate={{
          width: isHovering ? 50 : 32,
          height: isHovering ? 50 : 32,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;