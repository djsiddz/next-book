import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/login/actions'
import ProfileForm from './ProfileForm'

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch profile row so we have the stored profile_picture URL
    const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, profile_picture')
        .eq('id', user.id)
        .single()

    const firstName = (profile?.first_name ?? user.user_metadata?.first_name ?? '') as string
    const lastName = (profile?.last_name ?? user.user_metadata?.last_name ?? '') as string
    const profilePictureUrl = (profile?.profile_picture ?? null) as string | null
    const initials = [firstName[0], lastName[0]].filter(Boolean).join('').toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow p-6">
                    <ProfileForm
                        firstName={firstName}
                        lastName={lastName}
                        email={user.email ?? ''}
                        profilePictureUrl={profilePictureUrl}
                        initials={initials}
                    />

                    <div className="border-t border-gray-100 pt-4 mt-6">
                        <form action={logout}>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                            >
                                Log out
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 pb-safe z-50">
                <a href="/library" className="flex flex-col items-center text-gray-500 hover:text-gray-900 transition-colors">
                    <span className="text-xl">📚</span>
                    <span className="text-xs mt-1">Library</span>
                </a>
                <a href="/capture" className="flex flex-col items-center text-gray-500 hover:text-gray-900 transition-colors">
                    <span className="text-xl">🔍</span>
                    <span className="text-xs mt-1">Search</span>
                </a>
                <a href="/profile" className="flex flex-col items-center text-blue-600">
                    <span className="text-xl">👤</span>
                    <span className="text-xs mt-1 font-medium">Profile</span>
                </a>
            </nav>
        </div>
    )
}
