/* eslint-disable @typescript-eslint/no-misused-promises */
import { signup } from '../login/actions';

import { ChevronRightSquareIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from 'ZC/ui/button';
import { Input } from 'ZC/ui/input';
import { Label } from 'ZC/ui/label';

export default function LoginPage() {
  return (
    <div className="flex min-w-full min-h-screen">
      <div className="w-1/2 p-10 bg-yellow-100 flex justify-center items-center">
        <ChevronRightSquareIcon size={96} />
      </div>
      <div className="w-1/2 p-10 flex flex-col justify-center items-start">
        <h2 className="text-2xl mb-16">Hello new reader! 😄</h2>
        <form className="flex flex-col gap-4 items-start">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" name="email" required />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" name="password" required />
          </div>
          <Button className="py-3 w-full" formAction={signup}>Sign Me Up!</Button>
        </form>
        <div className="flex flex-row items-center mt-8">
          <Label>Already have an account?</Label>
          <Button asChild variant="link">
            <Link href="/login">👉 Let's start</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
