import React from 'react';
import { Navbar } from './Navbar';
import { motion, AnimatePresence } from 'motion/react';

interface MainLayoutProps {
  children: React.ReactNode;
  onNavigateAdmin: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavigateAdmin }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <Navbar onAdmin={onNavigateAdmin} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] bg-primary text-black p-4 font-black">
        Pular para o conteúdo principal
      </a>
      <main id="main-content" className="flex-1 relative" role="main">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Decorative Elements for Neubrutalist Vibe */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-primary z-[100] shadow-[0_-2px_10px_rgba(208,188,255,0.3)]" />
    </div>
  );
};
