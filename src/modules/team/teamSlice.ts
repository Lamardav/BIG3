import { createSlice } from "@reduxjs/toolkit";
import { fetchGetTeams } from "./getTeams/getTeamsThunk";
import { fetchNewTeam } from "./addTeam/addTeamThunk";
import { deleteTeam } from "./deleteTeam/deleteTeamthunk";
import { fetchGetTeamById } from "./getTeamById/getTeamByIdThunk";
import { updateTeam } from "./updateTeam/updateTeamThunk";
import { ITeams } from "../../api/dto/IGetTeams";

const initialState: ITeams = {
  infoTeam: [],
  loading: false,
  team: [],
  count: 0,
};

const teamsSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewTeam.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNewTeam.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchNewTeam.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTeam.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTeam.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchGetTeams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.team = action.payload;
    });
    builder.addCase(fetchGetTeams.rejected, (state, action) => {
      state.loading = false;
      state.team = [];
    });
    builder.addCase(fetchGetTeamById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetTeamById.fulfilled, (state, action) => {
      state.loading = false;
      state.infoTeam = action.payload;
    });
    builder.addCase(fetchGetTeamById.rejected, (state, action) => {
      state.infoTeam = [];
      state.loading = false;
    });
    builder.addCase(updateTeam.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTeam.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const teamsSliceReducer = teamsSlice.reducer;
export const { reset } = teamsSlice.actions;
