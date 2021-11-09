import * as yup from "yup";

export const schemaSignUp = yup
.object()
.shape({
  login: yup.string().required("login is a required field").min(3),
  password: yup.string().required().min(4),
  passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  acceptTerms: yup.bool().oneOf([true], "Accept the agreement"),
})
.required();