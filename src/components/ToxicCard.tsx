import React from 'react';
import { motion } from 'framer-motion';
import { ToxicCard as ToxicCardType } from '@/types/card';
import { Zap, MessageSquare, User } from 'lucide-react';

interface Props {
  card: ToxicCardType;
  onUpdateStat: (id: string, stat: string, value: number) => void;
}

export const ToxicCard: React.FC<Props> = ({ card, onUpdateStat }) => {
  return (
    <motion.div 
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      className="w-full max-w-[320px] h-[480px] bg-yellow-400 p-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group flex flex-col gap-2"
    >
      {/* Holographic Header */}
      <div className="holographic-bg p-1 border-4 border-black shrink-0">
        <div className="bg-white/10 px-2 py-1 flex justify-between items-center backdrop-blur-[2px]">
          <span className="font-[family-name:var(--font-heading)] uppercase text-2xl text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)] tracking-tight truncate flex-1 leading-none">{card.name}</span>
          <span className="bg-red-600 text-white px-2 py-0.5 text-[10px] font-black border-2 border-black rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">HP 999</span>
        </div>
      </div>

      {/* Image Area with Halftone */}
      <div className="halftone-pattern aspect-square border-4 border-black relative overflow-hidden shrink-0">
        <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-multiply">
           <User className="w-32 h-32 text-gray-600" strokeWidth={2.5} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Stats Section */}
      <div className="bg-white p-2 border-4 border-black flex-1 flex flex-col justify-between overflow-hidden">
        <div className="space-y-1 overflow-y-auto pr-1">
          {Object.entries(card.stats).map(([stat, value]) => (
            <div key={stat} className="flex items-center justify-between font-[family-name:var(--font-body)] font-bold uppercase text-[10px]">
              <span className="flex items-center gap-1 truncate max-w-[60%]">
                {stat === 'listening' ? <MessageSquare size={12} strokeWidth={3} /> : <Zap size={12} strokeWidth={3} />}
                {stat.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => onUpdateStat(card.id, stat, -1)} 
                  className="bg-red-500 text-white w-6 h-6 flex items-center justify-center border-2 border-black arcade-btn font-black text-sm"
                >-</button>
                <span className="w-6 text-center text-sm">{value}</span>
                <button 
                  onClick={() => onUpdateStat(card.id, stat, 1)} 
                  className="bg-green-500 text-white w-6 h-6 flex items-center justify-center border-2 border-black arcade-btn font-black text-sm"
                >+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Move */}
        <div className="mt-2 pt-2 border-t-2 border-black border-dashed">
          <p className="text-[10px] font-[family-name:var(--font-heading)] uppercase text-red-600 tracking-wider">Signature Move:</p>
          <p className="text-xs font-[family-name:var(--font-body)] font-bold leading-tight line-clamp-2 italic tracking-tighter">{card.signature_move}</p>
        </div>
      </div>

      {/* Rarity Badge */}
      <div className="absolute -bottom-2 -right-2 rotate-[-5deg] z-10">
        <div className="bg-black text-yellow-400 px-3 py-1 text-xs font-[family-name:var(--font-heading)] uppercase border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,0,255,1)] tracking-widest">
          {card.rarity}
        </div>
      </div>
    </motion.div>
  );
};
