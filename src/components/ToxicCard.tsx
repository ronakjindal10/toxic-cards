import React from 'react';
import { motion } from 'framer-motion';
import { ToxicCard as ToxicCardType } from '@/types/card';
import { Zap, AlertTriangle, MessageSquare } from 'lucide-react';

interface Props {
  card: ToxicCardType;
  onUpdateStat: (id: string, stat: string, value: number) => void;
}

export const ToxicCard: React.FC<Props> = ({ card, onUpdateStat }) => {
  return (
    <motion.div 
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      className="w-80 h-[450px] bg-yellow-400 p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative group"
    >
      <div className="holographic-bg p-1 border-4 border-black mb-2">
        <div className="bg-white px-2 py-0.5 flex justify-between items-center">
          <span className="font-black uppercase italic text-sm truncate">{card.name}</span>
          <span className="bg-red-600 text-white px-1 text-xs font-bold">HP 999</span>
        </div>
      </div>

      <div className="bg-gray-200 aspect-[4/3] border-4 border-black mb-2 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
           <Zap className="w-12 h-12 text-yellow-500 drop-shadow-md" />
        </div>
      </div>

      <div className="bg-white/90 p-2 border-4 border-black h-[180px] flex flex-col justify-between overflow-y-auto">
        <div className="space-y-1">
          {Object.entries(card.stats).map(([stat, value]) => (
            <div key={stat} className="flex items-center justify-between text-[10px] font-bold uppercase">
              <span className="flex items-center gap-1">
                {stat === 'listening' ? <MessageSquare size={10} /> : <Zap size={10} />}
                {stat}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => onUpdateStat(card.id, stat, -1)} className="bg-red-500 text-white w-4 h-4 flex items-center justify-center border-2 border-black">-</button>
                <span className="w-6 text-center">{value}</span>
                <button onClick={() => onUpdateStat(card.id, stat, 1)} className="bg-green-500 text-white w-4 h-4 flex items-center justify-center border-2 border-black">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t-2 border-dashed border-gray-400">
          <p className="text-[9px] font-black uppercase italic text-red-600">Signature Move:</p>
          <p className="text-[11px] font-bold leading-tight">{card.signature_move}</p>
        </div>
      </div>

      <div className="absolute bottom-3 right-3">
        <div className="bg-black text-white px-2 py-0.5 text-[8px] font-bold uppercase rotate-[-5deg]">
          {card.rarity}
        </div>
      </div>
    </motion.div>
  );
};