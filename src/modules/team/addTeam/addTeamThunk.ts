import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMapGetTeams } from "../../../api/dto/IGetTeams";
import { baseFetch } from "../../../api/baseFetch";
export const fetchNewTeam = createAsyncThunk(
  "addnewteam/fetchNewTeam",
  async function (data: IMapGetTeams, { rejectWithValue }) {
    try {
      const fetchNewTeams = await baseFetch({
        url: "api/Team/Add",
        method: "POST",
        body: JSON.stringify(data),
      });
      return fetchNewTeams;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
