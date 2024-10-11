import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { FormState } from './types';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { Leads } from '@/services/leads';

const initialState: FormState = {
};

export const { actions: formActions, reducer: formReducer } = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addLeadWorker(state, action: PayloadAction<z.infer<typeof Leads.formSchema>>) {},
    setForm(state, action: PayloadAction<FormState>) {
      const form = action.payload;
     return state = {
        ...state,
        ...form,
      };
    },
  },
});

export const formSelector = (state: RootState) => state.form;

export const useFormSelector = (): FormState => {
 return useSelector((state: RootState) => formSelector(state));
};



