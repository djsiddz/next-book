import { Button } from '@/atoms/Button';
import { InputField } from '@/atoms/InputField';

export function LoginForm() {
  return (
    <form className="flex w-screen flex-col">
      <InputField type="text" placeholder="you@company.com" label="Email Address" />
      <InputField type="password" placeholder="*********" label="Password" />
      <Button href="/dashboard" text="Login" />
    </form>
  );
}
