import { Link } from "react-router-dom";
import plus from "../../assets/images/Team/content/iconmonstr-plus-2.png";
import classes from "./addBtn.module.css";

export const AddBtn: React.FC<{ link: string }> = ({ link }: { link: string }) => {
  return (
    <Link to={link}>
      <button className={classes.addBtnUI}>
        Add <img className={classes.plus} src={plus} alt="add" />
      </button>
    </Link>
  );
};
