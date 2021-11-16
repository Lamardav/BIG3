import { useState, useMemo, useCallback, useEffect } from "react";
import classes from "./hamburger.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
import teamIco from "../../assets/icons/group_pers.png";
import personIco from "../../assets/icons/person.png";
import signOut from "../../assets/icons/input.png";
import Profile from "../../assets/images/Header/profile.png";
import { publicPath } from "../../pages/routes/path";
import { privatePath } from "../../pages/routes/path";
import { useLocation } from "react-router";

export const Hamburher = () => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const [active, setActive] = useState(window.location.href.split("/").indexOf("player"));
  const cookMas = useMemo(() => document.cookie.split(";").join("=").split("="), []);
  const cookMasTrim = useMemo(
    () =>
      cookMas.map((mas) => {
        return mas.trim();
      }),
    [cookMas],
  );
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
  const indexCook = useMemo(() => cookMasTrim.indexOf("name"), [cookMasTrim]);
  const nameUser = useMemo(() => cookMasTrim[indexCook + 1], [cookMasTrim, indexCook]);
  const handleMenuClick = useCallback(() => {
    setOpen(!open);
  }, [open]);
  useEffect(() => {
    setActive(window.location.href.split("/").indexOf("player"));
  }, [location]);
  return (
    <div className={classes.headerHamb}>
      <div
        className={classNames("ham", {
          change: open,
        })}
        onClick={handleMenuClick}>
        <span className={classes.bar1}></span>
        <span className={classes.bar2}></span>
        <span className={classes.bar3}></span>
      </div>

      <div className={classes.burgerMenu}>
        <div
          className={open ? `${classes.sidebarMenu} ${classes.swap}` : `${classes.sidebarMenu} `}>
          <div className={classes.hamburgerUserInfo}>
            <img className={classes.userImage} src={Profile} alt="profile" />
            <p className={classes.userHeader}>{nameUser}</p>
          </div>
          <Link to={`${privatePath.team.path}/?page=1&limit=6`}>
            <div className={classes.hambTeam}>
              <img
                className={active < 0 ? `${classes.red} ${classes.hambImg}` : `${classes.hambImg}`}
                src={teamIco}
                alt="teams"
              />
              <p className={active < 0 ? `${classes.red}` : ``}>Teams</p>
            </div>
          </Link>
          <Link to={`${privatePath.player.path}/?page=1&limit=6`}>
            <div
              className={
                active > 0 ? `${classes.hambPlayer} ${classes.red}` : `${classes.hambPlayer} `
              }>
              <img className={classes.hambImg} src={personIco} alt="person" />
              <p>Players</p>
            </div>
          </Link>

          <div className={classes.hambSignOut} onClick={signOutSide}>
            <img src={signOut} alt="person" />
            <p className={classes.signoutText}>Sign out</p>
          </div>
        </div>
      </div>
      <div className={open ? `${classes.black}` : ``}></div>
    </div>
  );
};
