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

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchCards = async () => {
    const { data } = await supabase.from('cards').select('*').order('created_at', { ascending: true });
    if (data) setCards(data);
  };

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
    <main className="min-h-screen p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-2">
            Toxic <span className="text-yellow-400">Cards</span>
          </h1>
          <p className="text-white font-bold bg-red-600 px-2 py-1 inline-block mt-2 border-4 border-black">
            TRADING CARD GAME: ROAST EDITION
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white font-black px-6 py-4 border-4 border-black hover:scale-110 transition-transform flex items-center gap-2 text-xl">
          <Plus size={28} strokeWidth={4} />
          ADD VICTIM
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {cards.map((card) => (
          <ToxicCard key={card.id} card={card} onUpdateStat={handleUpdateStat} />
        ))}
      </div>

      <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddCard} />
      
      <div className="fixed bottom-4 left-4 flex items-center gap-2">
        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse" />
        <span className="text-white text-xs font-black uppercase tracking-widest">Real-time Stats Active</span>
      </div>
    </main>
  );
}