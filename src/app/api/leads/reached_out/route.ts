import { NextResponse } from 'next/server';
import { auth } from '@/services/auth';
import { Leads } from '@/services/leads';

export const POST = auth(async (request) => {
  if (!request.auth) {
    return NextResponse.json({ status: "error", message: 'Access Denied' });
  }
  const formData = await request.formData();
  if (!formData.has('id')) {
    return NextResponse.json({ status: "error", message: 'Lead not found' });
  }
  const id = formData.get('id') as unknown as number;
  const lead = Leads.getLead(id);
  if (!lead) {
    return NextResponse.json({ status: "error", message: 'Lead not found' });
  }
  lead.status = 'REACHED_OUT';
  Leads.setLead(lead);
  return NextResponse.json({ status: 'success', lead });
});
