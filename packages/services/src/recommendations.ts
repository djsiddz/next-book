import { SupabaseClient } from '@supabase/supabase-js'

export async function getUserLibrary(supabase: SupabaseClient, userId: string) {
    const { data, error } = await supabase
        .from('user_books')
        .select(`
      id,
      reading_status,
      book_editions (
        id,
        cover_image,
        books (
          id,
          title,
          book_authors (
            authors (
              name
            )
          )
        )
      )
    `)
        .eq('user_id', userId)

    if (error) {
        console.error('Supabase error:', error)
        throw error
    }

    // Transform data into simple View Models
    return data.map((ub: any) => {
        const edition = ub.book_editions
        const book = edition.books

        // Extract authors (simplified for UI)
        const authors = book.book_authors?.map((ba: any) => ba.authors.name) || []

        return {
            id: book.id,
            userBookId: ub.id,
            title: book.title,
            author: authors.join(', '),
            cover: edition.cover_image,
            status: ub.reading_status
        }
    })
}

export async function getRecommendation(supabase: SupabaseClient, userId: string) {
    // 1. Fetch unread books
    const books = await getUserLibrary(supabase, userId)
    const unreadBooks = books.filter((b: any) => b.status === 'want_to_read' || !b.status)

    // 2. Simple random selection for v0 recommendation
    if (unreadBooks.length === 0) return null

    const randomIndex = Math.floor(Math.random() * unreadBooks.length)
    return unreadBooks[randomIndex]
}
