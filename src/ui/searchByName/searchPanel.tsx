import { SearchInput } from "../searchInput/searchInput";
import classes from "./searchPanel.module.css";

export const SearchPanel = (props: { type: string }) => {
  return (
    <div id={"inputFilter"} className={classes.searchInput}>
      <label className={classes.search}>
        <SearchInput type={props.type} />
        <span className={classes.searchControl}></span>
      </label>
    </div>
  );
};
