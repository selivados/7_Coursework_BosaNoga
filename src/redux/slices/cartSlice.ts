import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IOrder, IProductInCart } from "../../models";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ICartState {
  cart: IProductInCart[];
  loading: boolean;
  success: boolean;
  error: string;
}

const initialState: ICartState = {
  cart: [],
  loading: false,
  success: false,
  error: "",
};

export const postOrder = createAsyncThunk(
  "cart/postOrder",
  async (data: IOrder, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return rejectWithValue("Loading error!");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  selectors: {
    cartState: (state) => state,
    cartPositionsCount: (state) => state.cart.length,
    cartTotalCost: (state) => state.cart.reduce((totalCost, product) => totalCost + product.totalCost, 0),
  },
  reducers: {
    addToCart: (state, action) => {
      const index = state.cart.findIndex(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );

      if (index !== -1) {
        state.cart[index].count += action.payload.count;
        state.cart[index].totalCost += action.payload.totalCost;
      } else {
        state.cart = [...state.cart, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );

      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = "";
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = "";
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { cartState, cartPositionsCount, cartTotalCost } = cartSlice.selectors;
export const { addToCart, removeFromCart, clearCart, setSuccess } = cartSlice.actions;
export default cartSlice.reducer;
