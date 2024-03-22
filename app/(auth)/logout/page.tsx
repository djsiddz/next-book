"use client";

import { useEffect, useRef } from "react";
import { logout } from "../login/actions";

import { ChevronRightSquareIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import RandomQuote from "ZC/native/RandomQuote";

export default function LogoutPage() {
  const quotes = [
    `"I knew I was not reading upto my potential!" - Po`,
    `"The only thing that matters is what you choose to read now." - Po`,
  ];
  const bookQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const timeoutRef = useRef<NodeJS.Timeout | undefined>();
  const router = useRouter();

  useEffect(() => {
    logout().catch(console.error);

    timeoutRef.current = setTimeout(() => {
      router.push("/");
      timeoutRef.current = undefined; // Clear the timeout reference
    }, 10 * 1000);

    return () => {
      clearTimeout(timeoutRef.current);
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
          Redirecting you to home page in 10 seconds
          <br />
          Or you can close the tab.
        </p>
        <div className="mt-32">
          <RandomQuote bookQuote={bookQuote} />
        </div>
      </div>
    </div>
  );
}
