import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "./authThunk";
import { fetchSignUp } from "./authThunk";

export interface IAuthorization {
  loading: boolean;
  name: string | null;
  token: string | null;
}

const initialState: IAuthorization = {
  loading: false,
  name: null,
  token: null,
};

const authSlice = createSlice({
  name: "authorization",

  initialState,
  reducers: { reset: () => initialState },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.name = action.payload.name;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.name = null;
    });
    builder.addCase(fetchSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { reset } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
