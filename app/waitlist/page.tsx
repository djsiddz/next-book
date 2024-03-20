import Link from "next/link";
import { Button } from "ZC/ui/button";

export default function Waitlist() {
  return (
    <>
      <div id="banner" className="absolute top-0 flex justify-center items-center space-x-20 bg-yellow-100 w-full p-4 overflow-x-clip">
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
        <span>Waitlisted</span>
      </div>
      <div className="p-10 min-h-screen flex flex-col justify-center items-start md:items-center">
        <h1 className="text-xl text-balance">Hello, fellow reader of books!</h1>
        <p className="mt-16">I'm still working on <span className="font-bold">Next Book</span>. Once it is usable, I'll open up for private beta, and you will slide off the Waitlist.</p>
        <p className="mt-4">You can follow me on <Link className="text-yellow-400 hover:underline" href="https://x.com/Super_Siddy">Twitter/X</Link> for any updates, and to share ideas or just say Hi.</p>
        <p className="mt-4">So, what are you reading currently?</p>
        <Button asChild variant="link" className="mt-8">
          <Link href="https://github.com/djsiddz">- Sid</Link>
        </Button>
        <Button asChild className="mt-16">
          <Link href="/logout">Log Out</Link>
        </Button>
      </div>
    </>
  )
}
