"use client";

import Link from "next/link";
import Nav from "ZC/native/Nav";

import { Button } from "ZC/ui/button";

export default function Home() {
  return (
    <div className="p-10">
      <Nav />
      <main className="flex h-screen flex-col justify-center items-center">
        <h1 className="mb-6 text-6xl">Keep track of your Books.</h1>
        <p className="mb-12 text-xl">No matter where and how you like to read them.</p>
        <div className="flex justify-start gap-4">
          <Button asChild className="w-min text-2xl px-10 py-8">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button variant="secondary" className="w-min text-2xl px-10 py-8">Learn More</Button>
        </div>
      </main>
    </div>
  );
}
