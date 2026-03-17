import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { addBookToLibrary } from '@next-book/services'

export async function POST(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { book } = await request.json()

        // Call service layer to handle the complex DB logic
        await addBookToLibrary(supabase, user.id, book)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error adding book:', error)
        return NextResponse.json({ error: 'Failed to add book' }, { status: 500 })
    }
}
