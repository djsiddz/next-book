"use client";

import { BookCheckIcon, BoxesIcon, SparklesIcon, Tally5Icon } from "lucide-react";
import Link from "next/link";
import Nav from "ZC/native/Nav";

import { Button } from "ZC/ui/button";

export default function Home() {
  return (
    <div className="p-10 absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Nav />
      <main className="flex min-h-screen flex-col justify-center pt-8 md:items-center md:pt-0">
        <h1 className="mb-6 text-balance text-4xl md:text-6xl">Keep track of all your Books.</h1>
        <p className="mb-12 text-balance text-lg md:text-xl">And your reading habit. No matter where and how you like to read them.</p>
        <div className="flex flex-col gap-4 md:flex-row md:justify-start">
          <Button asChild className="w-min px-5 py-6 text-lg md:px-10 md:py-8 md:text-2xl">
            <Link href="/signup?campaign=Direct">Join the Waitlist</Link>
          </Button>
          <Button variant="secondary" className="w-min px-5 py-6 text-lg md:px-10 md:py-8 md:text-2xl">
            Learn More
          </Button>
        </div>
      </main>
      <section
        id="features"
        className="flex min-h-screen flex-col items-center justify-center rounded-2xl max-w-screen-lg mx-auto mb-12"
      >
        <h2 className="text-3xl md:text-4xl">Features</h2>
        <div className="mt-16 flex flex-col md:grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 p-6 min-h-40 min-w-80 rounded-lg border-yellow-500 border">
            <BoxesIcon size={48} className="text-yellow-500" />
            <h3 className="text-balance text-2xl md:text-3xl">All Books in one view</h3>
            <p className="text-balance text-lg md:text-xl">Bring all your books. We'll make sure you can remember how you got a book! And where it is currently.</p>
          </div>
          <div className="flex flex-col gap-4 p-6 min-h-40 min-w-80 rounded-lg border-yellow-500 border">
            <BookCheckIcon size={48} className="text-yellow-500" />
            <h3 className="text-balance text-2xl md:text-3xl">Track your progress</h3>
            <p className="text-balance text-lg md:text-xl">Test paragraph to see how this works</p>
          </div>
          <div className="flex flex-col gap-4 p-6 min-h-40 min-w-80 rounded-lg border-yellow-500 border">
            <Tally5Icon size={48} className="text-yellow-500" />
            <h3 className="text-balance text-2xl md:text-3xl">Build a reading habit</h3>
            <p className="text-balance text-lg md:text-xl">Test paragraph to see how this works</p>
          </div>
          <div className="flex flex-col gap-4 p-6 min-h-40 min-w-80 rounded-lg border-yellow-500 border">
            <SparklesIcon size={48} className="text-yellow-500" />
            <h3 className="text-balance text-2xl md:text-3xl">Get AI recommendations</h3>
            <p className="text-balance text-lg md:text-xl">Test paragraph to see how this works</p>
          </div>
        </div>
      </section>
    </div>
  );
}
