type Quote = {
  bookQuote: string;
};

export default function RandomQuote({ bookQuote }: Quote) {
  return (
    <>
      <p className="mb-4 text-xs font-bold">I definitely think they were talking about Books...</p>
      <p className="text-base">{bookQuote}</p>
    </>
  );
}
