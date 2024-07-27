import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axios';
import { endpoint } from '../config/endpoint';


export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async ({ page, limit }) => {
    const response = await axiosInstance.get(`${endpoint.getInvoice}`, {
      params: { page, limit },
    });
    return response.data; 
  }
);

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    page: 1,
    limit: 10,
    total: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Replace items with the new page of invoices
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = invoicesSlice.actions;

export default invoicesSlice.reducer;
