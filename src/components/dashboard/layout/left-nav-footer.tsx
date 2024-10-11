import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { auth } from '@/services/auth';
import { LeftNavFooterLogout } from '@/components/dashboard/layout/left-nav-footer-logout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


export const  LeftNavFooter = async () => {
  const data = await auth();
  if (!data) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="gap-2 items-center flex flex-row cursor-pointer hover:bg-primary/5 p-2 rounded-xl">
          <Avatar>
            <AvatarFallback className="font-bold">{data?.user?.name?.split('')[0]}</AvatarFallback>
          </Avatar>
          <div className="font-bold">
            {data?.user?.name}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        <LeftNavFooterLogout/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
