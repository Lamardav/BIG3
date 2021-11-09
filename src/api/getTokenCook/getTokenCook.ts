export const cookToken=(document.cookie.split("=").join(";").split(";").map((e) => {
    return e.trim();
  })[document.cookie.split("=").join(";").split(";").map((e) => {
    return e.trim();
  }).indexOf("token")+1]).trim()