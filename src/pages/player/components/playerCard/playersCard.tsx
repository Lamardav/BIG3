import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FormInputs } from "../../../../api/dto/IGetPlayers";
import { PropsPagePlayers } from "../../../../api/dto/IGetTeams";
import classes from "./playerCard.module.css";

export const PlayerCard: React.FC<PropsPagePlayers> = ({
  filteredPlayer,
  pagesVisited,
  usersPerPage,
  teams,
}) => {
  let displayUsers: {} = [];
  const team = useMemo(() => ({ teams }.teams), [teams]);
  displayUsers = useMemo(
    () =>
      filteredPlayer.map((user: FormInputs, i: number) => {
        const teamPlayer = team.find((e: FormInputs) => {
          return e.id === user.team;
        });

        return (
          <Link className={classes.user} key={i} to={"/player/" + user.id}>
            <div className={classes.card}>
              <div className={classes.cardUpPlayers}>
                <img
                  className={classes.cardPlayerImg}
                  src={`http://dev.trainee.dex-it.ru${user.avatarUrl}`}
                  alt={user.name}
                />
              </div>
              <div className={classes.cardDown}>
                <div className={classes.teamName}>
                  {user.name}&nbsp;
                  <div className={classes.playerNumber}>#{user.number}</div>
                </div>
                <div className={classes.teamYear}>{teamPlayer ? teamPlayer.name : "-"}</div>
              </div>
            </div>
          </Link>
        );
      }),
    [filteredPlayer, team],
  );
  if (filteredPlayer && teams) {
  }

  return <div className={classes.wrapperUser}>{displayUsers}</div>;
};
