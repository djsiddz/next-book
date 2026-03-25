import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getBookDetail, updateUserBook } from '@next-book/services'

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const detail = await getBookDetail(supabase, id)
        return NextResponse.json({ detail })
    } catch (error) {
        console.error('Error fetching book detail:', error)
        return NextResponse.json({ error: 'Failed to fetch book detail' }, { status: 500 })
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const payload = await request.json()
        const updated = await updateUserBook(supabase, id, user.id, payload)
        return NextResponse.json({ updated })
    } catch (error) {
        console.error('Error updating book:', error)
        return NextResponse.json({ error: 'Failed to update book' }, { status: 500 })
    }
}
