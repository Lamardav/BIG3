import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { UpdateTeamSvg } from "../../../../assets/icons/updateTeamsSvg";
import classes from "../teamDetailUp/teamDetailUp.module.css";

export function UpdateTeams() {
  const { id }: { id: string } = useParams();
  return (
    <Link className={classes.updateTeamSvg} to={`/team/update/${+id}`}>
      <div>
        <UpdateTeamSvg />
      </div>
    </Link>
  );
}
