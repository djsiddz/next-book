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
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add a Book</h1>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-8">
                <form onSubmit={searchBooks} className="mb-8 flex gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title, author, or ISBN"
                        className="flex-1 rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                <div className="flex flex-col gap-4">
                    {results.map((book) => (
                        <div key={book.id} className="flex gap-4 rounded-lg bg-white p-4 shadow">
                            <div className="h-32 w-24 shrink-0 overflow-hidden rounded bg-gray-200">
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
                                    <h3 className="font-medium text-gray-900 line-clamp-2">{book.volumeInfo.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                                        {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-400 line-clamp-2">
                                        {book.volumeInfo.description || 'No description available.'}
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => addBook(book)}
                                        disabled={addingId === book.id}
                                        className="rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 disabled:opacity-50"
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

            <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <a href="/library" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
                    <BookIcon className="w-6 h-6" />
                    <span className="text-xs mt-1">Library</span>
                </a>
                <a href="/capture" className="flex flex-col items-center text-blue-600">
                    <Search className="w-6 h-6" />
                    <span className="text-xs mt-1 font-medium">Search</span>
                </a>
                <a href="/profile" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
                    <User className="w-6 h-6" />
                    <span className="text-xs mt-1">Profile</span>
                </a>
            </nav>
        </div>
    )
}
