import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IProduct } from "../../models";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ITopSalesState {
  products: IProduct[];
  loading: boolean;
  error: string;
}

const initialState: ITopSalesState = {
  products: [],
  loading: false,
  error: "",
};

export const fetchTopSales = createAsyncThunk(
  "topSales/fetchTopSales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/top-sales`);

      if (!response.ok) {
        return rejectWithValue("Loading error!");
      }

      return await response.json();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const topSalesSlice = createSlice({
  name: "topSales",
  initialState,
  selectors: {
    topSalesState: (state) => state,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { topSalesState } = topSalesSlice.selectors;
export default topSalesSlice.reducer;
