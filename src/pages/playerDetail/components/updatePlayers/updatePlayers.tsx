import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { UpdatePlayerSvg } from "../../../../assets/icons/updatePlayerSvg";
import classes from "../playersDetailUp/playersDetailUp.module.css";

export const UpdatePlayers = () => {
  const { id }: { id: string } = useParams();
  return (
    <Link className={classes.updatePlayersIcon} to={`/player/update/${+id}`}>
      <UpdatePlayerSvg />
    </Link>
  );
};
