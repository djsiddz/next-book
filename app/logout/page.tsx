"use client";

import { useEffect } from "react";

import { ChevronRightSquareIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import RandomQuote from "ZC/native/RandomQuote";

export default function LogoutPage() {

  const router = useRouter();

  useEffect(() => {
      const timer = setTimeout(() => {
        router.push('/')
      }, 10000);
      return () => clearTimeout(timer);
    }, );

  return (
    <div className="flex min-w-full min-h-screen">
      <div className="w-1/2 p-10 bg-yellow-100 flex justify-center items-center">
        <ChevronRightSquareIcon size={96} />
      </div>
      <div className="w-1/2 p-10 flex flex-col justify-center items-start">
        <h2 className="text-2xl mb-8">See you later!</h2>
        <p>Catch a breath. Have a great day! 👋 <br />Redirecting you to home page in 10 seconds...</p>
        <div className="mt-32"><RandomQuote /></div>
      </div>
    </div>
  )
}
