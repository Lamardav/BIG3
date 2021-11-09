import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./toastContainer.module.css";

export const UIToastContainer = () => {
  return (
    <ToastContainer
      className={classes.UIToastContainer}
      toastClassName={classes.UIToastContainerToast}
      bodyClassName={classes.UIToastContainerBody}
      closeButton={false}
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
