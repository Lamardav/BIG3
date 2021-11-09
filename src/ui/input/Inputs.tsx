import React, { useMemo } from "react";
import classes from "./inputs.module.css";

export interface IUIInput {
  registerName: string;
  errors: {};
  register: any;
  type: string;
  df: string;
  size: string;
}

export const UIInput: React.FC<IUIInput> = ({
  register,
  registerName,
  errors,
  type = "text",
  df,
  size,
}: IUIInput) => {
  let err = useMemo(() => false, []);
  for (const variable in errors) {
    if (registerName === variable) {
      err = true;
    }
  }
  if (size === "full") {
    return (
      <input
        type={type}
        defaultValue={df}
        className={err ? `${classes.errorClass} ${classes.inputAuth}` : ` ${classes.inputAuth}`}
        {...register(registerName)}
      />
    );
  } else {
    return (
      <input
        type={type}
        defaultValue={df}
        className={err ? `${classes.errorClass} ${classes.inputAdd}` : ` ${classes.inputAdd}`}
        {...register(registerName)}
      />
    );
  }
};
