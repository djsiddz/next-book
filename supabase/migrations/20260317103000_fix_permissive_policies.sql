-- Fix multiple permissive SELECT policies on lists and list_books.
-- FOR ALL policies implicitly include SELECT, causing Postgres to evaluate two
-- SELECT policies per read query. Split into explicit per-action policies so
-- only one SELECT policy applies per query.

-- Lists
DROP POLICY IF EXISTS "Users manage own lists (Insert/Update/Delete)" ON lists;

CREATE POLICY "Users can insert own lists" ON lists FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can update own lists" ON lists FOR UPDATE USING ((select auth.uid()) = user_id);
CREATE POLICY "Users can delete own lists" ON lists FOR DELETE USING ((select auth.uid()) = user_id);

-- List Books
DROP POLICY IF EXISTS "Users manage books in own lists (Insert/Update/Delete)" ON list_books;

-- list_books rows are never updated in-place (books are added/removed), so no UPDATE policy needed.
CREATE POLICY "Users can insert books into own lists" ON list_books FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM lists WHERE lists.id = list_id AND lists.user_id = (select auth.uid())));

CREATE POLICY "Users can delete books from own lists" ON list_books FOR DELETE
USING (EXISTS (SELECT 1 FROM lists WHERE lists.id = list_id AND lists.user_id = (select auth.uid())));
