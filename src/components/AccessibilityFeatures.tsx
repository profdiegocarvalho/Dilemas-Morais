import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../lib/AccessibilityContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Accessibility, 
  Eye, 
  Focus, 
  Contrast, 
  X, 
  ChevronUp,
  Hash
} from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    guidedReading, 
    focusMode, 
    highContrast, 
    monochrome, 
    updateSetting 
  } = useAccessibility();

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="brutal-card bg-surface w-72 mb-2 p-6 space-y-4 shadow-[8px_8px_0_0_rgba(208,188,255,1)]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-black uppercase italic tracking-wider text-primary">Acessibilidade</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <AccessibilityToggle 
                label="Leitura Guiada" 
                active={guidedReading} 
                icon={<Hash size={18} />}
                onToggle={(v) => updateSetting('guidedReading', v)} 
              />
              <AccessibilityToggle 
                label="Modo de Foco" 
                active={focusMode} 
                icon={<Focus size={18} />}
                onToggle={(v) => updateSetting('focusMode', v)} 
              />
              <AccessibilityToggle 
                label="Alto Contraste" 
                active={highContrast} 
                icon={<Contrast size={18} />}
                onToggle={(v) => updateSetting('highContrast', v)} 
              />
              <AccessibilityToggle 
                label="Cores Mínimas" 
                active={monochrome} 
                icon={<Eye size={18} />}
                onToggle={(v) => updateSetting('monochrome', v)} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] ${isOpen ? 'bg-primary text-black' : 'bg-brutal-purple text-white'}`}
        aria-label="Menu de Acessibilidade"
      >
        <Accessibility size={28} />
      </button>
    </div>
  );
};

const AccessibilityToggle: React.FC<{
  label: string;
  active: boolean;
  onToggle: (v: boolean) => void;
  icon: React.ReactNode;
}> = ({ label, active, onToggle, icon }) => (
  <button
    onClick={() => onToggle(!active)}
    className={`w-full flex items-center justify-between p-3 border-2 border-black transition-all ${active ? 'bg-primary text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' : 'bg-surface hover:bg-neutral-800'}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-xs font-black uppercase tracking-wider">{label}</span>
    </div>
    <div className={`w-4 h-4 border-2 border-black flex items-center justify-center ${active ? 'bg-white' : 'bg-transparent'}`}>
      {active && <div className="w-2 h-2 bg-black" />}
    </div>
  </button>
);

export const GuidedReadingOverlay: React.FC = () => {
  const { guidedReading } = useAccessibility();
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    if (!guidedReading) return;
    const handleMouseMove = (e: MouseEvent) => setMouseY(e.clientY);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [guidedReading]);

  if (!guidedReading) return null;

  return (
    <div 
      className="focus-line" 
      style={{ top: mouseY }} 
    />
  );
};
