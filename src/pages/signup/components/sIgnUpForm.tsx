import { useRef, useState, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignUp } from "../../../api/vadidation/yupSignUpForm";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IFormImputsSignUp } from "../../../api/dto/ISignUp";
import { useAppSelector, useAppDispatch } from "../../../core/redux/store";
import { fetchSignUp } from "../../../modules/auth/authThunk";
import classes from "./signUpForm.module.css";
import { Link } from "react-router-dom";
import { LabelOnInputs } from "../../../ui/labelOnInputs/labelOnInputs";
import { EyeViewSignUp } from "../../../ui/eyeViewPassword/eyeView";
import { publicPath } from "../../routes/path";
import { ErrorValidation } from "../../../ui/error/errorValidation";
import { SubmitInput } from "../../../ui/submitButton/submitInput";
import { UIInput } from "../../../ui/input/Inputs";
import { Checkbox } from "../../../ui/checkbox/checkbox";
import { UIToastContainer } from "../../../ui/reactToastify/toastContainer";
import { ErrToast } from "../../../ui/reactToastify/errToast";

export const SIgnUpForm = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { loading } = useAppSelector((state) => state.authorization);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaSignUp) });
  const password = useRef({});
  password.current = watch("password", "");
  const formSubmitHandler = useCallback(
    (data: IFormImputsSignUp) => {
      dispatch(fetchSignUp(data)).then((res) => {
        if (res.payload) {
          history.push(publicPath.login.path);
        } else {
          ErrToast("Conflict error");
        }
      });
    },
    [dispatch, history],
  );

  const changeType = useCallback(() => {
    setVisibility(!visibility);
  }, [visibility]);

  return (
    <div className={classes.leftSideSignIn}>
      <h1 className={classes.TitelSignIn}>Sign Up</h1>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <LabelOnInputs name="Name" />
        <UIInput
          register={register}
          registerName="userName"
          errors={errors}
          type="text"
          df=""
          size="full"
        />
        {errors.userName && <ErrorValidation text={errors.userName.message} />}
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
            type="text"
            df=""
            size="full"
          />
          <EyeViewSignUp changeType={changeType} visibility={visibility} />
        </label>
        {errors.password && <ErrorValidation text={errors.password.message} />}
        <LabelOnInputs name="Enter your password again" />
        <label className={classes.password}>
          <input
            className={
              errors.password
                ? `${classes.errorClass} ${classes.inputAuth}`
                : `${classes.inputAuth}`
            }
            type={visibility === false ? "password" : "text"}
            id="passwords1"
            {...register("passwordConfirmation", {
              validate: (value) => value === password.current || "The passwords do not match",
            })}
          />
          <EyeViewSignUp changeType={changeType} visibility={visibility} />
        </label>
        <label className={classes.password}></label>
        {errors.passwordConfirmation && (
          <ErrorValidation text={errors.passwordConfirmation.message} />
        )}
        {loading ? "Loading" : null}
        <Checkbox text="I accept the agreement" register={register} registerName="acceptTerms" />
        {errors.acceptTerms && <ErrorValidation text={errors.acceptTerms.message} />}
        <UIToastContainer />

        <SubmitInput value="Sign Up" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span className={classes.spanLinkSignUp}>Already a member?&nbsp;</span>
          <Link to={publicPath.login.path}>
            <span className={classes.LinkSignUp}> Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
