import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Scale, Info, Play, BarChart3 } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Section */}
        <section className="lg:col-span-7 space-y-8" aria-labelledby="hero-title">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="decorative inline-block px-4 py-1.5 bg-brutal-pink text-black border-2 border-black font-black uppercase text-xs tracking-[0.2em] shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          >
            Pesquisa Experimental
          </motion.div>
          
          <h1 id="hero-title" className="text-6xl md:text-8xl font-black uppercase italic leading-[0.9] tracking-tighter">
            O MOTOR DA <br />
            <span className="text-primary not-italic">MORALIDADE</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-xl font-medium leading-relaxed">
            Como as máquinas devem escolher quando vidas estão em jogo? 
            Participe de um dos maiores experimentos éticos do mundo e 
            ajude a moldar o futuro da inteligência artificial.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            <button 
              onClick={onStart}
              aria-label="Iniciar o julgamento dos dilemas morais"
              className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-black text-xl uppercase italic border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
            >
              <Play size={24} fill="currentColor" aria-hidden="true" />
              Começar Julgamento
            </button>
            
            <button 
              className="inline-flex items-center gap-2 px-8 py-4 bg-surface border-2 border-black font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              aria-label="Saber mais sobre o projeto Moral Machine"
            >
              <Info size={20} aria-hidden="true" />
              Sobre o Projeto
            </button>
          </div>
        </section>

        {/* Feature Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-6" role="complementary" aria-label="Características do sistema">
          <div className="brutal-card bg-brutal-yellow text-black rotate-[1deg] decorative">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]" aria-hidden="true">
                <Scale size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase">Dilemas Reais</h3>
                <p className="text-sm font-bold opacity-80 mt-1">Cenários baseados em situações complexas de carros autônomos.</p>
              </div>
            </div>
          </div>

          <div className="brutal-card bg-brutal-green text-black rotate-[-1deg] translate-x-2 decorative">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]" aria-hidden="true">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase">Impacto Global</h3>
                <p className="text-sm font-bold opacity-80 mt-1">Seus julgamentos influenciam políticas mundiais de ética em IA.</p>
              </div>
            </div>
          </div>

          <div className="soft-surface p-8 border-2 border-transparent decorative">
             <div className="flex items-center gap-4 text-primary">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <span className="font-black text-lg">💡</span>
                </div>
                <div>
                   <h4 className="font-black uppercase tracking-wider text-sm">Privacidade Total</h4>
                   <p className="text-xs text-muted-foreground">Todos os dados coletados são anônimos e acadêmicos.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
