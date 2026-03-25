export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 font-sans dark:bg-black">
      <main className="flex w-full max-w-lg flex-col items-center gap-8 text-center">
        {/* Logo / Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-4xl shadow-lg">
          📚
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Next Book
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Your personal reading companion. Track what you&apos;ve read, discover what to read next.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/login"
            className="flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-base font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="flex h-12 w-full items-center justify-center rounded-full border border-gray-300 px-6 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900 sm:w-auto"
          >
            Sign up
          </a>
        </div>
      </main>
    </div>
  );
}
