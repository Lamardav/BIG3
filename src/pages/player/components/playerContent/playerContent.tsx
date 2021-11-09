import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../../core/redux/store";
import { SearchPanel } from "../../../../ui/searchByName/searchPanel";
import { Connection } from "../playerFilterByTeam/PlaterFilterByTeam";
import { Pagination } from "../../../../ui/pagination/pagination";
import { PagesSize } from "../../../../ui/pageSize/pagesSize";
import { PlayerCard } from "../playerCard/playersCard";
import classes from "./playerContent.module.css";
import { PlayerContentEmptySvg } from "../../../../assets/icons/playerEmptySvg";
import { fetchGetPlayer } from "../../../../modules/player/getPlayers/getPlayersThunk";
import { fetchGetTeams } from "../../../../modules/team/getTeams/getTeamsThunk";
import { AddBtn } from "../../../../ui/addBtn/addBtn";
import { privatePath } from "../../../routes/path";
import { useQueryParams } from "../../../../api/hook/useQueryParams";
import { useHistory } from "react-router";

export const PlayerContent: React.FC = () => {
  const query = useQueryParams();
  const history = useHistory();
  const queryPage = useMemo(() => query.get("page"), [query]);
  const queryPageSize = useMemo(() => query.get("limit"), [query]);
  const [players, setPlayers] = useState<[]>([]);
  const [pageSize, setPageSize] = useState<number>(Number(queryPageSize));
  const { loading } = useAppSelector((state) => state.players);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalTeams, setTotalteams] = useState<number>(0);
  if (!queryPage || !queryPageSize) {
    history.push(`${privatePath.player.path}/?page=1&limit=8`);
  }
  const dispatch = useAppDispatch();
  const [teams, setTeams] = useState<any>([]);
  let masOfCategories: string[] = [];
  const onChange = (number: number) => {
    setPageSize(number);
    setPageNumber(1);
    history.push(`${privatePath.player.path}/?page=1&limit=${number}`);
  };
  const { filteredPlayers } = useAppSelector((state) => state.filter);
  const { filteredCategoryPlayers } = useAppSelector((state) => state.filter);
  const usersPerPage = useMemo(() => Number(queryPageSize), [queryPageSize]);
  const pagesVisited = useMemo(() => Number(queryPage) * usersPerPage, [queryPage, usersPerPage]);
  const pageCount = useMemo(() => Math.ceil(totalTeams / usersPerPage), [totalTeams, usersPerPage]);
  const changePage = useCallback(
    (selected: any) => {
      setPageNumber(selected.selected);
      history.push(`${privatePath.player.path}/?page=${selected.selected + 1}&limit=${pageSize}`);
    },
    [history, pageSize],
  );
  useEffect(() => {
    for (let i = 0; i < filteredCategoryPlayers.length; i++) {
      masOfCategories.push(`TeamIds=${filteredCategoryPlayers[i].value}`);
    }
    const fetchParams = {
      page: Number(queryPage),
      pageLimit: Number(queryPageSize),
      playerName: filteredPlayers,
      categories: masOfCategories.join("&"),
    };
    dispatch(fetchGetPlayer(fetchParams)).then((value) => {
      setTotalteams(value.payload.count);
      setPlayers(value.payload.data);
    });
    dispatch(fetchGetTeams([])).then((res) => setTeams(res.payload.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCategoryPlayers, filteredPlayers, queryPage, queryPageSize]);

  return (
    <div className={classes.App}>
      <div className={classes.adminPanel}>
        <SearchPanel type="player" />

        {teams && <Connection teams={teams} />}
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
