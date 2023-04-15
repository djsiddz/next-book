'use client';
import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  text: string;
  href: string;
};

export function Button({ text, href }: ButtonProps) {
  return (
    <Link
      className="my-3 w-fit rounded-lg bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      href={href}
    >
      {text}
    </Link>
  );
}
