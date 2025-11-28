'use client';

import { ReactNode } from 'react';
import { AnimatedBackground, CustomCursor } from '@/components/ui';
import { useTheme } from '@/context/ThemeContext';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh' }}>
      <CustomCursor />
      <AnimatedBackground />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};

export default ClientLayout;