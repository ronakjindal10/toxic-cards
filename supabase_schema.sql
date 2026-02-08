-- RUN THIS IN THE SUPABASE SQL EDITOR
CREATE TABLE IF NOT EXISTS cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  signature_move TEXT,
  rarity TEXT DEFAULT 'Common',
  stats JSONB DEFAULT '{"listening": 50, "overexplaining": 50, "ghosting": 50, "main_character": 50}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'cards') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE cards;
  END IF;
END $$;

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access" ON cards;
CREATE POLICY "Public access" ON cards FOR ALL USING (true);