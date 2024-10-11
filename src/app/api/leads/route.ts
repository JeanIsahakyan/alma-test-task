import { NextResponse } from 'next/server';
import { auth } from '@/services/auth';
import { Leads } from '@/services/leads';


export const POST = auth(async (request) => {
  if (!request.auth) {
    return NextResponse.json({ status: "error", message: 'Access Denied' });
  }
  return NextResponse.json({ status: 'success', leads: Leads.getLeads() });
});
