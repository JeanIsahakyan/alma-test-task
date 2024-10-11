'use client'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface Props {
  menu: ReactNode;
}

export const LeftNavMobile = ({ menu }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className=" md:hidden">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[350px] sm:w-[400px] p-0  h-[100vh]">
        {menu}
      </SheetContent>
    </Sheet>
  );
}
