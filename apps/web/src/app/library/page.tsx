'use client'

import { useEffect, useState } from 'react'

type Book = {
    id: string
    title: string
    author: string
    cover: string
}

export default function LibraryPage() {
    const [books, setBooks] = useState<Book[]>([])
    const [recommendation, setRecommendation] = useState<Book | null>(null)
    const [loading, setLoading] = useState(true)
    const [showRecommendation, setShowRecommendation] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const [libRes, recRes] = await Promise.all([
                    fetch('/api/library'),
                    fetch('/api/recommendation')
                ])
                if (libRes.ok) {
                    const data = await libRes.json()
                    setBooks(data.books || [])
                }
                if (recRes.ok) {
                    const data = await recRes.json()
                    setRecommendation(data.recommendation || null)
                }
            } catch (e) {
                console.error('Failed to fetch data', e)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <div className="p-8 text-center text-gray-500">Loading library...</div>

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Library</h1>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {books.map((book) => (
                        <div key={book.id} className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-lg">
                            <div className="aspect-[2/3] w-full bg-gray-200 overflow-hidden">
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{book.title}</h3>
                                <p className="mt-1 text-xs text-gray-500">{book.author}</p>
                            </div>
                        </div>
                    ))}

                    {/* Mystery Book Recommendation */}
                    {recommendation && (
                        <div
                            className="group relative flex flex-col overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-all cursor-pointer"
                            onClick={() => setShowRecommendation(!showRecommendation)}
                        >
                            {!showRecommendation ? (
                                <>
                                    <div className="aspect-[2/3] w-full flex items-center justify-center bg-gray-100 group-hover:bg-blue-50 transition-colors">
                                        <span className="text-6xl text-gray-400 font-bold group-hover:text-blue-500 font-serif">?</span>
                                    </div>
                                    <div className="p-4 flex flex-col flex-1 items-center justify-center border-t border-gray-200 bg-white group-hover:bg-blue-50 transition-colors">
                                        <h3 className="text-sm font-medium text-gray-900">Next Read</h3>
                                        <p className="mt-1 text-xs text-center text-gray-500 line-clamp-2">Click to reveal recommendation</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="aspect-[2/3] w-full bg-blue-100 overflow-hidden">
                                        {recommendation.cover ? (
                                            <img
                                                src={recommendation.cover}
                                                alt={recommendation.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-blue-200 text-blue-800 font-bold text-center p-2">
                                                {recommendation.title}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-1 bg-blue-50 border-t border-blue-200">
                                        <h3 className="text-sm font-bold text-blue-900 line-clamp-1">{recommendation.title}</h3>
                                        <p className="mt-1 text-xs text-blue-700">{recommendation.author}</p>
                                        <span className="mt-2 text-[10px] uppercase font-bold tracking-wider text-blue-500">Recommended</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {!recommendation && books.length > 0 && (
                        <div className="group relative flex flex-col overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 opacity-50">
                            <div className="aspect-[2/3] w-full flex items-center justify-center">
                                <span className="text-4xl text-gray-300 font-bold font-serif">?</span>
                            </div>
                            <div className="p-4 flex flex-col flex-1 items-center justify-center border-t border-gray-200 bg-white">
                                <p className="mt-1 text-xs text-center text-gray-400">Add more books</p>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* Basic Bottom Nav Template */}
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
