import {cookToken} from './getTokenCook/getTokenCook'


type Method = "GET" | "POST" | "PUT" | "DELETE";
const Dex_Url = "http://dev.trainee.dex-it.ru/";
const loginHref = window.location.href.split("/").indexOf("login");
const signUpHref = window.location.href.split("/").indexOf("signup");


interface IBaseFetch {
    url: string;
    method: Method;
    headers?: HeadersInit;
    body?: BodyInit;
    
  }
export const baseFetch = async({
    url = "",
    method = "GET",
    headers = {},
    body,
  }: IBaseFetch) => {
    const queryUrl = new URL(Dex_Url + url);
    try{
   const response = await fetch(queryUrl.toString(), {
           headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " +cookToken,
        ...headers,
      },
      method,
      body,
    })
    if (response.ok) {
      return response.json()
    }
    console.log(response);
    
    if (!response.ok) {
      switch (response.status) {
        case 403:
          throw new Error('Error authorization');
        case 409:
          throw new Error('Conflict error');
        default:
          throw new Error('Error!');
      }
    }
    }
    catch(e:any){    
      console.log(e.message);
      
      if(e.message==='Failed to fetch'){
        setTimeout(() => {
          const deleteCookie=(name: string)=> {
            document.cookie = name + "=;  Expires=Thu, 01 Jan 1970 00:00:01 GMT;  path=/team;";
            document.cookie = name + "=;  Expires=Thu, 01 Jan 1970 00:00:01 GMT;  path=/player;";
            document.cookie = name + "=;  Expires=Thu, 01 Jan 1970 00:00:01 GMT;  path=/;";
          }
          deleteCookie("token");
          deleteCookie("name");
          if (loginHref<0&&signUpHref<0){
             window.location.assign("/login");
          }
          clearTimeout()
         }, 0);
      } 
    
    }
  };
  
