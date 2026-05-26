"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { logout } from "../actions";

export default function LogoutPage() {
  const quotes: string[] = [
    `"I knew I was not reading upto my potential!" - Po, Kung Fu Panda`,
    `"The only thing that matters is what you choose to read now." - Po, Kung Fu Panda`,
    `"To infinity... and books!" - Buzz Lightyear, Toy Story`,
    `"I read somewhere that an empty room is an opportunity." - Joy, Inside Out`,
    `"Just keep reading." - Dory, Finding Nemo`,
    `"I'm packing your extra pair of books, and your angry eyes just in case." - Mrs. Potato Head, Toy Story`,
    `"I never look back, darling. It distracts from the book." - Edna Mode, The Incredibles`,
    `"I don't want to survive. I want to read." - Captain, WALL-E`,
    `"Not everyone can become a great reader, but great readers can come from anywhere." - Anton Ego, Ratatouille`,
  ] as const;

  const [bookQuote] = useState(() => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index] ?? quotes[0] ?? "";
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    logout().catch(console.error);

    timeoutRef.current = setTimeout(() => {
      router.push("/");
      timeoutRef.current = null; // Clear the timeout reference
    }, 10 * 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // Need this function to run only once when the page is loaded and
    // not when any variables change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen min-w-full">
      <div className="flex w-1/2 items-center justify-center bg-yellow-100 p-10">
        <ChevronRightSquareIcon size={96} />
      </div>
      <div className="flex w-1/2 flex-col items-start justify-center p-10">
        <h2 className="mb-8 text-2xl">See you later!</h2>
        <p>
          Catch a breath. Have a great day! 👋 <br />
          Redirecting you to <Link href={"/"}>Home Page</Link> in 10 seconds
          <br />
          Or you can close the tab.
        </p>
        <div className="mt-32">
          <p className="mb-4 text-xs font-bold">I definitely think they were talking about Books...</p>
          <p className="text-base">{bookQuote}</p>
        </div>
      </div>
    </div>
  );
}
