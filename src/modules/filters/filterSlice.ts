import { createSlice } from "@reduxjs/toolkit";

export interface IFilter {
  filteredTeams: string;
}

const initialState: IFilter = {
  filteredTeams: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilteredTeams: (state, action) => {
      state.filteredTeams = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setFilteredTeams, reset } = filterSlice.actions;
export const filterSliceReducer = filterSlice.reducer;
