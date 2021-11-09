import React from "react";
import { Redirect, Route } from "react-router-dom";
import { PropsRoute } from "../../api/dto/IRoute";
import { publicPath } from "./path";
import { cookIndex } from "../../api/getTokenCook/getTokenKey";
import { TeamHeader } from "../../ui/header/header";
import { SideBar } from "../../ui/sidebar/sideBar";

export const PrivateRoute: React.FC<PropsRoute> = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <>
      <TeamHeader />
      <SideBar />
      <Route
        {...rest}
        render={(props) =>
          cookIndex >= 0 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: `${publicPath.login.path}`, state: { from: props.location } }}
            />
          )
        }
      />
    </>
  );
};
