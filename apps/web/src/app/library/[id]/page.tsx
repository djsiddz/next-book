'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type BookDetail = {
    userBookId: string
    reading_status: string | null
    acquisition_type: string | null
    acquisition_date: string | null
    acquisition_store: string | null
    acquisition_price: number | null
    discovery_medium: string | null
    discovery_source: string | null
    user_rating: number | null
    user_notes: string | null
    started_date: string | null
    finished_date: string | null
    edition: {
        isbn: string | null
        format: string | null
        publisher: string | null
        publication_year: number | null
        cover_image: string | null
        page_count: number | null
    }
    book: {
        title: string
        subtitle: string | null
        description: string | null
        primary_genre: string | null
        secondary_genre: string | null
        published_year: number | null
        authors: string[]
    }
}

const STATUS_OPTIONS = [
    { value: 'want_to_read', label: 'Want to Read' },
    { value: 'reading', label: 'Currently Reading' },
    { value: 'finished', label: 'Finished' },
    { value: 'dnf', label: 'Did Not Finish' },
]

const ACQUISITION_OPTIONS = [
    { value: '', label: '— None —' },
    { value: 'bought', label: 'Bought' },
    { value: 'borrowed', label: 'Borrowed' },
    { value: 'gifted', label: 'Gifted' },
    { value: 'ebook', label: 'E-Book' },
    { value: 'audiobook', label: 'Audiobook' },
    { value: 'library', label: 'Library' },
]

function StarRating({ value, onChange }: { value: number | null; onChange: (v: number | null) => void }) {
    const [hovered, setHovered] = useState<number | null>(null)
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onChange(value === star ? null : star)}
                    aria-label={`Rate ${star} stars`}
                >
                    <span className={(hovered ?? value ?? 0) >= star ? 'text-amber-400' : 'text-gray-300'}>★</span>
                </button>
            ))}
            {value && (
                <span className="ml-2 text-sm self-center text-gray-500">{value}/5</span>
            )}
        </div>
    )
}

export default function BookDetailPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const [detail, setDetail] = useState<BookDetail | null>(null)
    const [form, setForm] = useState<Partial<BookDetail>>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/api/library/${id}`)
                if (!res.ok) throw new Error('Failed to load')
                const data = await res.json()
                setDetail(data.detail)
                setForm({
                    reading_status: data.detail.reading_status,
                    acquisition_type: data.detail.acquisition_type,
                    acquisition_date: data.detail.acquisition_date,
                    acquisition_store: data.detail.acquisition_store,
                    acquisition_price: data.detail.acquisition_price,
                    discovery_medium: data.detail.discovery_medium,
                    discovery_source: data.detail.discovery_source,
                    user_rating: data.detail.user_rating,
                    user_notes: data.detail.user_notes,
                    started_date: data.detail.started_date,
                    finished_date: data.detail.finished_date,
                })
            } catch {
                setError('Could not load book details.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    async function handleSave() {
        setSaving(true)
        setSaved(false)
        setError(null)
        try {
            const res = await fetch(`/api/library/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (!res.ok) throw new Error('Save failed')
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch {
            setError('Failed to save changes.')
        } finally {
            setSaving(false)
        }
    }

    function set<K extends keyof BookDetail>(key: K, value: BookDetail[K] | null) {
        setForm((f) => ({ ...f, [key]: value }))
        setSaved(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-500 animate-pulse">Loading…</div>
            </div>
        )
    }

    if (error && !detail) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <p className="text-red-500">{error}</p>
                <Link href="/library" className="text-blue-600 underline text-sm">← Back to Library</Link>
            </div>
        )
    }

    const { book, edition } = detail!

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="bg-white shadow sticky top-0 z-10">
                <div className="mx-auto max-w-2xl px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => router.push('/library')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                        aria-label="Back to Library"
                    >
                        ←
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1">{book.title}</h1>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-6 space-y-8">

                {/* Book Info card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden flex gap-5 p-5">
                    {edition.cover_image ? (
                        <img
                            src={edition.cover_image}
                            alt={book.title}
                            className="w-24 flex-shrink-0 rounded-lg object-cover shadow-md self-start"
                        />
                    ) : (
                        <div className="w-24 h-36 flex-shrink-0 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-4xl font-serif">
                            📖
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-900 leading-snug">{book.title}</h2>
                        {book.subtitle && (
                            <p className="text-sm text-gray-500 mt-0.5">{book.subtitle}</p>
                        )}
                        <p className="mt-1 text-sm font-medium text-gray-700">
                            {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown Author'}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                            {book.primary_genre && (
                                <span className="bg-gray-100 rounded-full px-2 py-0.5">{book.primary_genre}</span>
                            )}
                            {book.published_year && (
                                <span className="bg-gray-100 rounded-full px-2 py-0.5">{book.published_year}</span>
                            )}
                            {edition.page_count && (
                                <span className="bg-gray-100 rounded-full px-2 py-0.5">{edition.page_count} pages</span>
                            )}
                            {edition.isbn && (
                                <span className="bg-gray-100 rounded-full px-2 py-0.5">ISBN {edition.isbn}</span>
                            )}
                        </div>
                        {book.description && (
                            <p className="mt-3 text-xs text-gray-600 line-clamp-4 leading-relaxed">{book.description}</p>
                        )}
                    </div>
                </div>

                {/* Ownership form */}
                <div className="bg-white rounded-xl shadow-sm p-5 space-y-6">
                    <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">My Details</h3>

                    {/* Reading Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Reading Status</label>
                        <div className="flex flex-wrap gap-2">
                            {STATUS_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => set('reading_status', opt.value)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                        form.reading_status === opt.value
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">My Rating</label>
                        <StarRating
                            value={form.user_rating ?? null}
                            onChange={(v) => set('user_rating', v)}
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">My Notes</label>
                        <textarea
                            rows={3}
                            value={form.user_notes ?? ''}
                            onChange={(e) => set('user_notes', e.target.value || null)}
                            placeholder="Thoughts, quotes, takeaways…"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Reading Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Started</label>
                            <input
                                type="date"
                                value={form.started_date ?? ''}
                                onChange={(e) => set('started_date', e.target.value || null)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Finished</label>
                            <input
                                type="date"
                                value={form.finished_date ?? ''}
                                onChange={(e) => set('finished_date', e.target.value || null)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Acquisition */}
                    <div className="space-y-4 pt-2 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-700">Acquisition</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">How I got it</label>
                                <select
                                    value={form.acquisition_type ?? ''}
                                    onChange={(e) => set('acquisition_type', e.target.value || null)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    {ACQUISITION_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Date</label>
                                <input
                                    type="date"
                                    value={form.acquisition_date ?? ''}
                                    onChange={(e) => set('acquisition_date', e.target.value || null)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Store / Source</label>
                                <input
                                    type="text"
                                    value={form.acquisition_store ?? ''}
                                    onChange={(e) => set('acquisition_store', e.target.value || null)}
                                    placeholder="e.g. Amazon, local bookshop"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Price paid</label>
                                <input
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    value={form.acquisition_price ?? ''}
                                    onChange={(e) => set('acquisition_price', e.target.value ? parseFloat(e.target.value) : null)}
                                    placeholder="0.00"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Discovery */}
                    <div className="space-y-4 pt-2 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-700">How I discovered it</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Medium</label>
                                <input
                                    type="text"
                                    value={form.discovery_medium ?? ''}
                                    onChange={(e) => set('discovery_medium', e.target.value || null)}
                                    placeholder="e.g. Instagram, podcast"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Source / Person</label>
                                <input
                                    type="text"
                                    value={form.discovery_source ?? ''}
                                    onChange={(e) => set('discovery_source', e.target.value || null)}
                                    placeholder="e.g. @username, Tim Ferriss"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save */}
                    <div className="pt-2 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                        >
                            {saving ? 'Saving…' : 'Save Changes'}
                        </button>
                        {saved && (
                            <span className="text-sm text-green-600 font-medium">✓ Saved</span>
                        )}
                        {error && !saving && (
                            <span className="text-sm text-red-500">{error}</span>
                        )}
                    </div>
                </div>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 pb-safe z-50">
                <a href="/library" className="flex flex-col items-center text-blue-600">
                    <span className="text-xl">📚</span>
                    <span className="text-xs mt-1 font-medium">Library</span>
                </a>
                <a href="/capture" className="flex flex-col items-center text-gray-500 hover:text-gray-900 transition-colors">
                    <span className="text-xl">🔍</span>
                    <span className="text-xs mt-1">Search</span>
                </a>
                <a href="/profile" className="flex flex-col items-center text-gray-500 hover:text-gray-900 transition-colors">
                    <span className="text-xl">👤</span>
                    <span className="text-xs mt-1">Profile</span>
                </a>
            </nav>
        </div>
    )
}
