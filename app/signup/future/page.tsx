/* eslint-disable @typescript-eslint/no-misused-promises */
import { signup } from "../../login/actions";

import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "ZC/ui/button";
import { Input } from "ZC/ui/input";
import { Label } from "ZC/ui/label";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen min-w-full flex-col md:flex-row">
      <div className="flex w-full items-center justify-center bg-yellow-100 p-10 md:w-1/2">
        <ChevronRightSquareIcon size={96} />
      </div>
      <div className="flex w-full flex-col items-center justify-center px-4 py-10 md:w-1/2 md:items-start md:p-10">
        <h2 className="mb-8 text-2xl md:mb-16">Hello new reader! 😄</h2>
        <form className="flex w-full max-w-sm flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" name="email" required />
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" name="password" required />
          </div>
          <Button className="w-full py-3" formAction={signup}>
            Sign Me Up!
          </Button>
        </form>
        <div className="mt-8 flex flex-row items-center">
          <Label>Already have an account?</Label>
          <Button asChild variant="link">
            <Link href="/login">👉 Let's start</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
