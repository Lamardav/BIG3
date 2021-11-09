import { FormInputs } from "../../../../api/dto/IGetPlayers";
import React, { useState, useEffect } from "react";
import { PropsGetTeams } from "../../../../api/dto/IGetTeams";
import classes from "./teamsDetailDown.module.css";
import { FormInput } from "../../../../api/dto/IGetTeams";

export const TeamsDetailDown = ({
  teamInfoPlayers,
  teamInfo,
}: {
  teamInfoPlayers: [FormInput];
  teamInfo: PropsGetTeams;
}) => {
  const [items, setItems] = useState(teamInfoPlayers);
  const [cur, setCur] = useState(new Date());
  useEffect(() => {
    setCur(new Date());
    setItems(teamInfoPlayers);
  }, [teamInfoPlayers]);
  let curPlayers = [];
  if (items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].team === teamInfo.id) {
        curPlayers.push(items[i]);
      }
    }
  }
  if (curPlayers.length && curPlayers) {
    return (
      <div className={classes.TeamsDetailDown}>
        <div className={classes.TeamsDetailDownRoster}>
          <div>Roster</div>
        </div>
        <div className={classes.TeamsDetailDownHeader}>
          <div className={classes.TeamsDetailDownHeaderNumber}>#</div>
          <div className={classes.TeamsDetailDownHeaderPlayer}>Player</div>
          <div className={classes.TeamsDetailDownHeaderHeight}>Height</div>
          <div className={classes.TeamsDetailDownHeaderWeight}>Weight</div>
          <div className={classes.TeamsDetailDownHeaderAge}>Age</div>
        </div>
        {curPlayers &&
          curPlayers.map(function (item: FormInputs, i: any) {
            const birthdate: Date = new Date(item.birthday.substring(0, 10).split("-").join("/"));
            return (
              <div
                key={`${i}+${item.name}`}
                className={
                  (i = items.length
                    ? `${classes.TeamsDetailDownHeader}`
                    : `${classes.TeamsDetailDownHeaderLast} ${classes.TeamsDetailDownHeader}`)
                }>
                <div className={classes.TeamsDetailDownHeaderNumber}>{item.number}</div>
                <div className={classes.TeamsDetailDownHeaderPlayer}>
                  <img
                    className={classes.TeamsDetailDownHeaderPlayerImg}
                    src={`http://dev.trainee.dex-it.ru${item.avatarUrl}`}
                    alt={item.name}
                  />
                  <div className={classes.TeamsDetailDownHeaderPlayerName}>
                    <div className={classes.TeamsDetailDownHeaderPlayerTitel}>{item.name}</div>
                    <div className={classes.TeamsDetailDownHeaderPlayerPosition}>
                      {item.position}
                    </div>
                  </div>
                </div>
                <div className={classes.TeamsDetailDownHeaderHeight}>{item.height}</div>
                <div className={classes.TeamsDetailDownHeaderWeight}>{item.weight}</div>
                <div className={classes.TeamsDetailDownHeaderAge}>
                  {+Math.floor((Number(cur) - Number(birthdate)) / 31536000000)}
                </div>
              </div>
            );
          })}
      </div>
    );
  } else {
    return (
      <div className={classes.TeamsDetailDown}>
        <div className={classes.TeamsDetailDownRoster}>
          <div>Roster</div>
        </div>
        <div className={classes.TeamsDetailDownHeader}>
          <div className={classes.TeamsDetailDownHeaderNumber}>#</div>
          <div className={classes.TeamsDetailDownHeaderPlayer}>Player</div>
          <div className={classes.TeamsDetailDownHeaderHeight}>Height</div>
          <div className={classes.TeamsDetailDownHeaderWeight}>Weight</div>
          <div className={classes.TeamsDetailDownHeaderAge}>Age</div>
        </div>
        <div className={classes.TeamsDetailDownHeader}>
          <div className={classes.TeamsDetailDownHeaderNumber}>-</div>
          <div className={classes.TeamsDetailDownHeaderPlayer}>-</div>
          <div className={classes.TeamsDetailDownHeaderHeight}>-</div>
          <div className={classes.TeamsDetailDownHeaderWeight}>-</div>
          <div className={classes.TeamsDetailDownHeaderAge}>-</div>
        </div>
      </div>
    );
  }
};
