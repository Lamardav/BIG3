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
  { value: 8, label: 8 },
  { value: 16, label: 16 },
  { value: 24, label: 24 },
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
