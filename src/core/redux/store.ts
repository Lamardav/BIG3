import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "../../modules/auth/authSlice";
import { filterSliceReducer } from "../../modules/filters/filterSlice";
import { teamsSliceReducer } from "../../modules/team/teamSlice";
import { playersSliceReducer } from "../../modules/player/playerSlice";

export const store = configureStore({
  reducer: {
    authorization: authSliceReducer,
    filter: filterSliceReducer,
    team: teamsSliceReducer,
    players: playersSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
