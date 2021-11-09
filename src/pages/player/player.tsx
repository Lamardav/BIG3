import { PlayerContent } from "./components/playerContent/playerContent";
import { useAppDispatch } from "../../core/redux/store";
import { useEffect } from "react";
import { reset } from "../../modules/player/playerSlice";

export const Player = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <div>
      <PlayerContent />
    </div>
  );
};
