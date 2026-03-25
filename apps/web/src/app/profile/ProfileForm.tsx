'use client'

import { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { updateProfile } from './actions'

interface ProfileFormProps {
    firstName: string
    lastName: string
    email: string
    profilePictureUrl: string | null
    initials: string
}

export default function ProfileForm({
    firstName,
    lastName,
    email,
    profilePictureUrl,
    initials,
}: ProfileFormProps) {
    const [preview, setPreview] = useState<string | null>(profilePictureUrl)
    const [isPending, startTransition] = useTransition()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setPreview(URL.createObjectURL(file))
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        startTransition(async () => {
            await updateProfile(new FormData(form))
        })
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3 mb-6">
                <button
                    type="button"
                    aria-label="Change profile photo"
                    onClick={() => fileInputRef.current?.click()}
                    className="relative group cursor-pointer focus:outline-none"
                >
                    <div className="flex h-24 w-24 items-center justify-center bg-muted text-foreground text-3xl font-bold ring-2 ring-offset-2 ring-transparent group-hover:ring-primary transition-all">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Profile photo"
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                                unoptimized
                            />
                        ) : (
                            initials
                        )}
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.172a2 2 0 001.414-.586l.828-.828A2 2 0 019.828 5h4.344a2 2 0 011.414.586l.828.828A2 2 0 0017.828 7H18a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </button>
                <p className="text-xs text-muted-foreground">Tap photo to change</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {/* Email (read-only) */}
            <p className="text-center text-sm text-muted-foreground -mt-3 mb-6">{email}</p>

            {/* Name fields */}
            <div className="flex gap-3 mb-4">
                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="first_name" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">First Name</label>
                    <input
                        id="first_name"
                        name="first_name"
                        defaultValue={firstName}
                        required
                        placeholder="First"
                        className="border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="last_name" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        defaultValue={lastName}
                        placeholder="Last"
                        className="border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Save button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary px-4 py-2.5 text-sm font-black text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
            >
                {isPending ? 'Saving…' : 'Save changes'}
            </button>
        </form>
    )
}
