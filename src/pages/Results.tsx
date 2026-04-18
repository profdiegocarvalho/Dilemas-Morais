import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { CheckCircle2, RefreshCcw, ArrowLeft, Heart } from 'lucide-react';

interface ResultsProps {
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ onReset }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="brutal-card bg-surface overflow-hidden" role="region" aria-labelledby="results-header">
        <div id="results-header" className="bg-brutal-green p-8 border-b-2 border-black -m-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4 text-black">
                <CheckCircle2 size={40} aria-hidden="true" />
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Obrigado pela Contribuição!</h2>
            </div>
            <div className="hidden md:block bg-black text-white px-4 py-1 font-mono text-xs uppercase font-bold shadow-[2px_2px_0_0_rgba(255,255,255,0.2)]" aria-label="Status da Sessão">
                Status: Concluído
            </div>
        </div>

        <div className="space-y-10">
          <section className="text-center space-y-6" aria-labelledby="help-question">
            <h3 id="help-question" className="text-2xl font-black uppercase tracking-tight text-primary">
              Você gostaria de nos ajudar a entender melhor o seu julgamento?
            </h3>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <button 
                onClick={onReset}
                aria-label="Sim, desejo ajudar com mais informações"
                className="group inline-flex items-center gap-2 bg-brutal-yellow text-black px-12 py-4 border-2 border-black font-black uppercase italic shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                SIM
              </button>
              <button 
                onClick={onReset}
                aria-label="Não, desejo finalizar agora"
                className="group inline-flex items-center gap-2 bg-neutral-800 text-white px-12 py-4 border-2 border-black font-black uppercase italic shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              >
                NÃO
              </button>
            </div>
          </section>

          <section className="soft-surface p-10 space-y-6 decorative" aria-labelledby="mission-title">
            <div className="flex items-center gap-2 text-primary">
               <Heart size={20} fill="currentColor" aria-hidden="true" />
               <h4 id="mission-title" className="font-black uppercase text-sm tracking-widest">A Missão Ética</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-300 leading-relaxed font-medium">
              <p>
                A Moral Machine é um projeto de pesquisa acadêmica que visa explorar as percepções humanas sobre decisões éticas tomadas por sistemas de IA. Seus dados são anônimos e acadêmicos.
              </p>
              <p>
                Ao participar, você contribui para o debate global sobre como devemos programar a ética em máquinas. Esta pesquisa é fundamental para o desenvolvimento de diretrizes de segurança.
              </p>
            </div>
          </section>

          <div className="pt-8 flex justify-center border-t-2 border-black/10">
            <button 
              onClick={onReset}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary font-black uppercase text-xs tracking-[0.2em] transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-[10px] text-muted-foreground uppercase font-bold tracking-[0.3em] opacity-50">
          Laboratório de Ética Computacional &copy; 2026
      </div>
    </div>
  );
};
