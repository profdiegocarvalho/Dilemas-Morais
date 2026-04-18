import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { signInWithGoogle, logout } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { DilemmaForm } from '../components/DilemmaForm';
import { DilemmaList } from '../components/DilemmaList';
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Plus, 
  ShieldCheck,
  LayoutDashboard,
  UserCircle,
  ArrowLeft
} from 'lucide-react';

interface AdminPanelProps {
  onNavigate: (view: any) => void;
}

type AdminView = 'profile' | 'create-dilemma' | 'manage-dilemmas';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const { user, profile, isAdmin, loading } = useAuth();
  const [activeView, setActiveView] = useState<AdminView>('profile');

  if (loading) return null;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="brutal-card bg-surface inline-block p-12 text-center space-y-8 max-w-lg">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border-2 border-primary">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">Área de Administração</h2>
          <p className="text-muted-foreground font-medium">Faça login com sua conta Google para acessar as configurações e o seu perfil.</p>
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-primary text-black font-black uppercase italic py-4 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3"
          >
            Entrar com Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-72 space-y-6">
          <div className="brutal-card bg-primary text-black p-6 rotate-[-1deg]">
            <div className="flex items-center gap-4">
               {user.photoURL ? (
                 <img src={user.photoURL} alt={user.displayName || ''} className="w-12 h-12 rounded-full border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]" referrerPolicy="no-referrer" />
               ) : (
                 <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center"><UserIcon size={24} /></div>
               )}
               <div className="overflow-hidden">
                 <p className="font-black truncate uppercase tracking-tighter leading-none">{user.displayName || 'Usuário'}</p>
                 <p className="text-[10px] font-bold opacity-60 uppercase mt-1">{profile?.role || 'Visitante'}</p>
               </div>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveView('profile')}
              className={`w-full flex items-center gap-4 p-4 border-2 border-black transition-colors font-black uppercase italic text-sm ${activeView === 'profile' ? 'bg-primary text-black' : 'bg-surface hover:bg-neutral-800'}`}
            >
                <UserCircle size={20} className={activeView === 'profile' ? 'text-black' : 'text-primary'} />
                Meu Perfil
            </button>
            {isAdmin && (
              <>
                <div className="h-px bg-white/10 my-4" />
                <p className="text-[10px] uppercase font-black text-muted-foreground px-4 py-2">Administração</p>
                <button 
                  onClick={() => setActiveView('manage-dilemmas')}
                  className={`w-full flex items-center gap-4 p-4 border-2 border-black transition-colors font-black uppercase italic text-sm ${activeView === 'manage-dilemmas' ? 'bg-brutal-yellow text-black' : 'bg-surface hover:bg-neutral-800'}`}
                >
                    <LayoutDashboard size={20} className={activeView === 'manage-dilemmas' ? 'text-black' : 'text-brutal-yellow'} />
                    Gerenciar Dilemas
                </button>
                <button 
                  onClick={() => setActiveView('create-dilemma')}
                  className={`w-full flex items-center gap-4 p-4 border-2 border-black transition-colors font-black uppercase italic text-sm ${activeView === 'create-dilemma' ? 'bg-brutal-green text-black' : 'bg-surface hover:bg-neutral-800'}`}
                >
                    <Plus size={20} className={activeView === 'create-dilemma' ? 'text-black' : 'text-brutal-green'} />
                    Novo Dilema
                </button>
              </>
            )}
            <button 
              onClick={logout}
              className="w-full flex items-center gap-4 p-4 border-2 border-black bg-surface hover:bg-destructive/20 transition-colors font-black uppercase italic text-sm mt-8"
            >
                <LogOut size={20} className="text-destructive" />
                Sair
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activeView === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="brutal-card bg-surface space-y-8"
              >
                <div className="border-b-2 border-white/5 pb-6">
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter">Perfil do Usuário</h2>
                  <p className="text-muted-foreground text-sm font-medium mt-1">Gerencie suas informações e contribuições para o ecossistema de ética.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-primary">Nome de Exibição</label>
                     <div className="p-4 bg-neutral-900 border-2 border-black font-bold">{user.displayName}</div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-primary">E-mail</label>
                     <div className="p-4 bg-neutral-900 border-2 border-black font-bold text-muted-foreground">{user.email}</div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-primary">UID do Firebase</label>
                     <div className="p-4 bg-neutral-900 border-2 border-black font-mono text-[10px] truncate">{user.uid}</div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-primary">Data de Criação</label>
                     <div className="p-4 bg-neutral-900 border-2 border-black font-bold">{new Date(user.metadata.creationTime || '').toLocaleDateString()}</div>
                   </div>
                </div>

                <div className="decorative soft-surface p-8 bg-brutal-purple/5 mt-12 border border-brutal-purple/20">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white border-2 border-black text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"><ShieldCheck size={28} /></div>
                      <div>
                        <h4 className="font-black uppercase tracking-tight">Status da Conta</h4>
                        <p className="text-sm font-medium text-muted-foreground italic">Seu perfil está verificado e sincronizado com o Firebase.</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeView === 'create-dilemma' && (
              <motion.div
                key="create"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <DilemmaForm 
                  onSuccess={() => setActiveView('manage-dilemmas')}
                  onCancel={() => setActiveView('profile')}
                />
              </motion.div>
            )}

            {activeView === 'manage-dilemmas' && (
               <motion.div
                 key="manage"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="brutal-card bg-surface space-y-6"
               >
                 <DilemmaList />
                 <button 
                  onClick={() => setActiveView('profile')}
                  className="flex items-center gap-2 mx-auto text-primary font-black uppercase italic hover:underline pt-8"
                 >
                   <ArrowLeft size={16} /> Voltar para o Perfil
                 </button>
               </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
