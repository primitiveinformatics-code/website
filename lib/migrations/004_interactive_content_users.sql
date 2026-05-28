-- Interactive content users — controls access to the main course concept pages
CREATE TABLE IF NOT EXISTS interactive_content_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_interactive_content_users_email ON interactive_content_users(email);
CREATE INDEX IF NOT EXISTS idx_interactive_content_users_status ON interactive_content_users(status);
