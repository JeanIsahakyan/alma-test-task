import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { formActions, formSelector } from './index';
import { apiRequest } from '@/lib/utils';
import { Lead, Leads } from '@/services/leads';
import { PayloadAction } from '@reduxjs/toolkit';
import { FormState } from '@/store/form/types';
import { z } from 'zod';

function* addLeadWorker(action: PayloadAction<z.infer<typeof Leads.formSchema>>) {
  try {
    const formState: FormState = yield select(formSelector);
    if (formState?.loading) {
      return;
    }
    yield put(formActions.setForm({
      loading: true,
    }));
    const params = {
      ...action.payload,
      visas: action.payload.visas.join(','),
    };
    const response: {status: string; lead: Lead, message?: string;} = yield call(apiRequest, `leads/create`, params);
    if (response.status === 'success') {
      yield put(formActions.setForm({
        loading: false,
        success: true,
      }));
    } else if (response.message) {
      yield put(formActions.setForm({
        loading: false,
        error: response.message,
      }));
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(formActions.setForm({
        loading: false,
        error: err.message,
      }));
    }
  }
}

export function* formSaga() {
  yield all([
    takeLatest(formActions.addLeadWorker, addLeadWorker),
  ]);
}

