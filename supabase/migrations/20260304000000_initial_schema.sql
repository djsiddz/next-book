-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  screen_name TEXT UNIQUE,
  profile_picture TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, profile_picture)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Authors
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

-- Books
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  primary_genre TEXT,
  secondary_genre TEXT,
  published_year INTEGER
);

-- Book Authors
CREATE TABLE book_authors (
  book_id UUID REFERENCES books ON DELETE CASCADE,
  author_id UUID REFERENCES authors ON DELETE CASCADE,
  PRIMARY KEY (book_id, author_id)
);

-- Book Editions
CREATE TABLE book_editions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID REFERENCES books ON DELETE CASCADE,
  isbn TEXT,
  format TEXT,
  publisher TEXT,
  publication_year INTEGER,
  cover_image TEXT,
  page_count INTEGER
);

-- External Book IDs
CREATE TABLE external_book_ids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID REFERENCES book_editions ON DELETE CASCADE,
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  url TEXT
);

-- User Books
CREATE TABLE user_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  edition_id UUID REFERENCES book_editions ON DELETE CASCADE,
  reading_status TEXT,
  acquisition_type TEXT,
  acquisition_date DATE,
  acquisition_store TEXT,
  acquisition_price DECIMAL,
  discovery_medium TEXT,
  discovery_source TEXT,
  user_rating INTEGER,
  user_notes TEXT,
  started_date DATE,
  finished_date DATE,
  added_via TEXT
);

-- Reading Logs
CREATE TABLE reading_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_book_id UUID REFERENCES user_books ON DELETE CASCADE,
  log_date TIMESTAMPTZ DEFAULT NOW(),
  pages_read INTEGER,
  minutes_read INTEGER,
  progress_percent DECIMAL,
  notes TEXT
);

-- Book Embeddings
CREATE TABLE book_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID REFERENCES books ON DELETE CASCADE,
  embedding vector(1536),
  model TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Capture Logs
CREATE TABLE capture_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  capture_type TEXT,
  raw_input TEXT,
  processed_data JSONB,
  image_url TEXT,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lists
CREATE TABLE lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- List Books
CREATE TABLE list_books (
  list_id UUID REFERENCES lists ON DELETE CASCADE,
  book_id UUID REFERENCES books ON DELETE CASCADE,
  PRIMARY KEY (list_id, book_id)
);
