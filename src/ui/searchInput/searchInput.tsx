import React, { useMemo, useCallback } from "react";
import classes from "../../pages/player/components/playerContent/playerContent.module.css";
import { useQueryParams } from "../../api/hook/useQueryParams";
import classNames from "./searchInput.module.css";

export interface IHandleChangeName {
  type: string;
  onChangeName: (value: string) => void;
}

export const SearchInput: React.FC<IHandleChangeName> = ({
  type,
  onChangeName,
}: {
  type: string;
  onChangeName: (value: string) => void;
}) => {
  const query = useQueryParams();
  const queryName = useMemo(() => query.get("name"), [query]) || "";
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeName(e.target.value);
    },
    [onChangeName],
  );
  return (
    <div id={"inputFilter"} className={classNames.searchInput}>
      <label className={classNames.search}>
        <input
          className={classes.seachText}
          placeholder="Search..."
          type="text"
          onChange={handleChange.bind(this)}
          defaultValue={queryName}
        />
        <span className={classNames.searchControl}></span>
      </label>
    </div>
  );
};
