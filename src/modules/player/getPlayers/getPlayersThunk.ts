import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../../api/baseFetch";

export const fetchGetPlayer = createAsyncThunk(
  "getplayers/fetchGetPlayers",
  async function FetchGET(fetchParams: any, { rejectWithValue }) {
    const { page, pageLimit, playerName, categories } = fetchParams;
    try {
      let Url;
      !fetchParams
        ? (Url = `api/Player/GetPlayers`)
        : categories === "" && playerName === ""
        ? (Url = `api/Player/GetPlayers?Page=${page}&PageSize=${pageLimit}`)
        : categories === "" && playerName !== ""
        ? (Url = `api/Player/GetPlayers?Name=${playerName}&Page=1`)
        : categories !== "" && playerName === ""
        ? (Url = `api/Player/GetPlayers?${categories}&Page=1`)
        : categories !== "" && playerName !== ""
        ? (Url = `api/Player/GetPlayers?${categories}&Name=${playerName}&Page=1`)
        : (Url = `api/Player/GetPlayers`);

      const fetchGetPlayers = await baseFetch({
        url: `${Url}`,
        method: "GET",
      });
      return fetchGetPlayers;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
