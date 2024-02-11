/* eslint-disable @typescript-eslint/no-misused-promises */
import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-4 items-center max-w-80">
      <label htmlFor="email">Email:</label>
      <input className="border border-gray-500 rounded-sm" id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input className="border border-gray-500 rounded-sm" id="password" name="password" type="password" required />
      <button className="px-6 py-2 border border-gray-500 rounded-sm" formAction={login}>Log in</button>
      <button className="px-6 py-2 border border-gray-500 rounded-sm" formAction={signup}>Sign up</button>
    </form>
  )
}
