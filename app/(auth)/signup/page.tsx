"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Suspense } from "react";
import { signupOnWaitlist } from "../login/actions";

import { ChevronRightSquareIcon } from "lucide-react";

import { useSearchParams } from "next/navigation";

import { Button } from "ZC/ui/button";
import { Input } from "ZC/ui/input";
import { Label } from "ZC/ui/label";

function Campaign() {
  const searchParams = useSearchParams();
  const campaign = searchParams.get("campaign") || "";

  return (
    <>
      <Label htmlFor="campaign">Campaign</Label>
      <Input type="text" id="campaign" value={campaign} name="campaign" readOnly required />
      <p className="text-xs text-gray-600">This is for me to know how you found Next Book.</p>
    </>
  );
}

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen min-w-full flex-col md:flex-row">
      <div className="flex w-full items-center justify-center bg-yellow-100 p-10 md:w-1/2">
        <ChevronRightSquareIcon size={96} />
      </div>
      <div className="flex w-full flex-col items-center justify-center px-4 py-10 md:w-1/2 md:items-start md:p-10">
        <h2 className="mb-8 text-2xl md:mb-16">Hello new reader! 😄</h2>
        <form className="flex w-full max-w-sm flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-2">
            <Label htmlFor="full_name">Your Name</Label>
            <Input type="text" id="full_name" placeholder="Your Name" name="full_name" required />
            <Label htmlFor="screen_name">Screen Name</Label>
            <Input type="text" id="screen_name" placeholder="Choose a Screen Name" name="screen_name" required />
            <Label htmlFor="email">Your Email</Label>
            <Input type="email" id="email" placeholder="Email" name="email" required />
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" name="password" required />
            <Suspense fallback={<p>Verifying...</p>}>
              <Campaign />
            </Suspense>
          </div>
          <Button className="w-full py-3" formAction={signupOnWaitlist}>
            Join the Waitlist!
          </Button>
        </form>
        <div className="mt-8 flex flex-row items-center">
          We'll securely store your email and update you once we are ready for you!
        </div>
      </div>
    </div>
  );
}
