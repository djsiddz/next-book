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
        <div className="min-h-screen bg-background pb-20 font-sans">
            <header className="bg-background border-b shadow-sm sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-black tracking-tighter font-heading">Profile</h1>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-card border rounded-none shadow-sm p-6">
                    <ProfileForm
                        firstName={firstName}
                        lastName={lastName}
                        email={user.email ?? ''}
                        profilePictureUrl={profilePictureUrl}
                        initials={initials}
                    />

                    <div className="border-t border-border pt-4 mt-6">
                        <form action={logout}>
                            <button
                                type="submit"
                                className="w-full rounded-none bg-destructive/10 px-4 py-2.5 text-sm font-bold text-destructive transition-opacity hover:opacity-80 cursor-pointer"
                            >
                                Log out
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
