import { AuthorizationForm } from "./components/authorizationForm";
import classes from "./authorization.module.css";
import "../../ui/theme/color.css";
import { Layer } from "../../assets/icons/authorizationLayerSvg";
export const Authorization = () => {
  return (
    <div className={classes.signInWrapper}>
      <AuthorizationForm />
      <div className={classes.rightSideSignIn}>
        <Layer />
      </div>
    </div>
  );
};
