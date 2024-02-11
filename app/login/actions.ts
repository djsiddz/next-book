'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // TODO: Possible errors to handle:
    // 1. AuthApiError: Email not confirmed
    redirect('/error');
  }
  
  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // TODO: Possible errors to handle:
    // 1. AuthWeakPasswordError: Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};\'\:"|<>?,./`~.
    redirect('/error')
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}