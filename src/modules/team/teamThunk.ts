import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMapGetTeams } from "../../api/dto/IGetTeams";
import { baseFetch } from "../../api/baseFetch";

export const fetchNewTeam = createAsyncThunk(
  "addnewteam/fetchNewTeam",
  async function (data: IMapGetTeams, { rejectWithValue }) {
    try {
      const fetchNewTeams = await baseFetch({
        url: "api/Team/Add",
        method: "POST",
        body: JSON.stringify(data),
      });
      return fetchNewTeams;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);

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

export const fetchGetTeamById = createAsyncThunk(
  "getpos/fetchGetTeamById",
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
        : fetchParams && teamNames !== "" && teamNames
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

export const updateTeam = createAsyncThunk(
  "updateteam/UpdateTeam",
  async function (data: IMapGetTeams, { rejectWithValue }) {
    try {
      const fetchPutTeam = await baseFetch({
        url: "api/Team/Update",
        method: "PUT",
        body: JSON.stringify(data),
      });
      return fetchPutTeam;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
