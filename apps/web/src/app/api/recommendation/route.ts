import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getRecommendation } from '@next-book/services'

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const recommendation = await getRecommendation(supabase, user.id)
        return NextResponse.json({ recommendation })
    } catch (error) {
        console.error('Error fetching recommendation:', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
