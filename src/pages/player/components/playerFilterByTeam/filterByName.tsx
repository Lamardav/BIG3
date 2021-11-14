import { Component } from "react";
import Select, { components } from "react-select";
import { setFilteredCategortPlayers } from "../../../../modules/filters/filterSlice";
import { connect } from "react-redux";
import classes from "./filterByName.module.css";
import { IMapGetTeams } from "../../../../api/dto/IGetTeams";

class CustomSelect extends Component<any> {
  state: any = {
    values: [],
  };

  handleChange = (values: {}) => {
    this.setState({ values });

    this.props.dispatch(setFilteredCategortPlayers(values));
  };
  render() {
    const { values } = this.state;
    const selectedVals = values.map((x: { value: number; label: string }) => x.value);
    const hiddenOptions = selectedVals.length > 3 ? selectedVals.slice(0, 3) : [];
    const opt = this.props.teams.map((d: IMapGetTeams) => ({
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
          onChange={this.handleChange}
          value={values}
          components={{ MultiValue }}
          styles={customStyles}
        />
      </div>
    );
  }
}
export const Connection = connect()(CustomSelect);
connect()(CustomSelect);

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
