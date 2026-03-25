'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const firstName = formData.get('first_name') as string
    const lastName = formData.get('last_name') as string
    const photo = formData.get('photo') as File | null

    let profilePictureUrl: string | undefined

    // Upload new photo if provided
    if (photo && photo.size > 0) {
        const ext = photo.name.split('.').pop() ?? 'jpg'
        const path = `${user.id}/avatar.${ext}`

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(path, photo, { upsert: true, contentType: photo.type })

        if (uploadError) {
            throw new Error(`Failed to upload avatar: ${uploadError.message}`)
        }

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(path)

        // Append cache-buster so browser always fetches the updated image
        profilePictureUrl = `${publicUrl}?t=${Date.now()}`
    }

    // Update profiles table
    const profileUpdate: Record<string, string> = { first_name: firstName, last_name: lastName }
    if (profilePictureUrl) {
        profileUpdate.profile_picture = profilePictureUrl
    }

    const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', user.id)

    if (profileError) {
        throw new Error(`Failed to update profile: ${profileError.message}`)
    }

    // Keep auth user_metadata in sync
    await supabase.auth.updateUser({
        data: { first_name: firstName, last_name: lastName },
    })

    revalidatePath('/profile')
    redirect('/profile')
}
