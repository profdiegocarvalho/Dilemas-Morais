import React, { useState, useEffect } from 'react';
import { Dilemma, Scenario } from '../types';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ChevronRight, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { ScenarioImage } from '../components/ScenarioImage';

interface JudgeProps {
  onComplete: () => void;
}

export const Judge: React.FC<JudgeProps> = ({ onComplete }) => {
  const [dilemmas, setDilemmas] = useState<Dilemma[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showDescA, setShowDescA] = useState(false);
  const [showDescB, setShowDescB] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // Limited fetch (10 dilemmas max) for performance
        const q = query(
          collection(db, 'dilemmas'), 
          where('active', '==', true),
          limit(10)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Dilemma[];

        if (data.length > 0) {
          // Shuffle the fetched batch
          setDilemmas(data.sort(() => Math.random() - 0.5));
        } else {
          setDilemmas([]); // Empty state if no manual data exists
        }
      } catch (err) {
        console.error("Error loading dilemmas:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChoice = (choice: 'A' | 'B') => {
    if (currentIndex < dilemmas.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowDescA(false);
      setShowDescB(false);
    } else {
      onComplete();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <div className="relative w-20 h-20">
           <div className="absolute inset-0 border-4 border-black bg-brutal-yellow animate-bounce shadow-[4px_4px_0_0_rgba(0,0,0,1)]"></div>
           <div className="absolute inset-x-2 top-2 h-2 bg-black animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
            <h3 className="text-2xl font-black uppercase italic tracking-widest">Preparando Sessão</h3>
            <p className="text-muted-foreground font-bold font-mono">Carregando dilemas do banco de dados...</p>
        </div>
      </div>
    );
  }

  if (dilemmas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 max-w-md mx-auto text-center">
        <AlertTriangle size={48} className="text-brutal-yellow" />
        <h3 className="text-2xl font-black uppercase italic">Nenhum dilema cadastrado</h3>
        <p className="text-muted-foreground font-bold italic">
          O administrador ainda não cadastrou dilemas manuais no sistema.
        </p>
      </div>
    );
  }

  const current = dilemmas[currentIndex];

  const renderScenario = (scenario: Scenario, isOptionA: boolean) => {
    const showDesc = isOptionA ? showDescA : showDescB;
    const accentColor = isOptionA ? 'bg-brutal-red' : 'bg-brutal-blue';

    return (
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative w-full group">
            <motion.div
              whileHover={{ scale: 1.02, rotate: isOptionA ? -1 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`cursor-pointer overflow-hidden border-4 border-black p-2 bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-all`}
              onClick={() => handleChoice(isOptionA ? 'A' : 'B')}
              role="button"
              tabIndex={0}
              aria-label={`Escolher Opção ${isOptionA ? 'A' : 'B'}: ${scenario.description}`}
            >
              <div className="aspect-[4/5] bg-slate-100 border-2 border-black overflow-hidden relative">
                 {scenario.imageUrl ? (
                   <img 
                    src={scenario.imageUrl} 
                    alt={scenario.description} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                   />
                 ) : (
                   <ScenarioImage scenario={scenario} />
                 )}
                 <div className={`absolute top-4 left-4 ${accentColor} border-2 border-black px-4 py-1 font-black text-black uppercase text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]`} aria-hidden="true">
                    OPÇÃO {isOptionA ? 'A' : 'B'}
                 </div>
              </div>
            </motion.div>
        </div>

        <div className="w-full space-y-4">
          <button
            onClick={() => isOptionA ? setShowDescA(!showDescA) : setShowDescB(!showDescB)}
            aria-expanded={showDesc}
            className="w-full flex items-center justify-between p-4 bg-surface border-2 border-black font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            <div className="flex items-center gap-3">
               <ImageIcon size={16} className="text-primary" />
               Visão Geral
            </div>
            <ChevronRight size={16} className={`transition-transform duration-300 ${showDesc ? 'rotate-90' : ''}`} />
          </button>
          
          <AnimatePresence>
            {showDesc && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-surface-variant border-x-2 border-b-2 border-black font-bold text-sm leading-relaxed border-t-0 -mt-4 italic shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                  {scenario.description}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="space-y-1" aria-live="polite">
            <div className="flex items-center gap-2 text-brutal-pink font-black text-xs uppercase tracking-[0.3em]" aria-hidden="true">
               <AlertTriangle size={14} />
               Julgamento em Curso
            </div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">
              {current.question}
            </h2>
        </div>
        
        <div 
          className="soft-surface px-8 py-4 flex items-center gap-4 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-brutal-yellow text-black rotate-[2deg] decorative"
          aria-label={`Progresso: Questão ${currentIndex + 1} de ${dilemmas.length}`}
        >
            <div className="font-black text-2xl font-mono" aria-hidden="true">
                {String(currentIndex + 1).padStart(2, '0')}<span className="opacity-30">/</span>{String(dilemmas.length).padStart(2, '0')}
            </div>
            <div className="h-4 w-[2px] bg-black/20" aria-hidden="true" />
            <div className="text-[10px] uppercase font-black tracking-widest leading-none" aria-hidden="true">Cenário<br/>Atual</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-4 decorative" aria-hidden="true">
             <div className="w-16 h-16 rounded-full bg-black border-4 border-primary flex items-center justify-center font-black text-2xl text-primary shadow-[0_0_20px_rgba(208,188,255,0.3)]">
                VS
             </div>
             <div className="h-32 w-1 bg-gradient-to-b from-transparent via-black to-transparent" />
        </div>
        
        <AnimatePresence mode="wait">
            <motion.div
              key={`option-a-${currentIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderScenario(current.optionA, true)}
            </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
            <motion.div
              key={`option-b-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderScenario(current.optionB, false)}
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-20 flex flex-col items-center gap-4">
        <div className="px-10 py-3 bg-primary text-black font-black uppercase text-xs tracking-[0.4em] shadow-[4px_4px_0_0_rgba(0,0,0,1)] border-2 border-black italic">
          Clique na imagem para decidir
        </div>
        <div className="flex gap-2">
            {[...Array(dilemmas.length)].map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1.5 w-6 border border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)] transition-colors ${i <= currentIndex ? 'bg-primary' : 'bg-surface'}`} 
                />
            ))}
        </div>
      </div>
    </div>
  );
};
