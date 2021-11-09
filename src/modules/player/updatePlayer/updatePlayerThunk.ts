import { createAsyncThunk } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IMapGetTeams } from "../../../api/dto/IGetTeams";
import { baseFetch } from "../../../api/baseFetch";
import { FormInput } from "../../../api/dto/IGetTeams";

export const updatePlayer = createAsyncThunk(
  "updateplayer/UpdatePlayer",
  async function (data: FormInput, { rejectWithValue }) {
    try {
      const fetchPutPlayer = await baseFetch({
        url: "api/Player/Update",
        method: "PUT",
        body: JSON.stringify(data),
      });
      return fetchPutPlayer;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
