import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../../api/baseFetch";

export const fetchGetPlayerById = createAsyncThunk(
  "getpos/fetchGetPos",
  async function FetchGET(id: number, { rejectWithValue }) {
    try {
      const fetchFindPlayerById = await baseFetch({
        url: `api/Player/Get?id=${id}`,
        method: "GET",
      });

      return fetchFindPlayerById;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
