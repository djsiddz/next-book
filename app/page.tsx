"use client";

import Link from "next/link";
import Nav from "ZC/native/Nav";

import { Button } from "ZC/ui/button";

export default function Home() {
  return (
    <div className="p-10">
      <Nav />
      <main className="flex min-h-screen flex-col justify-center pt-8 md:items-center md:pt-0">
        <h1 className="mb-6 text-balance text-4xl md:text-6xl">Keep track of your Books.</h1>
        <p className="mb-12 text-balance text-lg md:text-xl">No matter where and how you like to read them.</p>
        <div className="flex flex-col gap-4 md:flex-row md:justify-start">
          <Button asChild className="w-min px-5 py-6 text-lg md:px-10 md:py-8 md:text-2xl">
            <Link href="/signup?campaign=Direct">Join the Waitlist</Link>
          </Button>
          <Button variant="secondary" className="w-min px-5 py-6 text-lg md:px-10 md:py-8 md:text-2xl">
            Learn More
          </Button>
        </div>
      </main>
    </div>
  );
}
