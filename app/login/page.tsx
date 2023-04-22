import { Header } from '@/templates/Header';
import { LoginForm } from '@/templates/LoginForm';

export default function Login() {
  return (
    <>
      <div className="p-10">
        <Header showNavigation={false} />
        <main className="flex h-screen flex-col justify-center">
          <h1 className="mb-6 text-6xl">Hello there!</h1>
          <p className="text-md mb-6">Sign in to get started!</p>
          <LoginForm />
        </main>
      </div>
    </>
  );
}
