import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "ZC/ui/button";

export default function NotFound() {
  return (
    <div className="p-10">
      <main className="flex min-h-screen flex-col items-center justify-center pt-8 text-center md:pt-0">
        <p className="mb-16 text-xs uppercase leading-8 md:text-lg">
          This page intentionally left blank. <br />
          Or not. Who knows!
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Button asChild className="w-min px-5 py-6 text-sm md:text-lg">
            <Link href="/">
              Take me home <ChevronRightSquareIcon className="ml-4" />{" "}
            </Link>
          </Button>
          <Button variant="secondary" asChild className="w-min px-5 py-6 text-sm md:text-lg">
            <Link href="https://english.stackexchange.com/questions/116053/this-page-intentionally-left-blank">
              Read more
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
