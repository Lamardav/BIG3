import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./pages/routes/privateRoute";
import { PrivateNotAuthRoute } from "./pages/routes/privateNotAuthRoute";
import { publicPath } from "./pages/routes/path";
import { privatePath } from "./pages/routes/path";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path={privatePath.team.path} component={privatePath.team.component} />
        <PrivateRoute
          exact
          path={privatePath.player.path}
          component={privatePath.player.component}
        />
        <PrivateRoute
          exact
          path={privatePath.teamAdd.path}
          component={privatePath.teamAdd.component}
        />
        <PrivateRoute
          exact
          path={privatePath.playerAdd.path}
          component={privatePath.playerAdd.component}
        />
        <PrivateRoute
          exact
          path={privatePath.teamUpdate.path}
          component={privatePath.teamUpdate.component}
        />
        <PrivateRoute
          exact
          path={privatePath.playerUpdate.path}
          component={privatePath.playerUpdate.component}
        />
        <PrivateRoute
          exact
          path={privatePath.teamDetail.path}
          component={privatePath.teamDetail.component}
        />
        <PrivateRoute
          exact
          path={privatePath.playerDetail.path}
          component={privatePath.playerDetail.component}
        />
        <PrivateNotAuthRoute
          exact
          path={publicPath.login.path}
          component={publicPath.login.component}
        />
        <PrivateNotAuthRoute
          exact
          path={publicPath.signUp.path}
          component={publicPath.signUp.component}
        />{" "}
        <Redirect to={publicPath.login.path} />
      </Switch>
    </BrowserRouter>
  );
};
