import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../../core/redux/store";
import { SearchInput } from "../../../../ui/searchInput/searchInput";
import { Pagination } from "../../../../ui/pagination/pagination";
import { PagesSize } from "../../../../ui/pageSize/pagesSize";
import { PlayerCard } from "../playerCard/playersCard";
import classes from "./playerContent.module.css";
import { CustomSelect } from "../playerFilterByTeam/filterByName";
import { PlayerContentEmptySvg } from "../../../../assets/icons/playerEmptySvg";
import { fetchGetPlayer } from "../../../../modules/player/playerThunk";
import { fetchGetTeams } from "../../../../modules/team/teamThunk";
import { AddBtn } from "../../../../ui/addBtn/addBtn";
import { privatePath } from "../../../routes/path";
import { useQueryParams } from "../../../../api/hook/useQueryParams";
import { useHistory } from "react-router";
import { setFilteredTeams } from "../../../../modules/filters/filterSlice";

export const PlayerContent: React.FC = () => {
  const query = useQueryParams();
  const history = useHistory();
  const queryPage = useMemo(() => query.get("page"), [query]);
  const queryPageSize = useMemo(() => query.get("limit"), [query]);
  const queryName = useMemo(() => query.get("name"), [query]) || "";
  const queryTeamName = useMemo(() => query.get("teamids"), [query]) || "";
  const { filteredTeams } = useAppSelector((state) => state.filter);
  const [name, setName] = useState<string>("");
  const [players, setPlayers] = useState<[]>([]);
  const [pageSize, setPageSize] = useState<number>(Number(queryPageSize || 6));
  const { loading } = useAppSelector((state) => state.players);

  const [totalTeams, setTotalteams] = useState<number>(0);
  if (!queryPage || !queryPageSize) {
    history.push(`${privatePath.player.path}/name=${name}&page=1&limit=${pageSize}`);
  }
  const dispatch = useAppDispatch();
  const [teams, setTeams] = useState<any>([]);
  let masOfCategories: string[];

  const onChange = useCallback(
    (number: number) => {
      setPageSize(number);

      history.push(
        `${privatePath.player.path}/?teamids=${filteredTeams}&name=${name}&page=1&limit=${number}`,
      );
    },
    [filteredTeams, history, name],
  );
  const usersPerPage = useMemo(() => Number(queryPageSize), [queryPageSize]);
  const pagesVisited = useMemo(() => Number(queryPage) * usersPerPage, [queryPage, usersPerPage]);
  const pageCount = useMemo(() => Math.ceil(totalTeams / usersPerPage), [totalTeams, usersPerPage]);
  const onChangeTeam = (mas: any) => {
    masOfCategories = [];
    mas.map((el: { value: string; label: string }) => masOfCategories.push(el.value));
    const masOfTeamQueries = masOfCategories.join(",");
    dispatch(setFilteredTeams(masOfTeamQueries));
    history.push(
      `${
        privatePath.player.path
      }/?teamids=${masOfTeamQueries}&name=${name}&page=${1}&limit=${pageSize}`,
    );
  };
  const changePage = useCallback(
    (selected: any) => {
      history.push(
        `${privatePath.player.path}?teamids=${filteredTeams}&name=${name}&page=${
          selected.selected + 1
        }&limit=${pageSize}`,
      );
    },
    [filteredTeams, history, name, pageSize],
  );
  const onChangeName = useCallback(
    (string: string) => {
      setName(string);
      history.push(
        `${privatePath.player.path}/?teamids=${filteredTeams}&name=${string}&page=1&limit=${pageSize}`,
      );
    },
    [filteredTeams, history, pageSize],
  );
  useEffect(() => {
    const fetchParams = {
      page: Number(queryPage),
      pageLimit: Number(queryPageSize),
      playerName: queryName,
      categories: queryTeamName.length
        ? queryTeamName
            .split(",")
            .map((el) => {
              return `TeamIds=${el}`;
            })
            .join("&")
        : "",
    };
    dispatch(fetchGetPlayer(fetchParams)).then((value) => {
      setTotalteams(value.payload.count);
      setPlayers(value.payload.data);
    });
    dispatch(fetchGetTeams({})).then((res) => setTeams(res.payload.data));
  }, [queryPage, queryPageSize, queryName, queryTeamName, dispatch]);

  return (
    <div className={classes.App}>
      <div className={classes.adminPanel}>
        <SearchInput type="player" onChangeName={onChangeName} />

        {teams && (
          <CustomSelect onChangeTeam={onChangeTeam} teams={teams} queryTeamName={queryTeamName} />
        )}
        <div className={classes.addTeamButton}>{<AddBtn link={privatePath.playerAdd.path} />}</div>
      </div>
      <div className={classes.contentPart}>
        {loading ? (
          "Loading"
        ) : (
          <>
            {" "}
            {players.length ? (
              <PlayerCard
                filteredPlayer={players}
                pagesVisited={pagesVisited}
                usersPerPage={usersPerPage}
                teams={teams}
              />
            ) : (
              <div className={classes.emptyWhiteBox}>
                <PlayerContentEmptySvg />
                <h2 className={classes.emptyWhiteBoxH2}>Empty here</h2>
                <p className={classes.emptyWhiteBoxP}>Add new players to continue</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className={classes.footer}>
        {players ? <Pagination pageCount={pageCount} changePage={changePage} type="player" /> : ""}
        <PagesSize onChange={onChange} />
      </div>
    </div>
  );
};
