import { Lead } from '@/services/leads';

export interface LeadsState {
  [key: string]: LocalExtendedLead;
}

export interface LocalExtendedLead extends Lead {
  loading?: boolean;
}

export interface LocalLead {
  id?: number;
  name: string;
  resume?: string;
  submit_date: string;
  status: 'PENDING' | 'REACHED_OUT',
  country: string;
  loading?: boolean;
}
