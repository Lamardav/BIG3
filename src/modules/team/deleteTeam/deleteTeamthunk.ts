import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../../api/baseFetch";

export const deleteTeam = createAsyncThunk(
  "deleteteam/DeleteTeam",
  async function (id: number, { rejectWithValue }) {
    try {
      const fetchDeleteTeam = await baseFetch({
        url: `api/Team/Delete?id=${id}`,
        method: "DELETE",
      });

      return fetchDeleteTeam;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
