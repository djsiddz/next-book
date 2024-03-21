export default function ErrorPage() {
  return (
    <div className="p-10 flex flex-col justify-center items-center min-h-screen">
      <p className="font-bold text-yellow-400">Something went wrong!</p>
      <p className="">It's not you. It's us. Come back in a while and try again.</p>
      <pre className="mt-32">🎵 I'm having a bad bad day
        <br />It's about time that I get my way
        <br />Steam rolling whatever I see, huh
        <br />Despicable me 🎵
      </pre>
    </div>
  )
}
