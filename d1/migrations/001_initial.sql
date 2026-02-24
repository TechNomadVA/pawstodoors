-- Paws2Doors D1 (SQLite) schema
-- Run: npx wrangler d1 execute paws2doors --remote --file=./d1/migrations/001_initial.sql
-- Local: npx wrangler d1 execute paws2doors --local --file=./d1/migrations/001_initial.sql

-- Users (for auth; can be extended with Lucia or similar)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Profiles (display name, role; one per user)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Dogs
CREATE TABLE IF NOT EXISTS dogs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Dog–owner many-to-many
CREATE TABLE IF NOT EXISTS dog_owners (
  dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  owner_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (dog_id, owner_id)
);

CREATE INDEX IF NOT EXISTS idx_dog_owners_owner ON dog_owners(owner_id);

-- Posts (feed per dog); media_urls stored as JSON array string
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video', 'status')),
  content TEXT,
  media_urls TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_posts_dog_id ON posts(dog_id);

-- Owner requests
CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  owner_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('extra_walk', 'holiday', 'break', 'other')),
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'acknowledged', 'completed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_requests_owner ON requests(owner_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);

-- Optional: contact form submissions (or use Formspree)
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Sessions (for Lucia or simple cookie auth; add when you implement login)
-- CREATE TABLE IF NOT EXISTS sessions (
--   id TEXT PRIMARY KEY,
--   user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   expires_at TEXT NOT NULL,
--   created_at TEXT NOT NULL DEFAULT (datetime('now'))
-- );
