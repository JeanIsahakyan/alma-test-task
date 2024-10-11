import { LeftNav } from '@/components/dashboard/layout/left-nav';
import { LeftNavMobile } from '@/components/dashboard/layout/left-nav-mobile';
import { ReactNode } from 'react';
import { auth, signIn } from '@/services/auth';

const items = [
  {
    name: 'leads',
    label: 'Leads',
    href: '/dashboard',
  },
  {
    name: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
  }
];

interface Props {
  children: ReactNode;
  active: string;
}

export default async function DashboardLayout({ active, children }: Props) {
  const session = await auth();
  if (!session) {
    return signIn(undefined, {
      redirectTo: '/dashboard'
    });
  }
  const menuItems = items.map((item) => ({
    ...item,
    active: active === item.name,
  }));
  const activeItem = menuItems.find((item) => item.active);
  const menu = (
    <LeftNav items={menuItems}/>
  )

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex flex-col w-64 ">
        <aside className="hidden md:flex fixed left-0 top-0 h-screen flex-col w-60 border-r ">
          {menu}
        </aside>
      </div>
      <main className="flex-1 flex flex-col">
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <LeftNavMobile menu={menu}/>
            <div className="flex flex-grow self-center min-h-[36px] ">
              <h1 className="text-2xl font-bold">{activeItem?.label}</h1>
            </div>
          </div>
        </div>
        <div className="p-3 flex-1 w-full lg:max-w-screen-md ">
          {children}
        </div>
      </main>
    </div>
  );
}
