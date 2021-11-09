import * as Yup from "yup";
export const schemaPlayers = Yup.object()
    .shape({
      name: Yup.string().required("Enter Name"),
      position: Yup.mixed().required("is required."),
      team: Yup.mixed().required("is required."),
      number: Yup.number().required("Enter number"),
      weight: Yup.number().required("Enter weight"),
      height: Yup.number().required("Enter height"),
      birthday: Yup.mixed().required("Enter height"),
    })
    .required();