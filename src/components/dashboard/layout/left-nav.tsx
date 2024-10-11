import React from 'react';
import { clsx } from 'clsx';
import { Logo } from '@/components/icons/logo';
import { LeftNavFooter } from '@/components/dashboard/layout/left-nav-footer';
import Link from 'next/link';
import { cn } from '@/lib/utils';


export interface MenuItemProps {
  href: string;
  label: string;
  name?: string;
  active?: boolean;
}

interface Props {
  items: MenuItemProps[];
  active?: string;
  className?: string;
}

export const LeftNav = ({ items, className }: Props) => {
  return (
    <div className="flex flex-col flex-grow h-[100vh] page-nav">
      <div className="p-4">
        <div className="flex flex-grow self-center min-h-[36px] sm:justify-center lg:justify-start">
          <Logo className="w-28"/>
        </div>
      </div>
      <div className="p-5 gap-4 flex flex-col flex-grow mt-10">
        <nav className={clsx('flex flex-col flex-grow space-y-4', className)}>
          {items.map(({label, active, href}) => (
            <Link href={href} key={href}>
              <div className={cn('text-lg', {
                'font-bold': active,
              })}>
                {label}
              </div>
            </Link>
          ))}
        </nav>
        <LeftNavFooter/>
      </div>
    </div>
  )
}
