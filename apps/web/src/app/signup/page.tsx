import { signup } from '@/app/login/actions'

export default function SignupPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-4 bg-background font-sans">
            <form className="flex w-full max-w-sm flex-col gap-4 text-sm border p-8 bg-card shadow-sm">
                <div className="mb-2">
                    <h1 className="text-3xl font-black tracking-tighter font-heading">Create an account</h1>
                    <p className="mt-2 text-muted-foreground">
                        Already have an account?{' '}
                        <a href="/login" className="text-primary font-bold hover:underline">Log in</a>
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-1 flex-col gap-2">
                        <label htmlFor="first_name" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">First Name</label>
                        <input
                            id="first_name"
                            name="first_name"
                            required
                            placeholder="John"
                            className="rounded-none border border-border bg-background p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <label htmlFor="last_name" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            required
                            placeholder="Doe"
                            className="rounded-none border border-border bg-background p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
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

                <button formAction={signup} className="mt-4 rounded-none bg-primary p-3 font-black text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer text-base">
                    Sign up
                </button>
            </form>
        </div>
    )
}
