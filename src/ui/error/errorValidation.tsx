import classes from "./errorValidation.module.css";

export const ErrorValidation: React.FC<{ text: string | undefined }> = ({
  text,
}: {
  text: string | undefined;
}) => {
  return <div className={classes.error}>{text}</div>;
};
