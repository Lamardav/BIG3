import classes from "../../pages/authorization/components/authorizationForm.module.css";

export interface IEyeView {
  changeType: (n: React.ChangeEvent<HTMLInputElement>) => void;
  visibility: boolean;
}

export const EyeView: React.FC<IEyeView> = ({ changeType, visibility }: IEyeView) => {
  return (
    <span
      onClick={(e: any) => {
        changeType(e);
      }}
      className={
        visibility === true
          ? `${classes.passwordControl} ${classes.view}`
          : `${classes.passwordControl} `
      }></span>
  );
};
export const EyeViewSignUp = ({ changeType, visibility }: IEyeView) => {
  return (
    <span
      onClick={(e: any) => {
        changeType(e);
      }}
      className={
        visibility === true
          ? `${classes.passwordControl} ${classes.view}`
          : `${classes.passwordControl} `
      }></span>
  );
};
