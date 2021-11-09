import { toast } from "react-toastify";

export const ErrToast = (text: string) => {
  return toast(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });
};
