import { combineReducers } from '@reduxjs/toolkit';

import { leadsReducer } from './leads';
import { formReducer } from '@/store/form';

export const rootReducer = combineReducers({
  leads: leadsReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
