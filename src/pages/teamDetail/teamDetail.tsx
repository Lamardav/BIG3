import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TeamDetailUp } from "./components/teamDetailUp/teamDetailUp";
import { TeamsDetailDown } from "./components/teamDetailDown/teamsDetailDown";
import { fetchGetTeamById } from "../../modules/team/teamThunk";
import { useAppDispatch } from "../../core/redux/store";
import { fetchGetPlayer } from "../../modules/player/playerThunk";
import classes from "./teamDetail.module.css";

export const TeamDetail = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const [teamInfo, setTeamInfo] = useState<any>(0);
  const [teamInfoPlayers, setTeamInfoPlayers] = useState<any>(0);

  useEffect(() => {
    dispatch(fetchGetTeamById(+id)).then((val) => {
      console.log(val);

      setTeamInfo(val.payload);
    });
    dispatch(fetchGetPlayer({})).then((val) => {
      console.log(val);

      setTeamInfoPlayers(val.payload.data);
    });
  }, [dispatch, id]);
  return (
    <div className={classes.AppDetail}>
      <TeamDetailUp teamInfo={teamInfo} />
      <TeamsDetailDown teamInfoPlayers={teamInfoPlayers} teamInfo={teamInfo} />
    </div>
  );
};
