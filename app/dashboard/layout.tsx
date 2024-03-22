import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import DashboardNav from "ZC/native/DashboardNav";

import { createClient } from "ZU/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="p-10">
      <DashboardNav email={data.user.email} />
      {children}
    </div>
  );
}
