import { z } from 'zod';


export interface Lead {
  id?: number;
  first_name: string;
  last_name: string;
  website: string;
  email: string;
  submit_date: string;
  status: 'PENDING' | 'REACHED_OUT';
  citizenship: string;
  visas: string[];
  resume: string;
  message: string;
}

class LeadsInternal {
  private list: {[key: number]: Lead} = {};

  public setLead = (lead: Lead) => {
    if (!lead.hasOwnProperty('id')) {
     lead.id = Object.values(this.list).length;
    }
    this.list[lead.id] = lead;
  }

  public getLeads = (): Lead[] => Object.values(this.list);
  public getLead = (id: number): Lead|undefined => this.list[id];


  public formSchema = z.object({
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    website: z.string().startsWith('http', 'Enter your linkedin / personal website URL.'),
    email: z.string().email("Enter valid email address"),
    citizenship: z.string().min(2, {
      message: "Select your citizenship",
    }),
    resume: z.instanceof(File, {
      message: "Select your Resume / CV",
    }),
    visas: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    message: z.string().min(2, {
      message: "Enter message",
    }),
  });

}

export const Leads = new LeadsInternal();
