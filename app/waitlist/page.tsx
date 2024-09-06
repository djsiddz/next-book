import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "ZC/ui/button";

export default function Waitlist() {
  return (
    <>
      <div
        id="banner"
        className="absolute top-0 flex w-full items-center justify-center space-x-10 overflow-x-clip bg-yellow-100 p-4"
      >
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="flex items-center">
          <ChevronRightSquareIcon size={36} className="inline" />{" "}
          <span className="hidden whitespace-nowrap text-xl md:visible md:flex md:pl-3">Next Book</span>
        </span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
        <span className="whitespace-nowrap">🚨 Waitlisted</span>
      </div>

      <div className="mt-16 flex min-h-screen flex-col items-start justify-center p-10 md:mt-0 md:items-center md:text-center">
        <h1 className="text-balance text-xl">Hello, fellow reader of the books! 👋</h1>
        <p className="mt-16">
          Thank you so much for joining the club! Once <strong>Next Book</strong> is usable, I'll open access for
          private beta.
        </p>
        <p className="mt-4">
          Make sure to check your inbox and <strong>verify your email</strong>. <br />
          That way you will get off the waitlist, faster! 😉
        </p>
        <p className="mt-4">
          You can follow me on{" "}
          <Link className="text-yellow-400 hover:underline" href="https://x.com/Super_Siddy">
            Twitter/X
          </Link>{" "}
          for updates, or tell me about the book you are currently reading! 📖
        </p>
        <Button asChild variant="link" className="mt-8">
          <Link href="https://github.com/djsiddz">- Sid 🧑‍💻</Link>
        </Button>
        <Button asChild className="mt-16">
          <Link href="/logout">Log Out</Link>
        </Button>
      </div>
    </>
  );
}
