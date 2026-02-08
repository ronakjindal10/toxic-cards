export type ToxicCard = {
  id: string;
  name: string;
  signature_move: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Toxic AF';
  stats: Record<string, number>;
  created_at: string;
};