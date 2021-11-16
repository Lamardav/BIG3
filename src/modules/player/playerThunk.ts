import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch } from "../../api/baseFetch";
import { FormInput } from "../../api/dto/IGetTeams";

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

export const fetchGetPlayerById = createAsyncThunk(
  "getpos/fetchGetTeamById",
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

export const fetchGetPlayer = createAsyncThunk(
  "getplayers/fetchGetPlayers",
  async function FetchGET(fetchParams: any, { rejectWithValue }) {
    const { page, pageLimit, playerName, categories } = fetchParams;
    try {
      let Url;
      fetchParams &&
      Object.keys(fetchParams).length === 0 &&
      Object.getPrototypeOf(fetchParams) === Object.prototype
        ? (Url = `api/Player/GetPlayers`)
        : !fetchParams
        ? (Url = `api/Player/GetPlayers`)
        : categories === "" && playerName === ""
        ? (Url = `api/Player/GetPlayers?Page=${page}&PageSize=${pageLimit}`)
        : categories === "" && playerName !== ""
        ? (Url = `api/Player/GetPlayers?Name=${playerName}&Page=1&PageSize=${pageLimit}`)
        : categories !== "" && playerName === ""
        ? (Url = `api/Player/GetPlayers?${categories}&Page=1&PageSize=${pageLimit}`)
        : categories !== "" && playerName !== ""
        ? (Url = `api/Player/GetPlayers?${categories}&Name=${playerName}&Page=1&PageSize=${pageLimit}`)
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
