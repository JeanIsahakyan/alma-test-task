import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { LeadsState, LocalExtendedLead, LocalLead } from './types';
import { useSelector } from 'react-redux';
import { Lead } from '@/services/leads';

const initialState: LeadsState = {
};

export const { actions: leadsActions, reducer: leadsReducer } = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    reachedOut(state, action: PayloadAction<number>) {},
    loadLeads() {},
    setLead(state, action: PayloadAction<LocalExtendedLead>) {
      const lead = action.payload;
      state[lead.id] = lead;
    },
    setLeads(state, action: PayloadAction<LocalExtendedLead[]>) {
      action.payload.forEach((lead) => {
        state[lead.id] = lead;
      });
    },
  },
});

export const leadsSelector = (state: RootState) => state.leads;

const leadsListSelector = createSelector(leadsSelector, (state): LocalLead[] => Object.values(state).map((lead: LocalExtendedLead): LocalLead => ({
  id: lead.id,
  country: lead.citizenship,
  loading: lead.loading,
  submit_date: lead.submit_date,
  status: lead.status,
  resume: lead.resume,
  name: `${lead.first_name} ${lead.last_name}`,
})));

export const leadSelector= createSelector(
  leadsSelector,
  (_, leadsId: number) => leadsId,
  (leads, leadsId: number) => {
    return leads[leadsId];
  },
);


export const useLeadSelector = (leadId: number): LocalLead => {
 return useSelector((state: RootState) => leadSelector(state, leadId));
};


export const useLeadsListSelector = (): Lead[] => {
 return useSelector((state: RootState) => leadsListSelector(state));
};


