import * as Yup from "yup";

export const schemaTeam = Yup.object()
.shape({
  name: Yup.string().required("Enter Name"),
  division: Yup.string().required("is division."),
  conference: Yup.string().required("Enter conference"),
  foundationYear: Yup.number().required("Enter foundationYear"),
})
.required();