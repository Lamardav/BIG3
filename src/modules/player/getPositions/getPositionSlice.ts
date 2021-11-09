import { createSlice } from "@reduxjs/toolkit";
import { fetchGetPos } from "./getPositionThunk";
import { IGetPos } from "../../../api/dto/IGetPlayers";

const initialState: IGetPos = {
  error: null,
  status: null,
  loading: false,
  positions: [],
};

const getPosSlice = createSlice({
  name: "getpos",

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetPos.pending, (state) => {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGetPos.fulfilled, (state, action) => {
      state.status = "resolved";
      state.loading = false;
      state.error = false;
      state.positions = action.payload;
    });
    builder.addCase(fetchGetPos.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      state.loading = false;
    });
  },
});
export const getPosSliceReducer = getPosSlice.reducer;
