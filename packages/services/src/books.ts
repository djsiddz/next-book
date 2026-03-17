import { SupabaseClient } from '@supabase/supabase-js'

export async function addBookToLibrary(supabase: SupabaseClient, userId: string, googleBook: any) {
    const { volumeInfo } = googleBook

    // 1. Check if author exists or create
    const authorNames = volumeInfo.authors || ['Unknown']
    const authorIds = []

    for (const name of authorNames) {
        let { data: author } = await supabase
            .from('authors')
            .select('id')
            .eq('name', name)
            .single()

        if (!author) {
            const { data: newAuthor, error } = await supabase
                .from('authors')
                .insert({ name })
                .select('id')
                .single()

            if (error) throw error
            author = newAuthor
        }
        authorIds.push(author.id)
    }

    // 2. Check if book exists (by title and authors) or create
    // Simplified for MVP: always create a new book to avoid complex matching logic now
    const { data: book, error: bookError } = await supabase
        .from('books')
        .insert({
            title: volumeInfo.title,
            subtitle: volumeInfo.subtitle,
            description: volumeInfo.description,
            primary_genre: volumeInfo.categories?.[0] || 'Unknown',
            published_year: volumeInfo.publishedDate ? parseInt(volumeInfo.publishedDate.substring(0, 4)) : null,
        })
        .select('id')
        .single()

    if (bookError) throw bookError

    // 3. Link authors
    for (const authorId of authorIds) {
        await supabase.from('book_authors').insert({
            book_id: book.id,
            author_id: authorId
        })
    }

    // 4. Create edition
    const isbn13 = volumeInfo.industryIdentifiers?.find((id: any) => id.type === 'ISBN_13')?.identifier

    const { data: edition, error: editionError } = await supabase
        .from('book_editions')
        .insert({
            book_id: book.id,
            isbn: isbn13,
            publisher: volumeInfo.publisher,
            publication_year: volumeInfo.publishedDate ? parseInt(volumeInfo.publishedDate.substring(0, 4)) : null,
            cover_image: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:'),
            page_count: volumeInfo.pageCount
        })
        .select('id')
        .single()

    if (editionError) throw editionError

    // 5. Create user_book association
    const { error: userBookError } = await supabase
        .from('user_books')
        .insert({
            user_id: userId,
            edition_id: edition.id,
            reading_status: 'want_to_read',
            added_via: 'search'
        })

    if (userBookError) throw userBookError

    return book.id
}
