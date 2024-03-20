"use client";


const quotes = [
  `"I knew I was not reading upto my potential!" - Po`,
  `"The only thing that matters is what you choose to read now." - Po`,
  `"I knew I was not reading upto my potential!" - Po`,
];

export default function RandomQuote() {
  const bookQuote = quotes[(Math.floor(Math.random() * quotes.length))];

  return (
    <>
      <p className="text-xs font-bold mb-4">I definitely think they were talking about Books...</p>
      <p className="text-base">{bookQuote}</p>
    </>
  )
}
