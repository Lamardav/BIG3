import { InputPlayersForm } from "./components/imputPlayersForm";
import { useAppDispatch } from "../../core/redux/store";
import { useEffect } from "react";
import { reset } from "../../modules/player/playerSlice";

export const PlayersAdd = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <>
      <InputPlayersForm />
    </>
  );
};
