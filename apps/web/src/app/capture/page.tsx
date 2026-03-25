'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Book as BookIcon, Search, User } from 'lucide-react'

type GoogleBook = {
    id: string
    volumeInfo: {
        title: string
        authors?: string[]
        description?: string
        imageLinks?: {
            thumbnail?: string
        }
        publishedDate?: string
        industryIdentifiers?: { type: string, identifier: string }[]
        pageCount?: number
        categories?: string[]
    }
}

export default function CapturePage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<GoogleBook[]>([])
    const [loading, setLoading] = useState(false)
    const [addingId, setAddingId] = useState<string | null>(null)
    const router = useRouter()

    const searchBooks = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        setLoading(true)
        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`)
            const data = await res.json()
            setResults(data.items || [])
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const addBook = async (book: GoogleBook) => {
        setAddingId(book.id)
        try {
            const res = await fetch('/api/books/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ book }),
            })
            if (res.ok) {
                router.push('/library')
            } else {
                console.error('Failed to add book')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setAddingId(null)
        }
    }

    return (
        <div className="min-h-screen bg-background pb-20 font-sans">
            <header className="bg-background border-b shadow-sm sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl tracking-tighter font-heading">Add a Book</h1>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-8">
                <form onSubmit={searchBooks} className="mb-8 flex gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title, author, or ISBN"
                        className="flex-1 rounded-none border border-border bg-background p-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-none bg-primary px-6 py-3 font-bold text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                <div className="flex flex-col gap-4">
                    {results.map((book) => (
                        <div key={book.id} className="flex gap-4 rounded-none border bg-card p-4 shadow-sm">
                            <div className="h-32 w-24 shrink-0 overflow-hidden bg-muted">
                                {book.volumeInfo.imageLinks?.thumbnail && (
                                    <img
                                        src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                                        alt={book.volumeInfo.title}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-foreground line-clamp-2 font-heading">{book.volumeInfo.title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                                        {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                                    </p>
                                    <p className="mt-2 text-xs text-muted-foreground/80 line-clamp-2">
                                        {book.volumeInfo.description || 'No description available.'}
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => addBook(book)}
                                        disabled={addingId === book.id}
                                        className="rounded-none bg-primary/10 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/20 disabled:opacity-50 cursor-pointer"
                                    >
                                        {addingId === book.id ? 'Adding...' : 'Add to Library'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {results.length === 0 && !loading && query && (
                        <p className="text-center text-gray-500">No results found.</p>
                    )}
                </div>
            </main>
        </div>
    )
}
