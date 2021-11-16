import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayersDetailUp } from "./components/playersDetailUp/playersDetailUp";
import { fetchGetPlayerById } from "../../modules/player/playerThunk";
import { useAppDispatch } from "../../core/redux/store";
import classes from "./playerDetail.module.css";

export const PlayerDetail = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const [teamInfoPlayers, setTeamInfoPlayers] = useState<any>(0);
  useEffect(() => {
    dispatch(fetchGetPlayerById(+id)).then((val) => {
      setTeamInfoPlayers(val.payload);
    });
  }, [dispatch, id]);
  return (
    <div className={classes.AppDetail}>
      <PlayersDetailUp teamInfoPlayers={teamInfoPlayers} />
    </div>
  );
};
