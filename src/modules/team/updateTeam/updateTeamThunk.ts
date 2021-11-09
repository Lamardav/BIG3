import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMapGetTeams } from "../../../api/dto/IGetTeams";
import { baseFetch } from "../../../api/baseFetch";

export const updateTeam = createAsyncThunk(
  "updateteam/UpdateTeam",
  async function (data: IMapGetTeams, { rejectWithValue }) {
    try {
      const fetchPutTeam = await baseFetch({
        url: "api/Team/Update",
        method: "PUT",
        body: JSON.stringify(data),
      });
      return fetchPutTeam;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
