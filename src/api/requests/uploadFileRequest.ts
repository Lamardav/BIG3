import { cookToken } from "../getTokenCook/getTokenCook";
import axios from "axios";
  
export const uploadRequest=(fd:any)=>{
    const options: any = {
        method: "POST",
        url: "http://dev.trainee.dex-it.ru/api/Image/SaveImage",
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
          Authorization: "Bearer " + cookToken,
        },
        data: fd,
      };
      return axios(options)
    }