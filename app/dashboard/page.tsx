import { BookSearch } from "ZC/native/BookSearch";

export default function Dashboard() {
  return (
    <div className="mt-8 flex min-h-screen flex-col items-center gap-4">
      <h1 className="text-xl uppercase">Welcome!</h1>
      <p className="text-center">
        It's nice to see you here. 😄
        <br /> Now let's bring your books collection here.
      </p>
      <div className="mt-8">
        <BookSearch buttonVariant={"default"} searchButtonLabel="Add Your First Book" />
      </div>
    </div>
  );
}
