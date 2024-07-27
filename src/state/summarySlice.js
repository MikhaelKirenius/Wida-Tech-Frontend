import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../config/axios";
import { endpoint } from "../config/endpoint";

export const fetchSummary = createAsyncThunk('summary/fetchSummary', async () => {
  const response = await axiosInstance.get(`${endpoint.getSummary}`); 
  return response.data;
});

const summarySlice = createSlice({
  name: 'summary',
  initialState: {
    total_invoices: 0,
    total_invoices_today: 0,
    total_amount_paid: 0.0,
    total_amount_paid_today: 0.0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.total_invoices = action.payload.total_invoices;
        state.total_invoices_today = action.payload.total_invoices_today;
        state.total_amount_paid = action.payload.total_amount_paid;
        state.total_amount_paid_today = action.payload.total_amount_paid_today;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default summarySlice.reducer;
