import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <form className="flex w-full max-w-sm flex-col gap-4 text-sm">
                <h1 className="text-2xl font-bold mb-4">Welcome to Next Book</h1>

                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="first_name">First Name (Signup only)</label>
                    <input
                        id="first_name"
                        name="first_name"
                        placeholder="John"
                        className="rounded border p-2"
                    />
                </div>

                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="last_name">Last Name (Signup only)</label>
                    <input
                        id="last_name"
                        name="last_name"
                        placeholder="Doe"
                        className="rounded border p-2"
                    />
                </div>

                <div className="flex flex-col gap-2 mt-4 relative">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="rounded border p-2"
                    />
                </div>

                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="rounded border p-2"
                    />
                </div>

                <div className="mt-6 flex flex-col gap-2">
                    <button formAction={login} className="rounded bg-blue-600 p-2 text-white">
                        Log in
                    </button>
                    <button formAction={signup} className="rounded border bg-white p-2 text-blue-600">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}
