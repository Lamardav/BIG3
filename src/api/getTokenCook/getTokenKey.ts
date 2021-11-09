export const cookIndex=document.cookie
.split("=")
.join(";")
.split(";")
.map((e) => {
  return e.trim();
})
.indexOf("token");
