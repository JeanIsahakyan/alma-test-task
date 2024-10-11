import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div  className="w-screen h-screen">
      <div className="max-w-screen-sm p-4 mx-auto mt-10">
        <h1 className="text-2xl my-2">Form</h1>
        <div className="flex gap-2 flex-row">
          <Link href="/form">
            <Button>Open Form</Button>
          </Link>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl my-2">Dashboard</h1>
          <Link href="/dashboard">
            <Button className="mt-2">Open Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
