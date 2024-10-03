import { redirect } from "next/navigation";

import { BookCard } from "ZC/native/BookCard";
import { createClient } from "ZU/supabase/server";

export default async function MyCollection() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/");
  }

  const { data: booksOwned, error: booksOwnedError } = await supabase
    .from("booksOwned")
    .select("*, book:books(title,subtitle,series_name,series_number,publication,isbn_10,isbn_13)")
    .eq("profile_id", userData.user.id);

  if (booksOwnedError) {
    // eslint-disable-next-line no-console
    console.log("=== Error in my-collection page ", booksOwnedError);
    throw new Error(booksOwnedError.message);
  }

  return (
    <div className="mt-8 flex min-h-screen flex-col items-center gap-4">
      <h1 className="text-xl uppercase">My Collection ({booksOwned?.length})</h1>
      <div className="flex gap-4">
        {booksOwned?.length &&
          booksOwned?.map((owned) => <BookCard title={owned.book?.title ?? ""} key={"owned" + owned.id} />)}
      </div>
    </div>
  );
}
