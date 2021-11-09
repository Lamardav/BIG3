import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TeamDetailUp } from "./components/teamDetailUp/teamDetailUp";
import { TeamsDetailDown } from "./components/teamDetailDown/teamsDetailDown";
import { useAppSelector } from "../../core/redux/store";
import { fetchGetTeamById } from "../../modules/team/getTeamById/getTeamByIdThunk";
import { useAppDispatch } from "../../core/redux/store";
import { fetchGetPlayer } from "../../modules/player/getPlayers/getPlayersThunk";
import classes from "./teamDetail.module.css";
import { ErrorValidation } from "../../ui/error/errorValidation";

export const TeamDetail = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const [teamInfo, setTeamInfo] = useState<any>(0);
  const [teamInfoPlayers, setTeamInfoPlayers] = useState<any>(0);

  useEffect(() => {
    dispatch(fetchGetTeamById(+id)).then((val) => {
      setTeamInfo(val.payload);
    });
    dispatch(fetchGetPlayer([])).then((val) => {
      setTeamInfoPlayers(val.payload.data);
    });
  }, [dispatch, id]);
  return (
    <div>
      <div className={classes.AppDetail}>
        <TeamDetailUp teamInfo={teamInfo} />

        <TeamsDetailDown teamInfoPlayers={teamInfoPlayers} teamInfo={teamInfo} />
      </div>
    </div>
  );
};
