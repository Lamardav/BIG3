import { useMemo, useState } from "react";
import Select, { components } from "react-select";
import classes from "./filterByName.module.css";
import { useQueryParams } from "../../../../api/hook/useQueryParams";
import { IMapGetTeams } from "../../../../api/dto/IGetTeams";
export const CustomSelect = (props: any) => {
  const query = useQueryParams();
  const queryTeamName = useMemo(() => query.get("teamids"), [query]) || "";
  const [values, setValues] = useState<any>([]);
  const handleChange = (values: {}) => {
    setValues(values);
    props.onChangeTeam(values);
  };

  const queryTeam = queryTeamName.split(",").map((el) => {
    if (props.teams.length && queryTeamName !== "" && el !== "") {
      return {
        value: +el,
        label: props.teams.filter((team: IMapGetTeams) => {
          return +team.id === +el;
        })[0].name,
      };
    } else {
      return null;
    }
  });

  const selectedVals = values.map((x: { value: number; label: string }) => x.value);
  const hiddenOptions = selectedVals.length > 3 ? selectedVals.slice(0, 3) : [];
  const opt = props.teams.map((d: IMapGetTeams) => ({
    value: d.id,
    label: d.name,
  }));
  const options = opt.filter(
    (x: { value: number; label: string }) => !hiddenOptions.includes(x.value),
  );
  const customStyles = {
    control: (base: {}) => ({
      ...base,
      height: 40,
      minHeight: 40,
    }),
  };

  return (
    <div className={classes.searchFilter}>
      <Select
        isMulti
        options={options}
        onChange={handleChange}
        value={queryTeam}
        components={{ MultiValue }}
        styles={customStyles}
      />
    </div>
  );
};

const MoreSelectedBadge = ({ items }: { items: any }) => {
  const style = {
    marginLeft: "auto",
    background: "#d4eefa",
    borderRadius: "4px",
    fontFamily: "Open Sans",
    fontSize: "11px",
    padding: "3px",
    order: 99,
  };

  const title = items.join(", ");
  const label = `...`;

  return (
    <div className={classes.secondSearch} style={style} title={title}>
      {label}
    </div>
  );
};

const MultiValue = (props: any) => {
  const { index, getValue } = props;
  const maxToShow: number = 1;
  const overflow: any = getValue()
    .slice(maxToShow)
    .map((x: any) => x.label);

  return index < maxToShow ? (
    <components.MultiValue className="chooseItem" {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
