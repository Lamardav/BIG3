import React, { useMemo, useState, useEffect, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaTeam } from "../../../api/vadidation/yupAddOrUpdateTeam";
import { useForm } from "react-hook-form";
import { updateTeam } from "../../../modules/team/updateTeam/updateTeamThunk";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../core/redux/store";
import { fetchNewTeam } from "../../../modules/team/addTeam/addTeamThunk";
import classes from "./inputTeamsForm.module.css";
import { ErrorValidation } from "../../../ui/error/errorValidation";
import { LabelOnInputs } from "../../../ui/labelOnInputs/labelOnInputs";
import { uploadRequest } from "../../../api/requests/uploadFileRequest";
import { IFormImputsAddTeam } from "../../../api/dto/IGetTeams";
import { InputPhoto } from "../../../ui/inputPhoto/inputPhoto";
import { useHistory } from "react-router";
import { privatePath } from "../../routes/path";
import { UIInput } from "../../../ui/input/Inputs";
import { ErrToast } from "../../../ui/reactToastify/errToast";
import { UIToastContainer } from "../../../ui/reactToastify/toastContainer";

export const InputTeamsForm = () => {
  const history = useHistory();
  const team = useAppSelector((state) => state.team);
  const [TeamsInformation, setTeamsInformation] = useState<any>(team.infoTeam);
  const update = useMemo(() => window.location.href.split("/").indexOf("update"), []);
  const { loading } = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();
  const { id }: { id: string } = useParams();
  const formSubmitHandler = useCallback(
    (data: any) => {
      const fd = new FormData();
      fd.append("file", data.imageUrl[0], data.imageUrl[0].name);
      uploadRequest(fd).then(async (response) => {
        data.imageUrl = response.data;
        if (id) {
          data = {
            ...data,
            id: +id,
          };
        } else {
        }
        if (id) {
          dispatch(updateTeam(data)).then((res) => {
            console.log(res);
            if (res.type === "updateteam/UpdateTeam/fulfilled" && res.payload) {
              history.push(`${privatePath.team.path}/${res.payload.id}`);
            } else {
              ErrToast("Conflict Error!");
            }
          });
        } else {
          dispatch(fetchNewTeam(data)).then((res) => {
            if (res.type === "addnewteam/fetchNewTeam/fulfilled" && res.payload) {
              history.push(`${privatePath.team.path}/${res.payload.id}`);
            } else {
              ErrToast("Conflict data!");
            }
          });
        }
      });
    },
    [dispatch, history, id],
  );

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormImputsAddTeam>({ resolver: yupResolver(schemaTeam) });
  useEffect(() => {
    setTeamsInformation(team.infoTeam);
  }, [team.infoTeam]);

  return (
    <div className={classes.App}>
      <div className={classes.formAdd}>
        <div className={classes.navform}>
          <Link to={`${privatePath.team.path}/?page=1&limit=8`}>
            <p className={classes.navigationAdd}>Teams</p>
          </Link>
          <p className={classes.brownColor}>&nbsp;/&nbsp;</p>
          <p className={classes.navigationAdd}>{update > 0 ? "Update team" : "Add new team"}</p>
        </div>
        <form className={classes.FormTeam} onSubmit={handleSubmit(formSubmitHandler)}>
          <InputPhoto
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            errors={errors}
            name="imageUrl"
          />
          <div className={classes.rightAdd}>
            <LabelOnInputs name="Name" />
            <UIInput
              register={register}
              registerName="name"
              errors={errors}
              type="text"
              df={id && TeamsInformation.name ? TeamsInformation.name : ""}
              size="full"
            />

            {errors.name && <ErrorValidation text={errors.name.message} />}
            <LabelOnInputs name="Division" />
            <UIInput
              register={register}
              registerName="division"
              errors={errors}
              type="text"
              df={id && TeamsInformation.division ? TeamsInformation.division : ""}
              size="full"
            />
            {errors.division && <ErrorValidation text={errors.division.message} />}
            <LabelOnInputs name="Conference" />
            <UIInput
              register={register}
              registerName="conference"
              errors={errors}
              type="text"
              df={id && TeamsInformation.conference ? TeamsInformation.conference : ""}
              size="full"
            />
            {errors.conference && <ErrorValidation text={errors.conference.message} />}
            <LabelOnInputs name="Foundation year" />
            <UIInput
              register={register}
              registerName="foundationYear"
              errors={errors}
              type="number"
              df={id && TeamsInformation.foundationYear ? TeamsInformation.foundationYear : ""}
              size="full"
            />
            {errors.foundationYear && <ErrorValidation text={errors.foundationYear.message} />}
            <UIToastContainer />
            {loading ? "Loading" : null}
            <div className={classes.buttonsAdd}>
              <Link to={`${privatePath.team.path}?page=1&limit=8`}>
                <input className={classes.AddClose} placeholder="Cancel" />
              </Link>
              <input className={classes.AddSave} type="submit" placeholder="Save" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
