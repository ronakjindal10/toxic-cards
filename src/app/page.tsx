"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ToxicCard as ToxicCardType } from '@/types/card';
import { ToxicCard } from '@/components/ToxicCard';
import { AddCardModal } from '@/components/AddCardModal';
import { Plus } from 'lucide-react';

export default function Home() {
  const [cards, setCards] = useState<ToxicCardType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await supabase.from('cards').select('*').order('created_at', { ascending: true });
      if (data) setCards(data);
    };

    fetchCards();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cards' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setCards((prev) => [...prev, payload.new as ToxicCardType]);
          } else if (payload.eventType === 'UPDATE') {
            setCards((prev) => prev.map((card) => (card.id === payload.new.id ? { ...card, ...payload.new } : card)));
          }
        }
      )
      .subscribe();

    return () => { 
      supabase.removeChannel(channel); 
    };
  }, []);

  const handleUpdateStat = async (id: string, stat: string, value: number) => {
    const card = cards.find(c => c.id === id);
    if (!card) return;
    const newStats = { ...card.stats, [stat]: Math.max(0, Math.min(100, (card.stats[stat] || 0) + value)) };
    await supabase.from('cards').update({ stats: newStats }).eq('id', id);
  };

  const handleAddCard = async (newCard: Partial<ToxicCardType>) => {
    await supabase.from('cards').insert([newCard]);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 overflow-x-hidden">
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h1 className="text-7xl md:text-9xl font-[family-name:var(--font-heading)] uppercase text-white drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] -rotate-2 tracking-tighter">
            Toxic <span className="text-yellow-400">Cards</span>
          </h1>
          <p className="text-white font-bold bg-red-600 px-3 py-1 inline-block mt-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 text-sm md:text-base">
            TRADING CARD GAME: ROAST EDITION
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-green-500 text-white font-[family-name:var(--font-heading)] px-8 py-4 border-4 border-black hover:scale-105 transition-transform flex items-center gap-3 text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1"
        >
          <Plus size={32} strokeWidth={4} />
          SUMMON VICTIM
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center">
        {cards.map((card) => (
          <ToxicCard key={card.id} card={card} onUpdateStat={handleUpdateStat} />
        ))}
      </div>

      <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddCard} />
      
      <div className="fixed bottom-4 left-4 flex items-center gap-2 z-50">
        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse" />
        <span className="text-white text-xs font-black uppercase tracking-widest bg-black/50 px-2 py-1">Real-time Stats Active</span>
      </div>
    </main>
  );
}