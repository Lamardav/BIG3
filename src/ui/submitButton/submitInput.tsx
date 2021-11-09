import classes from "./submitInput.module.css";

export const SubmitInput: React.FC<{ value: string }> = ({ value }: { value: string }) => {
  return <input className={classes.buttonAuth} type="submit" value={value} />;
};
