import React from "react";
import { Redirect, Route } from "react-router-dom";
import { PropsRoute } from "../../api/dto/IRoute";
import { privatePath } from "./path";
import { cookIndex } from "../../api/getTokenCook/getTokenKey";

export const PrivateNotAuthRoute: React.FC<PropsRoute> = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) =>
        cookIndex < 0 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: `${privatePath.team.path}`, state: { from: props.location } }}
          />
        )
      }
    />
  );
};
