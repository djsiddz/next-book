/* eslint-disable @typescript-eslint/no-misused-promises */
import { login } from './actions';

import { ChevronRightSquareIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from 'ZC/ui/button';
import { Input } from 'ZC/ui/input';
import { Label } from 'ZC/ui/label';

export default function LoginPage() {
  return (
    <div className="flex min-w-full min-h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-10 bg-yellow-100 flex justify-center items-center">
        <ChevronRightSquareIcon size={96} />
      </div>
      <div className="w-full md:w-1/2 py-10 px-4 md:p-10 flex flex-col justify-center items-center md:items-start">
        <h2 className="text-2xl mb-8 md:mb-16">Welcome back, reader! 👋</h2>
        <form className="flex flex-col gap-4 items-start w-full max-w-sm">
          <div className="flex flex-col w-full items-start gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" name="email" required />
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" name="password" required />
          </div>
          <Button className="py-3 w-full" formAction={login}>Let&apos;s go!</Button>
        </form>
        <div className="flex flex-row items-center mt-8">
          <Label>Don't have an account?</Label>
          <Button asChild variant="link">
            <Link href="/signup">👉 Create a new one</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
