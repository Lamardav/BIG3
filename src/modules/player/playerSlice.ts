import { createSlice } from "@reduxjs/toolkit";
import { fetchGetPlayer } from "./playerThunk";
import { fetchNewPlayer } from "./playerThunk";
import { deletePlayer } from "./playerThunk";
import { fetchGetPlayerById } from "./playerThunk";
import { updatePlayer } from "./playerThunk";
import { fetchGetPos } from "./playerThunk";

export interface IPlayer {
  loading: boolean;
  players: [];
  infoPlayer: [];
  positions: [];
}

const initialState: IPlayer = {
  loading: false,
  players: [],
  infoPlayer: [],
  positions: [],
};

const playersSlice = createSlice({
  name: "players",

  initialState,
  reducers: { reset: () => initialState },
  extraReducers: (builder) => {
    builder.addCase(fetchNewPlayer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNewPlayer.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchNewPlayer.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchGetPlayer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetPlayer.fulfilled, (state, action) => {
      state.loading = false;
      state.players = action.payload;
    });
    builder.addCase(fetchGetPlayer.rejected, (state) => {
      state.loading = false;
      state.players = [];
    });
    builder.addCase(deletePlayer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePlayer.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePlayer.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchGetPlayerById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetPlayerById.fulfilled, (state, action) => {
      state.loading = false;
      state.infoPlayer = action.payload;
    });
    builder.addCase(fetchGetPlayerById.rejected, (state) => {
      state.infoPlayer = [];
      state.loading = false;
    });
    builder.addCase(updatePlayer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePlayer.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePlayer.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchGetPos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetPos.fulfilled, (state, action) => {
      state.loading = false;
      state.positions = action.payload;
    });
    builder.addCase(fetchGetPos.rejected, (state, action) => {
      state.loading = false;
      state.positions = [];
    });
  },
});
export const playersSliceReducer = playersSlice.reducer;
export const { reset } = playersSlice.actions;
