import { redirect } from "next/navigation";

import DashboardNav from "ZC/native/DashboardNav";
import { createClient } from "ZU/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

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
