import React, { useMemo } from "react";
import { PropsPage } from "../../../../api/dto/IGetTeams";
import { Link } from "react-router-dom";
import { PropsGetTeams } from "../../../../api/dto/IGetTeams";
import classes from "./teamCard.module.css";
export const TeamsCard: React.FC<PropsPage> = ({ filteredTeam, pagesVisited, usersPerPage }) => {
  const displayUsers = useMemo(
    () =>
      filteredTeam.map((user: PropsGetTeams, i: number) => {
        return (
          <Link key={i} className={classes.user} to={"/team/" + user.id}>
            <div className={classes.card}>
              <div className={classes.cardUp}>
                <img
                  className={classes.cardUpImg}
                  src={`http://dev.trainee.dex-it.ru${user.imageUrl}`}
                  alt={user.name}
                />
              </div>
              <div className={classes.cardDown}>
                <div className={classes.teamName}>{user.name}</div>
                <div className={classes.teamYear}>Year of foundation: {user.foundationYear}</div>
              </div>
            </div>
          </Link>
        );
      }),
    [filteredTeam],
  );

  return (
    <>
      <div className={classes.wrapperUser}>{displayUsers}</div>
    </>
  );
};
