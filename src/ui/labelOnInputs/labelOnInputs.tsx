import classes from "./labelOnInputs.module.css";
export const LabelOnInputs: React.FC<{ name: string }> = ({ name }: { name: string }) => {
  return <span className={classes.spanAuth}>{name}</span>;
};
