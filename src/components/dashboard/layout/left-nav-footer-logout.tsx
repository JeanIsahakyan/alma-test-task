'use client'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import React, { useCallback } from 'react';
import { signOut } from 'next-auth/react';

export const LeftNavFooterLogout = () => {
  const doLogout = useCallback(() => signOut({
    redirectTo: '/'
  }), []);

  return (
    <DropdownMenuItem onClick={doLogout}>
      Log Out
    </DropdownMenuItem>
  );
}
