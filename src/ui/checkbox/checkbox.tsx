import React from "react";
import classes from "./checkbox.module.css";

export const Checkbox: React.FC<{ text: string; register: any; registerName: string }> = ({
  text,
  register,
  registerName,
}: {
  text: string;
  register: any;
  registerName: string;
}) => {
  return (
    <div className={classes.checkboxed}>
      <input type="checkbox" {...register(registerName)} id="unchecked_red" />
      <span className={classes.spanAuthLabel}>{text}</span>
    </div>
  );
};
