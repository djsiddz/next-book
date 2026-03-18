-- Profiles
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING ((select auth.uid()) = id);

-- User Books
DROP POLICY IF EXISTS "Users manage own user_books" ON user_books;
CREATE POLICY "Users manage own user_books" ON user_books FOR ALL USING ((select auth.uid()) = user_id);

-- Capture Logs
DROP POLICY IF EXISTS "Users manage own capture_logs" ON capture_logs;
CREATE POLICY "Users manage own capture_logs" ON capture_logs FOR ALL USING ((select auth.uid()) = user_id);

-- Reading Logs
DROP POLICY IF EXISTS "Users manage own reading_logs" ON reading_logs;
CREATE POLICY "Users manage own reading_logs" ON reading_logs FOR ALL 
USING (EXISTS (SELECT 1 FROM user_books WHERE user_books.id = user_book_id AND user_books.user_id = (select auth.uid())));

-- Lists
DROP POLICY IF EXISTS "Users manage own lists" ON lists;
DROP POLICY IF EXISTS "Public lists are viewable by everyone" ON lists;

CREATE POLICY "Users manage own lists (Insert/Update/Delete)" ON lists FOR ALL USING ((select auth.uid()) = user_id);
CREATE POLICY "Lists are viewable by owner or via public" ON lists FOR SELECT USING (((select auth.uid()) = user_id) OR (public = true));

-- List Books
DROP POLICY IF EXISTS "Users manage books in own lists" ON list_books;
DROP POLICY IF EXISTS "Public list books are viewable by everyone" ON list_books;

CREATE POLICY "Users manage books in own lists (Insert/Update/Delete)" ON list_books FOR ALL
USING (EXISTS (SELECT 1 FROM lists WHERE lists.id = list_id AND lists.user_id = (select auth.uid())));

CREATE POLICY "List books are viewable by owner or via public" ON list_books FOR SELECT
USING (EXISTS (SELECT 1 FROM lists WHERE lists.id = list_id AND (((select auth.uid()) = lists.user_id) OR (lists.public = true))));

-- Shared Catalog (Books, Authors, Editions, Embeddings, External IDs)
-- Replace WITH CHECK (true) with restrictive condition for authenticated inserts
DROP POLICY IF EXISTS "Authenticated can insert books" ON books;
CREATE POLICY "Authenticated can insert books" ON books FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated can insert authors" ON authors;
CREATE POLICY "Authenticated can insert authors" ON authors FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated can insert book_authors" ON book_authors;
CREATE POLICY "Authenticated can insert book_authors" ON book_authors FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated can insert book_editions" ON book_editions;
CREATE POLICY "Authenticated can insert book_editions" ON book_editions FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated can insert external_book_ids" ON external_book_ids;
CREATE POLICY "Authenticated can insert external_book_ids" ON external_book_ids FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated can insert embeddings" ON book_embeddings;
CREATE POLICY "Authenticated can insert embeddings" ON book_embeddings FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) IS NOT NULL);
