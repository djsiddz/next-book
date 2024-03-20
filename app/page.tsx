"use client";

import Link from "next/link";
import Nav from "ZC/native/Nav";

import { Button } from "ZC/ui/button";

export default function Home() {
  return (
    <div className="p-10">
      <Nav />
      <main className="flex pt-8 md:pt-0 min-h-screen flex-col justify-center md:items-center">
        <h1 className="mb-6 text-4xl md:text-6xl text-balance">Keep track of your Books.</h1>
        <p className="mb-12 text-lg md:text-xl text-balance">No matter where and how you like to read them.</p>
        <div className="flex flex-col md:flex-row md:justify-start gap-4">
          <Button asChild className="w-min text-lg md:text-2xl px-5 py-6 md:px-10 md:py-8">
            <Link href="/signup?campaign=Direct">Join The Waitlist</Link>
          </Button>
          <Button variant="secondary" className="w-min text-lg md:text-2xl px-5 py-6 md:px-10 md:py-8">Learn More</Button>
        </div>
      </main>
    </div>
  );
}
