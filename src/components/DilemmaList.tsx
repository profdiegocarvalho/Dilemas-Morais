import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Dilemma } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Loader2, AlertCircle, ExternalLink, Check } from 'lucide-react';

export const DilemmaList: React.FC = () => {
  const [dilemmas, setDilemmas] = useState<Dilemma[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDilemmas = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'dilemmas'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Dilemma[];
      setDilemmas(data);
    } catch (error) {
      console.error("Erro ao buscar dilemas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDilemmas();
  }, []);

  const handleDelete = async (dilemma: Dilemma) => {
    if (!window.confirm("Tem certeza que deseja deletar este dilema? Esta ação é irreversível.")) return;

    setDeletingId(dilemma.id as string);
    try {
      // images are embedded as Base64 in the document, so deleting the doc cleans up everything
      await deleteDoc(doc(db, 'dilemmas', dilemma.id as string));
      setDilemmas(prev => prev.filter(d => d.id !== dilemma.id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar dilema. Verifique as permissões.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="font-black uppercase italic text-sm">Carregando Acervo Ético...</p>
      </div>
    );
  }

  if (dilemmas.length === 0) {
    return (
      <div className="text-center p-20 border-4 border-dashed border-black bg-neutral-900">
        <AlertCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-black uppercase italic">Nenhum dilema encontrado</h3>
        <p className="text-muted-foreground font-medium mt-2">Você ainda não criou dilemas customizados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-white/10">
        <h3 className="text-2xl font-black uppercase italic">Dilemas Registrados</h3>
        <span className="bg-primary text-black px-3 py-1 font-black text-xs border-2 border-black">
          {dilemmas.length} TOTAIS
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {dilemmas.map((d) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="brutal-card bg-neutral-900 border-2 border-black p-6 flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Previews */}
              <div className="flex gap-2">
                <div className="w-24 h-24 border-2 border-black bg-black flex-shrink-0 overflow-hidden">
                  {d.optionA.imageUrl ? <img src={d.optionA.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <div className="w-full h-full bg-brutal-blue/20" />}
                </div>
                <div className="w-24 h-24 border-2 border-black bg-black flex-shrink-0 overflow-hidden">
                  {d.optionB.imageUrl ? <img src={d.optionB.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <div className="w-full h-full bg-brutal-pink/20" />}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <h4 className="font-black uppercase italic text-lg leading-tight tracking-tighter">
                  {d.question}
                </h4>
                <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase text-muted-foreground">
                  <span>ID: {String(d.id).slice(0, 8)}...</span>
                  <span className="flex items-center gap-1">
                    <Check size={10} className="text-brutal-green" /> Ativo
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button 
                  onClick={() => handleDelete(d)}
                  disabled={deletingId === d.id}
                  className="p-4 bg-destructive/10 border-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] disabled:opacity-50"
                  title="Deletar Dilema"
                >
                  {deletingId === d.id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
