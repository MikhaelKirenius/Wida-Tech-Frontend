import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axios';
import { endpoint } from '../config/endpoint';

export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (formData) => {
    const response = await axiosInstance.post(`${endpoint.addInvoice}`, formData);
    return response.data;
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default formSlice.reducer;