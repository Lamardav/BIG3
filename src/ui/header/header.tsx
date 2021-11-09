import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Header/logo.png";
import Profile from "../../assets/images/Header/profile.png";
import { Hamburher } from "../hamburger/hamburher";
import classes from "./header.module.css";
import { privatePath } from "../../pages/routes/path";

export const TeamHeader = () => {
  const nameUser = useMemo(
    () =>
      document.cookie
        .split(";")
        .join("=")
        .split("=")
        .map((mas) => {
          return mas.trim();
        })[
        document.cookie
          .split(";")
          .join("=")
          .split("=")
          .map((mas) => {
            return mas.trim();
          })
          .indexOf("name") + 1
      ],
    [],
  );

  return (
    <div className={classes.header}>
      <Hamburher />
      <div className={classes.logo}>
        <Link to={`${privatePath.team.path}/?page=1&limit=8`}>
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className={classes.userInfo}>
        <p className={classes.userHeader}>{nameUser}</p>
        <img className={classes.userInfoImg} src={Profile} alt="profile" />
      </div>
    </div>
  );
};
