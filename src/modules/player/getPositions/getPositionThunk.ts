import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../../api/baseFetch";

export const fetchGetPos = createAsyncThunk(
  "getpos/fetchGetPos",
  async function FetchGET(_, { rejectWithValue }) {
    try {
      const fetchPos = await baseFetch({
        url: "api/Player/GetPositions",
        method: "GET",
      });

      return fetchPos;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
