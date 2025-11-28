'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeColors {
  bg: string;
  bgAlt: string;
  primary: string;
  text: string;
  textMuted: string;
  border: string;
  card: string;
  cardHover: string;
  orb1: string;
  orb2: string;
  orb3: string;
  gridLine: string;
  particle: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes: Record<Theme, ThemeColors> = {
  dark: {
    bg: '#070707',
    bgAlt: '#0a0a0a',
    primary: '#FF3C00',
    text: '#ffffff',
    textMuted: '#8f9194',
    border: '#383738',
    card: 'rgba(20, 20, 20, 0.8)',
    cardHover: 'rgba(40, 40, 40, 0.9)',
    orb1: 'rgba(255, 60, 0, 0.2)',
    orb2: 'rgba(255, 60, 0, 0.15)',
    orb3: 'rgba(143, 145, 148, 0.2)',
    gridLine: 'rgba(255, 255, 255, 0.06)',
    particle: 'rgba(255, 60, 0, 0.6)',
  },
  light: {
    bg: '#f5f5f5',
    bgAlt: '#ffffff',
    primary: '#FF3C00',
    text: '#070707',
    textMuted: '#5a5a5a',
    border: '#d0d0d0',
    card: 'rgba(255, 255, 255, 0.9)',
    cardHover: 'rgba(255, 255, 255, 1)',
    orb1: 'rgba(255, 60, 0, 0.12)',
    orb2: 'rgba(100, 80, 200, 0.1)',
    orb3: 'rgba(0, 150, 200, 0.08)',
    gridLine: 'rgba(0, 0, 0, 0.08)',
    particle: 'rgba(255, 60, 0, 0.5)',
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('gregwa-theme') as Theme;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gregwa-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const colors = themes[theme];

  if (!mounted) {
    return (
      <div style={{ backgroundColor: '#070707', minHeight: '100vh' }} />
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};