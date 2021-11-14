import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../../api/baseFetch";
export const fetchGetTeams = createAsyncThunk(
  "getteams/fetchGetTeams",
  async function FetchGET(fetchParams: any, { rejectWithValue }) {
    const { page, pageLimit, teamNames } = fetchParams;
    try {
      let Url;
      fetchParams &&
      Object.keys(fetchParams).length === 0 &&
      Object.getPrototypeOf(fetchParams) === Object.prototype
        ? (Url = `api/Team/GetTeams`)
        : fetchParams && teamNames === ""
        ? (Url = `api/Team/GetTeams?Page=${page}&PageSize=${pageLimit}`)
        : fetchParams && teamNames !== ""
        ? (Url = `api/Team/GetTeams?Name=${teamNames}`)
        : (Url = `api/Team/GetTeams`);
      const fetchGetTEam = await baseFetch({
        url: `${Url}`,
        method: "GET",
      });
      return fetchGetTEam;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
