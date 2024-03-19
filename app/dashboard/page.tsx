import { Button } from 'ZC/ui/button';

export default function Dashboard() {

  return (
    <div className="flex flex-col items-center min-h-screen gap-4 mt-8">
      <h1 className="text-xl uppercase">Welcome!</h1>
      <p>It's nice to see you here. Let's bring your books collection here and let the magic begin.</p>
      <Button className="mt-8">Add Your First Book</Button>
    </div>
  )
}
