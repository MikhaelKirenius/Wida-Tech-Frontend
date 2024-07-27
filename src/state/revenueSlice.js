import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axios";
import { endpoint } from "../config/endpoint";

export const fetchMonthlyRevenue = createAsyncThunk(
  "revenue/fetchMonthlyRevenue",
  async () => {
    const response = await axiosInstance.get(`${endpoint.getMonthlyInvoice}`);
    return response.data;
  }
);

export const fetchWeeklyRevenue = createAsyncThunk(
  "revenue/fetchWeeklyRevenue",
  async () => {
    const response = await axiosInstance.get(`${endpoint.getWeeklyInvoice}`);
    return response.data;
  }
);

export const fetchDailyRevenue = createAsyncThunk(
  "revenue/fetchDailyRevenue",
  async () => {
    const response = await axiosInstance.get(`${endpoint.getDailyInvoice}`);
    return response.data;
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    daily: [],
    weekly: [],
    monthly: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyRevenue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeeklyRevenue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weekly = action.payload;
      })
      .addCase(fetchWeeklyRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDailyRevenue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDailyRevenue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.daily = action.payload;
      })
      .addCase(fetchDailyRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMonthlyRevenue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.monthly = action.payload;
      })
      .addCase(fetchMonthlyRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default revenueSlice.reducer;
