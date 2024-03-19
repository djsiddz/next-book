import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from 'ZC/ui/avatar';
import { createClient } from 'ZU/supabase/server';

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }
  return (
    <div className="flex flex-col items-center min-h-screen gap-4 mt-8">
      <h1 className="text-xl uppercase">Manage Profile</h1>
      <Avatar>
        <AvatarImage src="https://github.com/djsiddz.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>Hello {data.user.email}!</p>
      <p className="mt-8">Profile management will be available soon.</p>
    </div>
  )
}
