import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ToxicCard } from '@/types/card';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (card: Partial<ToxicCard>) => void;
}

export const AddCardModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [signatureMove, setSignatureMove] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      signature_move: signatureMove,
      rarity: 'Common',
      stats: {
        listening: 50,
        overexplaining: 50,
        ghosting: 50,
        main_character: 50,
      }
    });
    setName('');
    setSignatureMove('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-yellow-400 p-6 border-4 border-black w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-[family-name:var(--font-heading)] uppercase text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-tighter -rotate-1">Summon Victim</h2>
          <button onClick={onClose} className="bg-red-600 text-white p-1 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1">
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-[family-name:var(--font-heading)] uppercase tracking-wide">Friend&apos;s Name</label>
            <input 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-3 border-4 border-black font-[family-name:var(--font-body)] font-bold uppercase text-base shadow-[inner_4px_4px_0px_rgba(0,0,0,0.1)] focus:outline-none focus:bg-white transition-colors" 
              placeholder="ENTER NAME..." 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-[family-name:var(--font-heading)] uppercase tracking-wide">Signature Move</label>
            <textarea 
              required 
              value={signatureMove} 
              onChange={(e) => setSignatureMove(e.target.value)} 
              className="w-full p-3 border-4 border-black font-[family-name:var(--font-body)] font-bold text-sm h-24 focus:outline-none focus:bg-white transition-colors" 
              placeholder="E.G. EXPLAINS THE JOKE FOR 10 MINUTES" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-[family-name:var(--font-heading)] text-2xl uppercase py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 active:shadow-none active:translate-y-1 transition-all"
          >
            CREATE CARD
          </button>
        </form>
      </div>
    </div>
  );
};
