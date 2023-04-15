import { Button } from '@/atoms/Button';
import { Header } from '@/templates/Header';

export default function Home() {
  return (
    <div className="p-10">
      <Header />
      <main className="flex h-screen flex-col justify-center">
        <h1 className="mb-6 text-6xl">Keep track of your Books.</h1>
        <p className="mb-12 text-xl">No matter where and how you like to read them.</p>
        <Button href="/login" text="Get Started" />
      </main>
    </div>
  );
}
