-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT DEFAULT 'Primitive Informatics',
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at) VALUES
('mastering-system-design-interviews', 'Mastering System Design Interviews in 2025', 'A comprehensive guide to approaching system design questions with confidence. Learn the frameworks that top engineers use to crack FAANG interviews.', '## Introduction\nSystem design interviews test your ability to architect scalable systems...', 'Primitive Informatics', ARRAY['System Design', 'Interview Prep', 'Engineering'], true, NOW() - INTERVAL '5 days'),
('top-dsa-patterns-for-interviews', 'Top 10 DSA Patterns Every Developer Must Know', 'From sliding window to dynamic programming — these patterns appear in 80% of coding interviews. Master them and solve any problem.', '## Why Patterns Matter\nInstead of memorizing solutions...', 'Primitive Informatics', ARRAY['DSA', 'Algorithms', 'Coding'], true, NOW() - INTERVAL '10 days'),
('behavioral-interview-star-method', 'The STAR Method: Ace Every Behavioral Interview', 'Situation, Task, Action, Result — the framework that separates great candidates from good ones. Real examples included.', '## What is STAR?\nThe STAR method is a structured approach...', 'Primitive Informatics', ARRAY['Behavioral', 'Interview Tips', 'Soft Skills'], true, NOW() - INTERVAL '15 days'),
('ai-in-technical-interviews', 'How AI is Changing Technical Interviews in 2025', 'Companies are increasingly using AI-powered tools in their hiring process. Here is what candidates need to know.', '## The AI Interview Revolution\nArtificial intelligence is reshaping...', 'Primitive Informatics', ARRAY['AI', 'Trends', 'Interview Prep'], true, NOW() - INTERVAL '20 days')
ON CONFLICT (slug) DO NOTHING;

-- Playlists
CREATE TABLE IF NOT EXISTS playlists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  type TEXT CHECK (type IN ('video', 'podcast')) DEFAULT 'video',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Playlist items
CREATE TABLE IF NOT EXISTS playlist_items (
  id SERIAL PRIMARY KEY,
  playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
  youtube_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  duration TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample playlists
INSERT INTO playlists (name, description, type) VALUES
('System Design Masterclass', 'End-to-end system design interview preparation', 'video'),
('DSA Crash Course', 'Data structures and algorithms from scratch', 'video'),
('Career Growth Podcast', 'Insights from industry leaders on career acceleration', 'podcast')
ON CONFLICT DO NOTHING;
