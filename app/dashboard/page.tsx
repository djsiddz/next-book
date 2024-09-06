import { Button } from "ZC/ui/button";

export default function Dashboard() {
  return (
    <div className="mt-8 flex min-h-screen flex-col items-center gap-4">
      <h1 className="text-xl uppercase">Welcome!</h1>
      <p className="text-center">
        It's nice to see you here. 😄
        <br /> Now let's bring your books collection here.
      </p>
      <Button className="mt-8">Add Your First Book</Button>
    </div>
  );
}
