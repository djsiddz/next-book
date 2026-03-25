import { login } from './actions'

export default function LoginPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <form className="flex w-full max-w-sm flex-col gap-4 text-sm">
                <div className="mb-2">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="mt-1 text-gray-500">
                        Don&apos;t have an account?{' '}
                        <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="rounded border p-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="rounded border p-2"
                    />
                </div>

                <button formAction={login} className="mt-2 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                    Log in
                </button>
            </form>
        </div>
    )
}

