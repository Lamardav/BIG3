import classes from "../../pages/playerAdd/components/imputPlayersForm.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { InputPlayersFormSvg } from "../../assets/icons/InputPlayersFormSvg";
import { ErrorValidation } from "../error/errorValidation";

export const InputPhoto: React.FC<any> = ({
  register,
  setValue,
  setError,
  clearErrors,
  errors,
  name,
}: any) => {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  return (
    <div className={classes.leftAdd}>
      <label htmlFor="firstimg">
        <div className={classes.inputInside}>
          {preview ? <img className={classes.preview} src={preview} alt="preview" /> : ""}
          <input
            className={classes.inputInsideImg}
            id="firstimg"
            {...register(`${name}`, { required: true })}
            required
            onClick={() => {
              clearErrors([`${name}`]);
            }}
            onChange={(e: any) => {
              if (
                e.target.files[0] &&
                e.target.files[0].type !== "image/jpeg" &&
                e.target.files[0].type !== "image/png"
              ) {
                setError(`${name}`, { type: "manual", message: "Only jpeg/png allows" });
                setValue(`${name}`, null);
                setImage(null);
              } else if (
                e.target.files[0] &&
                (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png")
              ) {
                setImage(e.target.files[0]);
              } else {
                setImage(null);
              }
            }}
            type="file"
          />
          <InputPlayersFormSvg />
        </div>
        {errors.avatarUrl && <ErrorValidation text={errors.avatarUrl.message} />}
        {errors.imageUrl && <ErrorValidation text={errors.imageUrl.message} />}
      </label>
    </div>
  );
};
