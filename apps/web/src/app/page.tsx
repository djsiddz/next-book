export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center p-6">
      <main className="flex w-full max-w-lg flex-col items-center gap-12 text-center">
        {/* Logo / Icon */}
        <div className="flex h-24 w-24 items-center justify-center bg-primary text-5xl shadow-md">
          📚
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-5xl font-black tracking-tighter">
            Next Book
          </h1>
          <p className="max-w-md text-xl text-muted-foreground">
            Your personal reading companion. Track what you&apos;ve read, discover what to read next.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="/login"
            className="flex h-12 w-full items-center justify-center bg-primary px-8 text-base font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 sm:w-auto"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="flex h-12 w-full items-center justify-center border-2 border-primary px-8 text-base font-bold transition-colors hover:bg-primary/10 sm:w-auto"
          >
            Sign up
          </a>
        </div>
      </main>
    </div>
  );
}
