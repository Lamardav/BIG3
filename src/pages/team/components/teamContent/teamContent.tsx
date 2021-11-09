import React, { useEffect, useState, useMemo, useCallback } from "react";
import { TeamsCard } from "../teamCard/teamsCard";
import { PagesSize } from "../../../../ui/pageSize/pagesSize";
import { Pagination } from "../../../../ui/pagination/pagination";
import { SearchPanel } from "../../../../ui/searchByName/searchPanel";
import { useAppSelector, useAppDispatch } from "../../../../core/redux/store";
import classes from "./teamContent.module.css";
import { fetchGetTeams } from "../../../../modules/team/getTeams/getTeamsThunk";
import { AddBtn } from "../../../../ui/addBtn/addBtn";
import { TeamContentEmptySvg } from "../../../../assets/icons/teamContentEmptySvg";
import { privatePath } from "../../../routes/path";
import { useHistory } from "react-router";
import { useQueryParams } from "../../../../api/hook/useQueryParams";

export const TeamContent: React.FC = () => {
  const query = useQueryParams();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const queryPage = useMemo(() => query.get("page"), [query]);
  const queryPageSize = useMemo(() => query.get("limit"), [query]);
  if (!queryPage || !queryPageSize) {
    history.push(`${privatePath.team.path}/?page=1&limit=8`);
  }
  const { loading } = useAppSelector((state) => state.team);
  const [users, setUsers] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(Number(queryPageSize));
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalTeams, setTotalteams] = useState<number>(0);
  const { filteredTeams } = useAppSelector((state) => state.filter);
  const onChange = useCallback(
    (number: number) => {
      setPageSize(number);
      setPageNumber(1);
      history.push(`${privatePath.team.path}/?page=1&limit=${number}`);
    },
    [history],
  );
  const usersPerPage = useMemo(() => Number(queryPageSize), [queryPageSize]);
  const pagesVisited = useMemo(() => Number(queryPage) * usersPerPage, [queryPage, usersPerPage]);
  const pageCount = useMemo(() => Math.ceil(totalTeams / usersPerPage), [totalTeams, usersPerPage]);
  const changePage = useCallback(
    (selected: any) => {
      setPageNumber(selected.selected);
      history.push(`${privatePath.team.path}/?page=${selected.selected + 1}&limit=${pageSize}`);
    },
    [history, pageSize],
  );
  useEffect(() => {
    const fetchParams = {
      page: Number(queryPage),
      pageLimit: Number(queryPageSize),
      teamNames: filteredTeams,
    };
    dispatch(fetchGetTeams(fetchParams)).then((res) => {
      setUsers(res.payload.data);
      setTotalteams(res.payload.count);
    });
  }, [dispatch, pageNumber, pageSize, filteredTeams, history, queryPageSize, queryPage]);

  return (
    <div className={classes.App}>
      <div className={classes.adminPanel}>
        <SearchPanel type="team" />
        <div className={classes.addTeamButton}>{<AddBtn link={privatePath.teamAdd.path} />}</div>
      </div>
      <div className={classes.contentPart}>
        {loading ? (
          "Loading"
        ) : (
          <>
            {" "}
            {users.length ? (
              <TeamsCard
                filteredTeam={users}
                pagesVisited={pagesVisited}
                usersPerPage={usersPerPage}
              />
            ) : (
              <div className={classes.emptyWhiteBox}>
                <TeamContentEmptySvg />
                <h2 className={classes.emptyWhiteBoxH2}>Empty here</h2>
                <p className={classes.emptyWhiteBoxP}>Add new teams to continue</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className={classes.footer}>
        {users.length ? (
          <Pagination pageCount={pageCount} changePage={changePage} type="team" />
        ) : (
          ""
        )}
        <PagesSize onChange={onChange} />
      </div>
    </div>
  );
};
