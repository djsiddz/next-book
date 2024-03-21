"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { signupOnWaitlist } from '../login/actions';

import { ChevronRightSquareIcon } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

import { Button } from 'ZC/ui/button';
import { Input } from 'ZC/ui/input';
import { Label } from 'ZC/ui/label';

export default function WaitlistPage() {
  const searchParams = useSearchParams();
  const campaign = searchParams.get("campaign") || "";

  return (
    <div className="flex min-w-full min-h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-10 bg-yellow-100 flex justify-center items-center">
        <ChevronRightSquareIcon size={96} />
      </div>
      <div className="w-full md:w-1/2 py-10 px-4 md:p-10 flex flex-col justify-center items-center md:items-start">
        <h2 className="text-2xl mb-8 md:mb-16">Hello new reader! 😄</h2>
        <form className="flex flex-col gap-4 items-start w-full max-w-sm">
          <div className="flex flex-col w-full items-start gap-2">
            <Label htmlFor="name">Your Name</Label>
            <Input type="text" id="name" placeholder="Your Name" name="name" required />
            <Label htmlFor="email">Your Email</Label>
            <Input type="email" id="email" placeholder="Email" name="email" required />
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" name="password" required />
            <Label htmlFor="campaign">Campaign</Label>
            <Input type="text" id="campaign" value={campaign} name="campaign" readOnly required />
            <p className="text-xs text-gray-600">This is for me to know how you found Next Book.</p>
          </div>
          <Button className="py-3 w-full" formAction={signupOnWaitlist}>Join the Waitlist!</Button>
        </form>
        <div className="flex flex-row items-center mt-8">
          We'll securely store your email and update you once we are ready for you!
        </div>
      </div>
    </div>
  )
}
