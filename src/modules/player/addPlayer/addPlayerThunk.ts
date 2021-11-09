import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../../api/baseFetch";
import { FormInput } from "../../../api/dto/IGetTeams";

export const fetchNewPlayer = createAsyncThunk(
  "addnewplayer/fetchNewPlayer",
  async function (data: FormInput, thunkAPI) {
    try {
      const addDataPlayer = await baseFetch({
        url: "api/Player/Add",
        method: "POST",
        body: JSON.stringify(data),
      });
      return addDataPlayer;
    } catch (err: any) {
      if (err.message) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue(err);
      }
    }
  },
);
