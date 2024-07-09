import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IProduct, ISearchOptions } from "../../models";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ICatalogState {
  products: IProduct[];
  stack: IProduct[];
  categoryId: number | null;
  searchText: string;
  loading: boolean;
  error: string;
}

const initialState: ICatalogState = {
  products: [],
  stack: [],
  categoryId: null,
  searchText: "",
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "catalog/fetchProducts",
  async (options: ISearchOptions, { rejectWithValue }) => {
    try {
      const url = new URL(`${BASE_URL}/items`);

      if (options.categoryId) {
        url.searchParams.set("categoryId", String(options.categoryId));
      }

      if (options.offset) {
        url.searchParams.set("offset", String(options.offset));
      }

      if (options.searchText) {
        url.searchParams.set("q", options.searchText);
      }

      const response = await fetch(url);

      if (!response.ok) {
        return rejectWithValue("Loading error!");
      }

      return await response.json();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  selectors: {
    catalogState: (state) => state,
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
      state.stack = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = [...state.products, ...action.payload];
        state.stack = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { catalogState } = catalogSlice.selectors;
export const { setCategoryId, setSearchText, clearProducts } = catalogSlice.actions;
export default catalogSlice.reducer;
