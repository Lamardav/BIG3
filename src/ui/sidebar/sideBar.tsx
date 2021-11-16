import personIco from "../../assets/icons/person.png";
import { useState, useCallback, useEffect } from "react";
import teamIco from "../../assets/icons/group_pers.png";
import signOut from "../../assets/icons/input.png";
import classes from "./sideBar.module.css";
import { privatePath } from "../../pages/routes/path";
import { publicPath } from "../../pages/routes/path";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export const SideBar = () => {
  const location = useLocation();
  const [active, setActive] = useState(window.location.href.split("/").indexOf("player"));
  const signOutSide = useCallback(() => {
    const deleteCookie = (name: string) => {
      document.cookie = name + "=;  Expires=Thu, 01 Jan 1970 00:00:01 GMT;  path=/team;";
      document.cookie = name + "=;  Expires=Thu, 01 Jan 1970 00:00:01 GMT;  path=/player;";
      document.cookie = name + "=;  Expires=Thu, 01 Jan 1970 00:00:01 GMT;  path=/;";
    };
    deleteCookie("token");
    deleteCookie("name");
    window.location.assign(publicPath.login.path);
  }, []);

  useEffect(() => {
    setActive(window.location.href.split("/").indexOf("player"));
  }, [location]);
  return (
    <div className={classes.sidebar}>
      <Link to={`${privatePath.team.path}/?page=1&limit=6`}>
        <div className={classes.teamSidebar}>
          <img
            className={
              active < 0
                ? `${classes.sidebarPersonSidebarTeamIco} ${classes.red}`
                : `${classes.sidebarPersonSidebarTeamIco} `
            }
            src={teamIco}
            alt="teams"
          />
          <p className={active < 0 ? `${classes.person} ${classes.red}` : `${classes.person} `}>
            Teams
          </p>
        </div>
      </Link>

      <Link to={`${privatePath.player.path}/?page=1&limit=6`}>
        <div
          className={
            active > 0 ? `${classes.personSidebar} ${classes.red}` : `${classes.personSidebar}`
          }>
          <img className={classes.sidebarTeamSidebarPersonIco} src={personIco} alt="person" />
          <p className={classes.person}>Players</p>
        </div>
      </Link>

      <div className={classes.logout} onClick={signOutSide}>
        <img src={signOut} alt="person" />
        <p className={classes.signoutText}>Sign out</p>
      </div>
    </div>
  );
};
