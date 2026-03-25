import { login } from './actions'

export default function LoginPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-4 bg-background font-sans">
            <form className="flex w-full max-w-sm flex-col gap-4 text-sm border p-8 bg-card shadow-sm">
                <div className="mb-2">
                    <h1 className="text-3xl font-black tracking-tighter font-heading">Welcome back</h1>
                    <p className="mt-2 text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <a href="/signup" className="text-primary font-bold hover:underline">Sign up</a>
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="rounded-none border border-border bg-background p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="rounded-none border border-border bg-background p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                <button formAction={login} className="mt-4 rounded-none bg-primary p-3 font-black text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer text-base">
                    Log in
                </button>
            </form>
        </div>
    )
}

