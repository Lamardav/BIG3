import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormImputsSignUp } from "../../../api/dto/ISignUp";
import { baseFetch } from "../../../api/baseFetch";

export const fetchSignUp = createAsyncThunk(
  "signup/fetchSignUp",
  async function (data: IFormImputsSignUp, { rejectWithValue }) {
    try {
      const fetchSignUp = await baseFetch({
        url: "api/Auth/SignUp",
        method: "POST",
        body: JSON.stringify(data),
      });
      return fetchSignUp;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
