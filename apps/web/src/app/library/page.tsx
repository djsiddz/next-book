'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Book = {
    id: string
    userBookId: string
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

    if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading library...</div>

    return (
        <div className="min-h-screen bg-background pb-24 font-sans">
            <header className="bg-background border-b shadow-sm sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-black tracking-tighter font-heading">My Library</h1>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {books.map((book) => (
                        <Link key={book.id} href={`/library/${book.userBookId}`} className="group relative flex flex-col overflow-hidden rounded-none bg-card border shadow-sm transition-all hover:shadow-md">
                            <div className="aspect-2/3 w-full bg-muted overflow-hidden">
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-sm font-bold text-foreground line-clamp-1">{book.title}</h3>
                                <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
                            </div>
                        </Link>
                    ))}


                    {/* Mystery Book Recommendation */}
                    {recommendation && (
                        <div
                            className="group relative flex flex-col overflow-hidden rounded-none border-2 border-dashed border-primary bg-muted/50 transition-all cursor-pointer"
                            onClick={() => setShowRecommendation(!showRecommendation)}
                        >
                            {!showRecommendation ? (
                                <>
                                    <div className="aspect-2/3 w-full flex items-center justify-center bg-muted group-hover:bg-primary/5 transition-colors">
                                        <span className="text-6xl text-muted-foreground font-black group-hover:text-primary font-heading">?</span>
                                    </div>
                                    <div className="p-4 flex flex-col flex-1 items-center justify-center border-t border-border bg-card group-hover:bg-primary/5 transition-colors">
                                        <h3 className="text-sm font-bold text-foreground">Next Read</h3>
                                        <p className="mt-1 text-xs text-center text-muted-foreground line-clamp-2">Click to reveal recommendation</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="aspect-2/3 w-full bg-primary/10 overflow-hidden">
                                        {recommendation.cover ? (
                                            <img
                                                src={recommendation.cover}
                                                alt={recommendation.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-primary/20 text-primary font-bold text-center p-2 font-heading">
                                                {recommendation.title}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-1 bg-primary/5 border-t border-primary/20">
                                        <h3 className="text-sm font-bold text-foreground line-clamp-1">{recommendation.title}</h3>
                                        <p className="mt-1 text-xs text-muted-foreground">{recommendation.author}</p>
                                        <span className="mt-2 text-[10px] uppercase font-black tracking-widest text-primary">Recommended</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {!recommendation && books.length > 0 && (
                        <div className="group relative flex flex-col overflow-hidden rounded-none border-2 border-dashed border-border bg-muted opacity-50">
                            <div className="aspect-2/3 w-full flex items-center justify-center">
                                <span className="text-4xl text-muted-foreground font-black font-heading">?</span>
                            </div>
                            <div className="p-4 flex flex-col flex-1 items-center justify-center border-t border-border bg-card">
                                <p className="mt-1 text-xs text-center text-muted-foreground">Add more books</p>
                            </div>
                        </div>
                    )}

                </div>
            </main>

        </div>
    )
}
