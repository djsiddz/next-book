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

export async function getBookDetail(supabase: SupabaseClient, userBookId: string) {
    const { data, error } = await supabase
        .from('user_books')
        .select(`
            id,
            reading_status,
            acquisition_type,
            acquisition_date,
            acquisition_store,
            acquisition_price,
            discovery_medium,
            discovery_source,
            user_rating,
            user_notes,
            started_date,
            finished_date,
            added_via,
            book_editions (
                id,
                isbn,
                format,
                publisher,
                publication_year,
                cover_image,
                page_count,
                books (
                    id,
                    title,
                    subtitle,
                    description,
                    primary_genre,
                    secondary_genre,
                    published_year,
                    book_authors (
                        authors (
                            name
                        )
                    )
                )
            )
        `)
        .eq('id', userBookId)
        .single()

    if (error) throw error

    const edition = data.book_editions as any
    const book = edition.books
    const authors = book.book_authors?.map((ba: any) => ba.authors.name) || []

    return {
        userBookId: data.id,
        reading_status: data.reading_status,
        acquisition_type: data.acquisition_type,
        acquisition_date: data.acquisition_date,
        acquisition_store: data.acquisition_store,
        acquisition_price: data.acquisition_price,
        discovery_medium: data.discovery_medium,
        discovery_source: data.discovery_source,
        user_rating: data.user_rating,
        user_notes: data.user_notes,
        started_date: data.started_date,
        finished_date: data.finished_date,
        added_via: data.added_via,
        edition: {
            id: edition.id,
            isbn: edition.isbn,
            format: edition.format,
            publisher: edition.publisher,
            publication_year: edition.publication_year,
            cover_image: edition.cover_image,
            page_count: edition.page_count,
        },
        book: {
            id: book.id,
            title: book.title,
            subtitle: book.subtitle,
            description: book.description,
            primary_genre: book.primary_genre,
            secondary_genre: book.secondary_genre,
            published_year: book.published_year,
            authors,
        },
    }
}

export type UserBookUpdate = {
    reading_status?: string
    acquisition_type?: string
    acquisition_date?: string | null
    acquisition_store?: string
    acquisition_price?: number | null
    discovery_medium?: string
    discovery_source?: string
    user_rating?: number | null
    user_notes?: string
    started_date?: string | null
    finished_date?: string | null
}

export async function updateUserBook(
    supabase: SupabaseClient,
    userBookId: string,
    userId: string,
    payload: UserBookUpdate
) {
    const { data, error } = await supabase
        .from('user_books')
        .update(payload)
        .eq('id', userBookId)
        .eq('user_id', userId)
        .select()
        .single()

    if (error) throw error
    return data
}
