import { useHistory } from "react-router";
import { useParams } from "react-router";
import { useAppDispatch } from "../../core/redux/store";
import { deleteTeam } from "../../modules/team/teamThunk";
import { privatePath } from "../../pages/routes/path";
import { UIToastContainer } from "../../ui/reactToastify/toastContainer";
import { ErrToast } from "../../ui/reactToastify/errToast";

export const DeleteTeamSvg = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();
  return (
    <>
      <svg
        onClick={() => {
          dispatch(deleteTeam(+id)).then((res: { meta: {}; payload: any; type: {} }) => {
            console.log(res);

            if (res.type === "deleteteam/DeleteTeam/rejected" || !res.payload) {
              ErrToast("Delete players of this team");
            } else {
              history.push(`${privatePath.team.path}/?page=1&limit=6`);
            }
          });
        }}
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5001 1H13.0001C13.5501 1 14.0001 1.45 14.0001 2C14.0001 2.55 13.5501 3 13.0001 3H1.00006C0.450061 3 6.10352e-05 2.55 6.10352e-05 2C6.10352e-05 1.45 0.450061 1 1.00006 1H3.50006L4.21006 0.29C4.39006 0.11 4.65006 0 4.91006 0H9.09006C9.35006 0 9.61006 0.11 9.79006 0.29L10.5001 1ZM2.99998 18C1.89998 18 0.99998 17.1 0.99998 16V6.00004C0.99998 4.90004 1.89998 4.00004 2.99998 4.00004H11C12.1 4.00004 13 4.90004 13 6.00004V16C13 17.1 12.1 18 11 18H2.99998Z"
          fill="#E4163A"
        />
      </svg>
      <UIToastContainer />
    </>
  );
};
