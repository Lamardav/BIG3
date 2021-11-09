import { createSlice } from "@reduxjs/toolkit";

export interface IFilter {
  filteredTeams: string;
  filteredCategoryPlayers: any;
  filteredPlayers: string;
}

const initialState: IFilter = {
  filteredTeams: "",
  filteredPlayers: "",
  filteredCategoryPlayers: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilteredTeams: (state, action) => {
      state.filteredTeams = action.payload;
    },
    setFilteredPlayers: (state, action) => {
      state.filteredPlayers = action.payload;
    },
    setFilteredCategortPlayers: (state, action) => {
      state.filteredCategoryPlayers = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setFilteredTeams, setFilteredPlayers, setFilteredCategortPlayers, reset } =
  filterSlice.actions;
export const filterSliceReducer = filterSlice.reducer;
