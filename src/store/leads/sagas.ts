import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { leadsActions, leadSelector } from './index';
import { apiRequest } from '@/lib/utils';
import { Lead } from '@/services/leads';
import { PayloadAction } from '@reduxjs/toolkit';
import { LocalExtendedLead } from '@/store/leads/types';

function* loadLeadsWorker() {
  try {
    const response: {status: string; leads: Lead[]} = yield call(apiRequest, `leads`);
    if (response.status === 'success') {
      yield put(leadsActions.setLeads(response.leads));
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message);
    }
  }
}

function* reachedOutWorker(action: PayloadAction<number>) {
  try {
    const lead: LocalExtendedLead = yield select(leadSelector, action.payload);
    if (lead?.loading) {
      return;
    }
    yield put(leadsActions.setLead({
      ...lead,
      loading: true
    }));
    const response: {status: string; lead: Lead, message?: string;} = yield call(apiRequest, `leads/reached_out`, {
      id: action.payload,
    });
    if (response.status === 'success') {
      yield put(leadsActions.setLead(response.lead));
    } else if (response.message) {
      alert(response.message);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message);
    }
  }
}

export function* leadsSaga() {
  yield all([
    takeLatest(leadsActions.reachedOut, reachedOutWorker),
    takeLatest(leadsActions.loadLeads, loadLeadsWorker),
  ]);
}

