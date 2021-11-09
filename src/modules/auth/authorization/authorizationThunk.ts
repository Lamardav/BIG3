import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormImputs } from "../../../api/dto/IAuthorization";
import { baseFetch } from "../../../api/baseFetch";

export const fetchLogin = createAsyncThunk(
  "authorization/fetchLogin",
  async function (data: IFormImputs, { rejectWithValue }) {
    try {
      const fetchNewTeam = await baseFetch({
        url: "api/Auth/SignIn",
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!fetchNewTeam.token) {
        throw new Error("Wrong password. Please, try again.");
      } else {
        const setCookie = (c_name: string, value: string, exdays: number) => {
          var exdate = new Date();

          exdate.setDate(exdate.getDate() + exdays);
          var c_value =
            escape(value) + (exdays == null ? "" : "; Secure;expires=" + exdate.toUTCString());
          document.cookie = c_name + "=" + c_value;
        };
        setCookie("token", fetchNewTeam.token, 7);
        setCookie("name", fetchNewTeam.name, 7);
      }

      return fetchNewTeam;
    } catch (err: any) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  },
);
