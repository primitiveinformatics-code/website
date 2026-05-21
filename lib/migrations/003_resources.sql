-- Resource categories (for Audio & Video Google Drive resources)
CREATE TABLE IF NOT EXISTS resource_categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google Drive resources
CREATE TABLE IF NOT EXISTS resources (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES resource_categories(id) ON DELETE SET NULL,
  gdrive_url TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default categories
INSERT INTO resource_categories (name) VALUES
  ('Technical'), ('Behavioral'), ('Soft Skills'), ('Career Growth'), ('Industry Insights')
ON CONFLICT DO NOTHING;
