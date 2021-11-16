import { useState, useEffect, useMemo, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPlayers } from "../../../api/vadidation/yupAddOrUpdatePlayer";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { fetchNewPlayer } from "../../../modules/player/playerThunk";
import { useAppDispatch, useAppSelector } from "../../../core/redux/store";
import { updatePlayer } from "../../../modules/player/playerThunk";
import { fetchGetTeams } from "../../../modules/team/teamThunk";
import { fetchGetPos } from "../../../modules/player/playerThunk";
import classes from "./imputPlayersForm.module.css";
import { LabelOnInputs } from "../../../ui/labelOnInputs/labelOnInputs";
import { ErrorValidation } from "../../../ui/error/errorValidation";
import { FormInput } from "../../../api/dto/IGetTeams";
import { privatePath } from "../../routes/path";
import { uploadRequest } from "../../../api/requests/uploadFileRequest";
import { InputPhoto } from "../../../ui/inputPhoto/inputPhoto";
import { useHistory } from "react-router";
import { FormInputs } from "../../../api/dto/IGetPlayers";
import { IMapGetTeams } from "../../../api/dto/IGetTeams";
import { UIInput } from "../../../ui/input/Inputs";
import { ErrToast } from "../../../ui/reactToastify/errToast";
import { UIToastContainer } from "../../../ui/reactToastify/toastContainer";

export const InputPlayersForm = () => {
  const history = useHistory();
  const player = useAppSelector((state) => state.players);
  const PlayersInformation: any = useMemo(() => player.infoPlayer, [player.infoPlayer]);
  const dispatch = useAppDispatch();
  const update = useMemo(() => window.location.href.split("/").indexOf("update"), []);
  const { loading } = useAppSelector((state) => state.players);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schemaPlayers) });
  const [positions, setPosition] = useState<string[]>([]);
  const [teamInfo, setTeamsInfo] = useState<any[]>([]);
  const { id }: { id: string } = useParams();
  const colourStyles = {
    control: (base: {}) => ({
      ...base,
      boxShadow: "none",
    }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#C60E2E" : null,
        color: isFocused ? "#ffffff" : null,
      };
    },
  };

  const formSubmitHandler = useCallback(
    (data: FormInput) => {
      data.birthday = data.birthday.toISOString();
      data.team = data.team.value;
      data.position = data.position.value;
      data.number = +data.number;
      data.weight = +data.weight;
      data.height = +data.height;
      const fd = new FormData();
      fd.append("file", data.avatarUrl[0], data.avatarUrl[0].name);
      uploadRequest(fd).then(
        async (response) => {
          data.avatarUrl = response.data;
          if (id) {
            data = {
              ...data,
              id: +id,
            };
          } else {
          }

          if (id) {
            dispatch(updatePlayer(data)).then((res) => {
              console.log(res);

              if (res.type === "updateplayer/UpdatePlayer/fulfilled" && res.payload) {
                history.push(`${privatePath.player.path}/${res.payload.id}`);
              } else {
                ErrToast("Conflict data!");
              }
            });
          } else {
            dispatch(fetchNewPlayer(data)).then((res) => {
              if (res.type === "addnewplayer/fetchNewPlayer/fulfilled" && res.payload) {
                history.push(`${privatePath.player.path}/${res.payload.id}`);
              } else {
                ErrToast("Conflict data!");
              }
            });
          }
        },
        (error) => {
          console.log("ошибка отправления информации");
        },
      );
    },
    [dispatch, history, id],
  );

  useEffect(() => {
    dispatch(fetchGetPos()).then((value: { meta: {}; payload: any; type: {} }) => {
      const technologyList: any = [];
      value.payload.forEach(function (element: {}) {
        technologyList.push({ label: element, value: element });
      });
      setPosition(technologyList);
    });

    dispatch(fetchGetTeams({})).then((value: any) => {
      const opt = value.payload.data.map((d: IMapGetTeams) => ({
        value: d.id,
        label: d.name,
      }));
      setTeamsInfo(opt);
    });
  }, [dispatch]);

  return (
    <div className={classes.App}>
      <div className={classes.formAdd}>
        <div className={classes.navform}>
          <Link to={`${privatePath.player.path}/?page=1&limit=6`}>
            <p className={classes.navigationAdd}>Players</p>
          </Link>
          <p className={classes.browncolor}>&nbsp;/&nbsp;</p>
          <p className={classes.navigationAdd}>{update > 0 ? "Update player" : "Add new player"}</p>
        </div>
        <form className={classes.FormTeam} onSubmit={handleSubmit(formSubmitHandler)}>
          <InputPhoto
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            errors={errors}
            name="avatarUrl"
          />
          <div className={classes.rightAdd}>
            <LabelOnInputs name="Name" />
            <UIInput
              register={register}
              registerName="name"
              errors={errors}
              type="text"
              df={id && PlayersInformation.name ? PlayersInformation.name : ""}
              size="full"
            />

            <LabelOnInputs name="Position" />
            <Controller
              name="position"
              control={control}
              rules={{ required: "Please select an option" }}
              render={({ field }) => (
                <Select styles={colourStyles} {...field} options={positions} />
              )}
            />
            <LabelOnInputs name="Team" />
            <Controller
              name="team"
              control={control}
              render={({ field }) => <Select styles={colourStyles} {...field} options={teamInfo} />}
            />
            {errors.team && <ErrorValidation text={errors.team.message} />}
            <div className={classes.smallInputs}>
              <div className={`${classes.inputs} ${classes.mrg}`}>
                <LabelOnInputs name="Height" />
                <UIInput
                  register={register}
                  registerName="height"
                  errors={errors}
                  type="number"
                  df={id && PlayersInformation.height ? PlayersInformation.height : ""}
                  size="half"
                />
              </div>
              <div className={classes.inputs}>
                <LabelOnInputs name="Weight" />
                <UIInput
                  register={register}
                  registerName="weight"
                  errors={errors}
                  type="number"
                  df={id && PlayersInformation.weight ? PlayersInformation.weight : ""}
                  size="half"
                />
              </div>
              <div className={`${classes.inputs} ${classes.mrg}`}>
                <LabelOnInputs name="Birthday" />
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      placeholderText="Select date"
                      className={
                        errors.name
                          ? `${classes.errorClass} ${classes.inputAdd} `
                          : `${classes.inputAdd}`
                      }
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
              </div>
              <div className={classes.inputs}>
                <LabelOnInputs name="Number" />
                <UIInput
                  register={register}
                  registerName="number"
                  errors={errors}
                  type="number"
                  df={id && PlayersInformation.weight ? PlayersInformation.weight : ""}
                  size="half"
                />
              </div>
              <div id="buttonsAdd" className={classes.buttonsAdd}>
                <Link
                  to={
                    id
                      ? `${privatePath.player.path}/${id}`
                      : `${privatePath.player.path}/?page=1&limit=6`
                  }>
                  <input id="closeAdd" className={classes.AddClose} placeholder="Cancel" />
                </Link>
                <input id="saveAdd" className={classes.AddSave} type="submit" placeholder="Save" />
              </div>
            </div>
            <UIToastContainer />
            {loading ? "Loading" : null}
            {errors.number && <ErrorValidation text={errors.number.message} />}
            {errors.weight && <ErrorValidation text={errors.weight.message} />}
            {errors.height && <ErrorValidation text={errors.height.message} />}
            {errors.birthday && <ErrorValidation text={errors.birthday.message} />}
          </div>
        </form>
      </div>
    </div>
  );
};
