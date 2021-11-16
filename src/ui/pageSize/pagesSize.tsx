import React, { useMemo, useCallback } from "react";
import Select from "react-select";
import classes from "./pageSizwe.module.css";
import { useQueryParams } from "../../api/hook/useQueryParams";

export interface IChangePageSize {
  onChange(number: number): void;
}
export interface IHandleChangeSize {
  handleChange(value: number, label: number): void;
}
const options = [
  { value: 6, label: 6 },
  { value: 12, label: 12 },
  { value: 18, label: 18 },
];

export const PagesSize: React.FC<IChangePageSize> = ({ onChange }) => {
  const query = useQueryParams();
  const queryPageSize = useMemo(() => query.get("limit"), [query]);
  const handleChange: any = useCallback(
    (e: { value: number; label: number }) => {
      onChange(e.value);
    },
    [onChange],
  );
  return (
    <div className={classes.changePAgeSize}>
      <Select
        className={classes.changerSize}
        placeholder={queryPageSize}
        menuPlacement="top"
        options={options}
        onChange={handleChange.bind(this)}
      />
    </div>
  );
};
