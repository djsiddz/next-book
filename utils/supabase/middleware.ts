/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Custom -  If the user is accessing a page other than dashboard, do nothing
  if (request.nextUrl.pathname !== "/dashboard") return supabaseResponse;

  // Custom - If user is not logged in, redirect to login page
  if (!user) {
    return NextResponse.redirect(request.nextUrl.origin + "/login");
    // Supabase suggested way
    // const url = request.nextUrl.clone()
    // url.pathname = '/login'
    // return NextResponse.redirect(url)
  }

  // Custom - Check Waitlist status for user
  // Fetch the user's waitlist entry
  const { data: waitlistStatus } = await supabase.from("profiles").select("approved").eq("user_id", user?.id).single();

  // The user is approved, allow access to dashboard
  // eslint-disable-next-line no-console
  console.log("waitlist status / approved = ", waitlistStatus?.approved);
  if (!waitlistStatus?.approved) {
    return NextResponse.redirect(request.nextUrl.origin + "/waitlist");
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
