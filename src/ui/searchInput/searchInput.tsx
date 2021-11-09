import { setFilteredTeams } from "../../modules/filters/filterSlice";
import { setFilteredPlayers } from "../../modules/filters/filterSlice";
import { useAppDispatch } from "../../core/redux/store";
import classes from "../../pages/player/components/playerContent/playerContent.module.css";

export const SearchInput: React.FC<{ type: string }> = ({ type }: { type: string }) => {
  const dispatch = useAppDispatch();
  return (
    <input
      className={classes.seachText}
      placeholder="Search..."
      type="text"
      onChange={(e) => {
        if (type === "team") {
          dispatch(setFilteredTeams(e.target.value));
        }
        if (type === "player") {
          dispatch(setFilteredPlayers(e.target.value));
        }
      }}
    />
  );
};
