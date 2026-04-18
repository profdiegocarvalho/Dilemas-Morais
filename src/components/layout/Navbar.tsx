import React from 'react';
import { Globe, Menu, UserCircle } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

interface NavbarProps {
  onAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdmin }) => {
  const { user, profile } = useAuth();

  return (
    <nav className="border-b-2 border-black bg-surface px-6 py-4 sticky top-0 z-[100] shadow-[0_4px_0_0_rgba(0,0,0,1)]" role="navigation" aria-label="Navegação Principal">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => window.location.reload()} // Quick way for now, or use a proper reset
          className="flex items-center gap-3 group"
        >
          <div className="bg-brutal-yellow p-2 border-2 border-black rotate-[-2deg] shadow-[2px_2px_0_0_rgba(0,0,0,1)] group-hover:rotate-0 transition-transform" aria-hidden="true">
             <Menu className="text-black" size={20} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic" role="heading" aria-level={1}>
            DILEMAS <span className="text-primary underline decoration-2 underline-offset-4">ÉTICOS</span>
          </span>
        </button>

        <div className="flex items-center gap-6">
          {user ? (
            <button 
              onClick={onAdmin}
              className="flex items-center gap-3 p-1 pr-4 border-2 border-black bg-surface hover:bg-neutral-800 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
              aria-label="Acessar Perfil e Painel Admin"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-8 h-8 border border-black" referrerPolicy="no-referrer" />
              ) : (
                <UserCircle size={24} className="ml-2" />
              )}
              <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">
                {profile?.role === 'admin' ? 'Admin' : 'Perfil'}
              </span>
            </button>
          ) : (
            <button 
              onClick={onAdmin}
              className="flex items-center gap-2 bg-primary text-black font-black text-xs uppercase px-4 py-2 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
               Entrar
            </button>
          )}

          <div className="h-6 w-px bg-white/10" />

          <button className="hidden sm:flex items-center gap-2 text-foreground font-bold text-xs uppercase px-2 hover:text-primary transition-all">
            <Globe size={14} />
            PT-BR
          </button>
        </div>
      </div>
    </nav>
  );
};
