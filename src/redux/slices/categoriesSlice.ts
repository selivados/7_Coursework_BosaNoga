import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ICategory } from "../../models";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ICategoriesState {
  categories: ICategory[];
  loading: boolean;
  error: string;
}

const initialState: ICategoriesState = {
  categories: [],
  loading: false,
  error: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);

      if (!response.ok) {
        return rejectWithValue("Loading error!");
      }

      return await response.json();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  selectors: {
    categoriesState: (state) => state,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { categoriesState } = categoriesSlice.selectors;
export default categoriesSlice.reducer;
