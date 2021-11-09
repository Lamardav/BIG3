import * as yup from "yup";

export const schemaSignIn = yup
.object()
.shape({
  login: yup.string().required("Login is a required field").min(3),
  password: yup.string().required("Password is a required field").min(4),
})
.required();