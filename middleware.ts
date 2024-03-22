import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "ZU/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await updateSession(request);

  const { data } = await supabase.auth.getSession();
  // If the user is accessing a page other than dashboard, do nothing
  if (request.nextUrl.pathname !== "/dashboard") return response;

  const userLoggedIn = !!data?.session?.user;
  // If user is not logged in, redirect to login page
  if (!userLoggedIn) {
    return NextResponse.redirect(request.nextUrl.origin + "/login");
  }


  const { data: userData } = await supabase.auth.getUser();
  // Fetch the user's waitlist entry
  // eslint-disable-next-line no-console
  const { data: waitlistStatus } = await supabase
    .from("profiles")
    .select("approved")
    .eq("user_id", userData?.user?.id)
    .single();

  // The user is approved, allow access to dashboard
  // eslint-disable-next-line no-console
  console.log("waitlist status / approved = ", waitlistStatus?.approved);
  if (waitlistStatus?.approved) return response;

  // The user is not approved, redirect to waitlist page
  return NextResponse.redirect(request.nextUrl.origin + "/waitlist");
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/dashboard/:path",
    "/waitlist",
  ],
};
