import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IProductDetails } from "../../models";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface IProductState {
  products: IProductDetails[];
  loading: boolean;
  error: string;
}

const initialState: IProductState = {
  products: [],
  loading: false,
  error: "",
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/items/${id}`);

      if (!response.ok) {
        return rejectWithValue("Loading error!");
      }

      return await response.json();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  selectors: {
    productState: (state) => state,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = [action.payload];
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { productState } = productSlice.selectors;
export default productSlice.reducer;
