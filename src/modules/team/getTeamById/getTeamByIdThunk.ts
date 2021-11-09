import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../../api/baseFetch";

export const fetchGetTeamById = createAsyncThunk(
  "getpos/fetchGetPos",
  async function FetchGET(id: number, { rejectWithValue }) {
    try {
      const fetchFindTeamById = await baseFetch({
        url: `api/Team/Get?id=${id}`,
        method: "GET",
      });

      return fetchFindTeamById;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
