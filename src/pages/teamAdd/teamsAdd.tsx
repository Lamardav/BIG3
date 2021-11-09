import { InputTeamsForm } from "./components/InputTeamsForm";
import classes from "./teamAdd.module.css";
import { useAppDispatch } from "../../core/redux/store";
import { useEffect } from "react";
import { reset } from "../../modules/player/playerSlice";

export const TeamsAdd = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <div className={classes.addTeamPage}>
      <InputTeamsForm />
    </div>
  );
};
