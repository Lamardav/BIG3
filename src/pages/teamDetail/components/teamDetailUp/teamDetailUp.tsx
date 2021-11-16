import { DeleteTeams } from "../deleteTeams/deleteTeams";
import React, { useState, useEffect } from "react";
import { UpdateTeams } from "../updateTeams/updateTeams";
import { Link } from "react-router-dom";
import classes from "./teamDetailUp.module.css";
import { privatePath } from "../../../routes/path";
import { teamInfo } from "../../../../api/dto/IGetTeams";
import { useAppSelector } from "../../../../core/redux/store";

export const TeamDetailUp = (teamInfo: { teamInfo: teamInfo }) => {
  const [items, setItems] = useState(teamInfo.teamInfo);
  const { loading } = useAppSelector((state) => state.team);
  useEffect(() => {
    setItems(teamInfo.teamInfo);
  }, [teamInfo.teamInfo]);
  if (items) {
    return (
      <div className={classes.detailUp}>
        <div className={classes.detailUpPanel}>
          <div className={classes.navform}>
            <Link to={`${privatePath.team.path}/?page=1&limit=6`}>
              <p className={classes.navigationAdd}>Teams</p>
            </Link>
            <p className={classes.brownColor}>&nbsp;/&nbsp;</p>
            <p className={classes.navigationAdd}>{items.name}</p>
          </div>
          <div className={classes.detailIcons}>
            <UpdateTeams />
            <DeleteTeams />
          </div>
        </div>
        <div className={classes.detailUpInfo}>
          <div className={classes.photoDetail}>
            <img
              className={classes.photoDetailImg}
              alt={items.name}
              src={`http://dev.trainee.dex-it.ru${items.imageUrl}`}
            />
          </div>
          {loading ? (
            "Loading"
          ) : (
            <div className={classes.infoDetail}>
              <h1 className={classes.infoDetailH1}>{items.name}</h1>
              <div className={classes.infoDetailItems}>
                <div className={classes.infoDetailItemsYearOfFoundation}>
                  <h3 className={classes.infoDetailItemsYearOfFoundationH3}>Year of foundation</h3>
                  <p
                    className={classes.infoDetailItemsYearOfFoundationP}
                    style={{ fontWeight: 200 }}>
                    {items.foundationYear}
                  </p>
                </div>
                <div className={classes.infoDetailItemsDivisionn}>
                  <h3 className={classes.infoDetailItemsDivisionnH3}>Division</h3>
                  <p className={classes.infoDetailItemsDivisionnP} style={{ fontWeight: 200 }}>
                    {items.division}
                  </p>
                </div>
                <div className={classes.infoDetailItemsConference}>
                  {" "}
                  <h3 className={classes.infoDetailItemsConferenceH3}>Conference</h3>
                  <p className={classes.infoDetailItemsConferenceP} style={{ fontWeight: 200 }}>
                    {items.conference}
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
