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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-yellow-400 p-4 border-4 border-black w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black italic uppercase text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Summon Victim</h2>
          <button onClick={onClose} className="bg-red-600 text-white p-1 border-2 border-black">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-black uppercase">Friend's Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border-4 border-black font-bold uppercase text-sm" placeholder="Enter name..." />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-black uppercase">Signature Move</label>
            <textarea required value={signatureMove} onChange={(e) => setSignatureMove(e.target.value)} className="w-full p-2 border-4 border-black font-bold text-sm h-20" placeholder="e.g. Explains the joke for 10 minutes" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-black uppercase py-3 border-4 border-black hover:bg-blue-700">Create Card</button>
        </form>
      </div>
    </div>
  );
};