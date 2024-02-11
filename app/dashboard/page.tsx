import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function PrivatePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    // eslint-disable-next-line no-console
    console.log(error);
    redirect('/')
  }

  return <p>Hello {data.user.email}</p>
}
