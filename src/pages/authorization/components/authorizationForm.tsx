import { useState, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignIn } from "../../../api/vadidation/yupSignInForn";
import { IFormImputs } from "../../../api/dto/IAuthorization";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../core/redux/store";
import { fetchLogin } from "../../../modules/auth/authorization/authorizationThunk";
import { Link } from "react-router-dom";
import classes from "./authorizationForm.module.css";
import { LabelOnInputs } from "../../../ui/labelOnInputs/labelOnInputs";
import { EyeView } from "../../../ui/eyeViewPassword/eyeView";
import { privatePath } from "../../routes/path";
import { publicPath } from "../../routes/path";
import { UIInput } from "../../../ui/input/Inputs";
import { SubmitInput } from "../../../ui/submitButton/submitInput";
import { ErrorValidation } from "../../../ui/error/errorValidation";
import { UIToastContainer } from "../../../ui/reactToastify/toastContainer";
import { ErrToast } from "../../../ui/reactToastify/errToast";

export const AuthorizationForm = () => {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormImputs>({ resolver: yupResolver(schemaSignIn) });

  const formSubmitHandler = useCallback(
    (data: IFormImputs) => {
      dispatch(fetchLogin(data)).then((res) => {
        if (res.type === "authorization/fetchLogin/fulfilled") {
          window.location.assign(`${privatePath.team.path}/?page=1&limit=8`);
        } else {
          ErrToast("User with the specified username / password was not found");
        }
      });
    },
    [dispatch],
  );
  const changeType = useCallback(() => {
    setVisibility(!visibility);
  }, [visibility]);
  return (
    <div className={classes.leftSideSignIn}>
      <h1 className={classes.TitelSignIn}>Sign In</h1>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <LabelOnInputs name="Login" />
        <UIInput
          register={register}
          registerName="login"
          errors={errors}
          type="text"
          df=""
          size="full"
        />
        {errors.login && <ErrorValidation text={errors.login.message} />}
        <LabelOnInputs name="Password" />
        <label className={classes.password}>
          <UIInput
            register={register}
            registerName="password"
            errors={errors}
            type={visibility === false ? "password" : "text"}
            df=""
            size="full"
          />
          <EyeView changeType={changeType} visibility={visibility} />
        </label>
        {errors.password && <ErrorValidation text={errors.password.message} />}
        <SubmitInput value="Sign In" />
        <UIToastContainer />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span className={classes.spanLinkSignUp}>Not a member yet?&nbsp;</span>
          <Link to={publicPath.signUp.path}>
            <span className={classes.LinkSignUp}> Sign up</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
