import { SIgnUpForm } from "./components/sIgnUpForm";
import classes from "./signUp.module.css";
import { LayerSignUp } from "../../assets/icons/sIgnUpLayerSvg";

export const SignUp = () => {
  return (
    <div className={classes.signInWrapper}>
      <SIgnUpForm />
      <div className={classes.rightSideSignIn}>
        <LayerSignUp />
      </div>
    </div>
  );
};
