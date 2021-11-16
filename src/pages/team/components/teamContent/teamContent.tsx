import React, { useEffect, useState, useMemo, useCallback } from "react";
import { TeamsCard } from "../teamCard/teamsCard";
import { PagesSize } from "../../../../ui/pageSize/pagesSize";
import { Pagination } from "../../../../ui/pagination/pagination";
import { SearchInput } from "../../../../ui/searchInput/searchInput";
import { useAppSelector, useAppDispatch } from "../../../../core/redux/store";
import classes from "./teamContent.module.css";
import { fetchGetTeams } from "../../../../modules/team/teamThunk";
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
  const [pageSize, setPageSize] = useState<number>(Number(queryPageSize || 6));
  const queryName = useMemo(() => query.get("name"), [query]) || "";
  const [name, setName] = useState<string>("");
  if (!queryPage || !queryPageSize) {
    history.push(`${privatePath.team.path}/?name=${name}&page=1&limit=${pageSize}`);
  }
  const { loading } = useAppSelector((state) => state.team);
  const [users, setUsers] = useState<any>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalTeams, setTotalteams] = useState<number>(0);
  const { filteredTeams } = useAppSelector((state) => state.filter);
  const onChange = useCallback(
    (number: number) => {
      setPageSize(number);
      setPageNumber(1);
      history.push(`${privatePath.team.path}/?name=${name}&page=1&limit=${number}`);
    },
    [history, name],
  );
  const onChangeName = useCallback(
    (string: string) => {
      setName(string);
      history.push(`${privatePath.team.path}/?name=${string}&?page=1&limit=${pageSize}`);
    },
    [history, pageSize],
  );
  const usersPerPage = useMemo(() => Number(queryPageSize), [queryPageSize]);
  const pagesVisited = useMemo(() => Number(queryPage) * usersPerPage, [queryPage, usersPerPage]);
  const pageCount = useMemo(() => Math.ceil(totalTeams / usersPerPage), [totalTeams, usersPerPage]);
  const changePage = useCallback(
    (selected: any) => {
      setPageNumber(selected.selected);
      history.push(
        `${privatePath.team.path}/?name=${name}&page=${selected.selected + 1}&limit=${pageSize}`,
      );
    },
    [history, name, pageSize],
  );
  useEffect(() => {
    const fetchParams = {
      page: Number(queryPage),
      pageLimit: Number(queryPageSize),
      teamNames: queryName,
    };
    dispatch(fetchGetTeams(fetchParams)).then((res) => {
      setUsers(res.payload.data);
      setTotalteams(res.payload.count);
    });
  }, [dispatch, pageNumber, pageSize, filteredTeams, history, queryPageSize, queryPage, queryName]);

  return (
    <div className={classes.App}>
      <div className={classes.adminPanel}>
        <SearchInput type="team" onChangeName={onChangeName} />
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
