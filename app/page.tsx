import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <main className="flex h-screen flex-col justify-center">
        <h1 className="mb-6 text-6xl">Keep track of your Books.</h1>
        <p className="mb-12 text-xl">No matter where and how you like to read them.</p>
        <Button asChild>
          <Link href="/login">Get Started</Link>
        </Button>
        <Button variant="secondary">Learn More</Button>
      </main>
    </div>
  );
}
