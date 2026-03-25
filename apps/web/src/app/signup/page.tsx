import { signup } from '@/app/login/actions'

export default function SignupPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <form className="flex w-full max-w-sm flex-col gap-4 text-sm">
                <div className="mb-2">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="mt-1 text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline">Log in</a>
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-1 flex-col gap-2">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            name="first_name"
                            required
                            placeholder="John"
                            className="rounded border p-2"
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            required
                            placeholder="Doe"
                            className="rounded border p-2"
                        />
                    </div>
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

                <button formAction={signup} className="mt-2 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                    Sign up
                </button>
            </form>
        </div>
    )
}
