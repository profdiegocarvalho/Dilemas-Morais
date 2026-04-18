import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Upload, X, Check, Loader2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface DilemmaFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const DilemmaForm: React.FC<DilemmaFormProps> = ({ onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [optionA, setOptionA] = useState({ description: '', image: null as File | null, preview: '' });
  const [optionB, setOptionB] = useState({ description: '', image: null as File | null, preview: '' });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'A' | 'B') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'A') setOptionA(prev => ({ ...prev, image: file, preview: reader.result as string }));
        else setOptionB(prev => ({ ...prev, image: file, preview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (file: File): Promise<Blob> => {
    console.log(`Iniciando compressão para: ${file.name}`);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        console.error("Erro no FileReader");
        reject(new Error('Erro ao ler arquivo'));
      };
      reader.onload = (event) => {
        const img = new Image();
        img.onerror = () => {
          console.error("Erro ao carregar imagem para compressão");
          reject(new Error('Erro ao carregar imagem'));
        };
        img.onload = () => {
          console.log("Imagem carregada, processando canvas...");
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Não foi possível obter contexto 2d do canvas'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);

          console.log("Gerando blob do canvas...");
          canvas.toBlob(
            (blob) => {
              if (blob) {
                console.log("Blob gerado com sucesso.");
                resolve(blob);
              } else {
                console.error("Falha ao gerar blob do canvas");
                reject(new Error('Canvas to Blob failed'));
              }
            },
            'image/jpeg',
            0.7
          );
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);

      // Timeout de segurança após 10 segundos
      setTimeout(() => reject(new Error('Tempo limite de compressão esgotado')), 10000);
    });
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Falha ao converter Blob para Base64'));
      reader.readAsDataURL(blob);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário submetido. Verificando campos...");
    if (!question || !optionA.description || !optionB.description) {
       alert("Por favor, preencha a pergunta e as descrições das opções.");
       return;
    }

    setLoading(true);
    try {
      console.log("Estado de carregamento ativo.");
      let dataA = '';
      let dataB = '';

      if (optionA.image) {
        console.log("Processando imagem A...");
        const blobA = await compressImage(optionA.image);
        dataA = await blobToBase64(blobA);
      }
      
      if (optionB.image) {
        console.log("Processando imagem B...");
        const blobB = await compressImage(optionB.image);
        dataB = await blobToBase64(blobB);
      }

      console.log("Salvando documento no Firestore (Base64 Mode)...");
      await addDoc(collection(db, 'dilemmas'), {
        question,
        optionA: {
          description: optionA.description,
          imageUrl: dataA || null,
          imagePath: null // Deceased field, kept for schema compatibility
        },
        optionB: {
          description: optionB.description,
          imageUrl: dataB || null,
          imagePath: null
        },
        active: true,
        createdBy: user?.uid || 'anonymous',
        createdAt: serverTimestamp()
      });

      console.log("Sucesso total.");
      onSuccess();
    } catch (error: any) {
      console.error("ERRO CAPTURADO:", error);
      let errorMessage = `Erro: ${error.message || 'Erro desconhecido'}`;
      
      if (error.code === 'permission-denied') {
        errorMessage = "Permissão negada no Firebase. Verifique se você está logado corretamente.";
      }
      
      alert(errorMessage);
    } finally {
      console.log("Finalizando estado de carregamento.");
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="brutal-card bg-surface p-8 max-w-4xl mx-auto border-4 border-black"
    >
      <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
        <h3 className="text-2xl font-black uppercase italic">Criar Novo Dilema</h3>
        <button onClick={onCancel} className="p-2 hover:bg-neutral-800 transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black text-primary">A Pergunta Ética</label>
          <input 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ex: Qual vida deve ser priorizada em caso de falha nos freios?"
            className="w-full p-4 bg-neutral-900 border-2 border-black font-bold focus:border-primary outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Opção A */}
          <div className="space-y-4">
            <label className="text-sm uppercase font-black text-brutal-blue">Opção A (Esquerda)</label>
            <input 
              value={optionA.description}
              onChange={(e) => setOptionA(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição da opção A"
              className="w-full p-3 bg-neutral-900 border-2 border-black font-bold text-sm"
              required
            />
            <div className="relative aspect-video bg-neutral-800 border-2 border-dashed border-black flex items-center justify-center overflow-hidden group">
              {optionA.preview ? (
                <img src={optionA.preview} alt="Preview A" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Clique para subir imagem</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'A')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Opção B */}
          <div className="space-y-4">
            <label className="text-sm uppercase font-black text-brutal-pink">Opção B (Direita)</label>
            <input 
              value={optionB.description}
              onChange={(e) => setOptionB(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição da opção B"
              className="w-full p-3 bg-neutral-900 border-2 border-black font-bold text-sm"
              required
            />
            <div className="relative aspect-video bg-neutral-800 border-2 border-dashed border-black flex items-center justify-center overflow-hidden group">
              {optionB.preview ? (
                <img src={optionB.preview} alt="Preview B" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Clique para subir imagem</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'B')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-black font-black uppercase italic py-4 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              Processando e Enviando...
            </>
          ) : (
            <>
              <Check size={24} />
              Lançar Dilema no Sistema
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
