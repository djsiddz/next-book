import { ChevronRightSquareIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from 'ZC/ui/button';


export default function NotFound() {
  return (
    <div className="p-10">
      <main className="flex pt-8 md:pt-0 min-h-screen flex-col justify-center items-center text-center">
        <p className="text-xs md:text-lg leading-8 uppercase mb-16">This page intentionally left blank. <br />Or not. Who knows!</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button asChild className="w-min text-sm md:text-lg px-5 py-6">
            <Link href="/">Take me home <ChevronRightSquareIcon className="ml-4" /> </Link>
          </Button>
          <Button variant="secondary" asChild className="w-min text-sm md:text-lg px-5 py-6">
            <Link href="https://english.stackexchange.com/questions/116053/this-page-intentionally-left-blank">Read more</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
