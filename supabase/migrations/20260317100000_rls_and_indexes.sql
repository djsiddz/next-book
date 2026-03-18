-- ============================================================================
-- ENABLE RLS
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_book_ids ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE capture_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_books ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- INDEXES FOR FOREIGN KEYS
-- ============================================================================

-- book_authors.author_id (book_id is covered by composite PK)
CREATE INDEX IF NOT EXISTS ix_book_authors_author_id ON book_authors(author_id);

-- book_editions.book_id
CREATE INDEX IF NOT EXISTS ix_book_editions_book_id ON book_editions(book_id);

-- external_book_ids.edition_id
CREATE INDEX IF NOT EXISTS ix_external_book_ids_edition_id ON external_book_ids(edition_id);

-- user_books foreign keys
CREATE INDEX IF NOT EXISTS ix_user_books_user_id ON user_books(user_id);
CREATE INDEX IF NOT EXISTS ix_user_books_edition_id ON user_books(edition_id);

-- reading_logs foreign keys
CREATE INDEX IF NOT EXISTS ix_reading_logs_user_book_id ON reading_logs(user_book_id);

-- book_embeddings
CREATE INDEX IF NOT EXISTS ix_book_embeddings_book_id ON book_embeddings(book_id);

-- capture_logs
CREATE INDEX IF NOT EXISTS ix_capture_logs_user_id ON capture_logs(user_id);

-- lists
CREATE INDEX IF NOT EXISTS ix_lists_user_id ON lists(user_id);

-- list_books (list_id is covered by composite PK)
CREATE INDEX IF NOT EXISTS ix_list_books_book_id ON list_books(book_id);

-- ============================================================================
-- POLICIES
-- ============================================================================

-- 1. Shared Catalog (Books, Authors, Editions, Embeddings, External IDs)
-- Read-only for everyone (public).
-- Insert allowed for authenticated users to crowdsource the catalog.
-- Update/Delete restricted (implicitly denied) to prevent griefing.

CREATE POLICY "Books are viewable by everyone" ON books FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert books" ON books FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authors are viewable by everyone" ON authors FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert authors" ON authors FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Book authors are viewable by everyone" ON book_authors FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert book_authors" ON book_authors FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Book editions are viewable by everyone" ON book_editions FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert book_editions" ON book_editions FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "External book IDs are viewable by everyone" ON external_book_ids FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert external_book_ids" ON external_book_ids FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Embeddings viewable by everyone" ON book_embeddings FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert embeddings" ON book_embeddings FOR INSERT TO authenticated WITH CHECK (true);

-- 2. User Profiles
-- Publicly viewable, but only the owner can update. (Insert is handled via trigger)
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Private / User-Scoped Data
-- Manageable strictly by the owner (user_id = auth.uid())

CREATE POLICY "Users manage own user_books" ON user_books FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own capture_logs" ON capture_logs FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own reading_logs" ON reading_logs FOR ALL 
USING (EXISTS (SELECT 1 FROM user_books WHERE user_books.id = user_book_id AND user_books.user_id = auth.uid()));

-- 4. Lists & Sharing
-- Owners can manage fully. Others can only read if public = true.

CREATE POLICY "Users manage own lists" ON lists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public lists are viewable by everyone" ON lists FOR SELECT USING (public = true);

CREATE POLICY "Users manage books in own lists" ON list_books FOR ALL
USING (EXISTS (SELECT 1 FROM lists WHERE lists.id = list_id AND lists.user_id = auth.uid()));

CREATE POLICY "Public list books are viewable by everyone" ON list_books FOR SELECT
USING (EXISTS (SELECT 1 FROM lists WHERE lists.id = list_id AND lists.public = true));
