import { DeletePlayerSvg } from "../../../../assets/icons/deletePlayerSvg";
import classes from "../playersDetailUp/playersDetailUp.module.css";

export const DeletePlayers = () => {
  return (
    <div className={classes.deletePlayersLink}>
      <DeletePlayerSvg />
    </div>
  );
};
