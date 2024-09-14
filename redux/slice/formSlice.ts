import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface FormDataProps {
  name: string;
  email: string;
  phone: string;
  date: string | null;
  time: string | null;
}

const initialState: FormDataProps = {
  name: '',
  email: '',
  phone: '',
  date: null,
  time: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<FormDataProps>) {
      return action.payload;
    },
    clearFormData() {
      return initialState;
    },
  },
});

export default formSlice;
