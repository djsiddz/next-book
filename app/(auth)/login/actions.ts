"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "ZU/supabase/server";

export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // TODO: Possible errors to handle:
    // 1. AuthApiError: Email not confirmed
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signupOnWaitlist(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        screen_name: formData.get("screen_name") as string,
        full_name: formData.get("name") as string,
        avatar_url: null,
        campaign: formData.get("campaign") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    // TODO: Possible errors to handle:
    // 1. AuthWeakPasswordError: Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};\'\:"|<>?,./`~.
    // 2. AuthApiError: Database error saving new user
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/waitlist");
}

export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    // TODO: Possible errors to handle:
    // 1. AuthWeakPasswordError: Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};\'\:"|<>?,./`~.
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();
  if (!error) {
    revalidatePath("/", "layout");
    redirect("/logout?status=success");
  }

  throw error;
}
