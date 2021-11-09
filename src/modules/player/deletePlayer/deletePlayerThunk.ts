import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../../api/baseFetch";

export const deletePlayer = createAsyncThunk(
  "deleteplayer/DeletePlayer",
  async function (id: number, { rejectWithValue }) {
    try {
      const fetchDeletePlayer = await baseFetch({
        url: `api/Player/Delete?id=${id}`,
        method: "DELETE",
      });

      return fetchDeletePlayer;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
