import { useMemo } from "react";
import { FormInputs } from "../../../../api/dto/IGetPlayers";
import { useEffect, useState } from "react";
import { DeletePlayers } from "../deletePlayers/deletePlayers";
import { UpdatePlayers } from "../updatePlayers/updatePlayers";
import { Link } from "react-router-dom";
import classes from "./playersDetailUp.module.css";
import { fetchGetTeams } from "../../../../modules/team/getTeams/getTeamsThunk";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/store";
import { privatePath } from "../../../routes/path";
import { IMapGetTeams } from "../../../../api/dto/IGetTeams";

export const PlayersDetailUp = ({ teamInfoPlayers }: { teamInfoPlayers: FormInputs }) => {
  const items = useMemo(() => teamInfoPlayers, [teamInfoPlayers]);
  const cur: Date = useMemo(() => new Date(), []);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.players);
  let birthdate: Date | undefined;
  if (items) {
    birthdate = new Date(items.birthday.substring(0, 10).split("-").join("/"));
  }

  const [teams, setTeams] = useState<any>([]);
  useEffect(() => {
    dispatch(fetchGetTeams([])).then((value) => {
      setTeams(value.payload.data);
    });
  }, [dispatch]);
  const hisTeam = useMemo(
    () =>
      teams.find((e: IMapGetTeams) => {
        return e.id === items.team;
      }),
    [items.team, teams],
  );
  if (items) {
    return (
      <div className={classes.detailUp}>
        <div className={classes.detailUpPanel}>
          <div className={classes.navform}>
            <Link to={`${privatePath.player.path}/?page=1&limit=8`}>
              <p className={classes.navigationAdd}>Players</p>
            </Link>
            <p className={classes.brownColor}>&nbsp;/&nbsp;</p>
            <p className={classes.navigationAdd}>{items.name}</p>
          </div>
          <div className={classes.detailIcons}>
            <UpdatePlayers />
            <DeletePlayers />
          </div>
        </div>
        <div className={classes.detailUpInfo}>
          <div className={classes.photoDetailPlayers}>
            <img
              className={classes.photoDetailPlayersImg}
              alt={items.name}
              src={`http://dev.trainee.dex-it.ru${items.avatarUrl}`}
            />
          </div>
          {loading ? (
            "Loading"
          ) : (
            <div className={classes.infoDetail}>
              <h1 className={classes.infoDetailTitel}>
                {items.name}&nbsp;
                <div className={classes.playerNumber}>#{items.number}</div>
              </h1>
              <div className={classes.infoDetailItems}>
                <div className={classes.infoDetailItemsYearOfFoundation}>
                  <h3 className={classes.infoDetailItemsYearOfFoundationH3}>Position:</h3>
                  <p
                    className={classes.infoDetailItemsYearOfFoundationP}
                    style={{ fontWeight: 200 }}>
                    {items.position}
                  </p>
                </div>
                <div className={classes.infoDetailItemsDivisionn}>
                  <h3 className={classes.infoDetailItemsYearOfFoundationH3}>Team:</h3>
                  <p
                    className={classes.infoDetailItemsYearOfFoundationP}
                    style={{ fontWeight: 200 }}>
                    {hisTeam ? hisTeam.name : "-"}
                  </p>
                </div>
                <div className={classes.infoDetailItemsYearOfFoundation}>
                  <h3 className={classes.infoDetailItemsYearOfFoundationH3}>Height:</h3>
                  <p
                    className={classes.infoDetailItemsYearOfFoundationP}
                    style={{ fontWeight: 200 }}>
                    {items.height}
                  </p>
                </div>
                <div className={classes.infoDetailItemsYearOfFoundation}>
                  <h3 className={classes.infoDetailItemsYearOfFoundationH3}>Weight:</h3>
                  <p
                    className={classes.infoDetailItemsYearOfFoundationP}
                    style={{ fontWeight: 200 }}>
                    {items.weight}
                  </p>
                </div>
                <div className={classes.infoDetailItemsYearOfFoundation}>
                  <h3 className={classes.infoDetailItemsYearOfFoundationH3}>Age:</h3>
                  <p
                    className={classes.infoDetailItemsYearOfFoundationP}
                    style={{ fontWeight: 200 }}>
                    {birthdate ? +Math.floor((Number(cur) - Number(birthdate)) / 31536000000) : 0}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <div>No info</div>;
  }
};
