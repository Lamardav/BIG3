export interface IGetTeamInits {
  loading: boolean;
  status: string | null;
  error: any;
  team: any;
  count: number;
}
export interface IGetTeams {
  Name?: string;
  Page?: number;
  PageSize?: number;
}
export interface ITeams {
  loading: boolean;
  infoTeam: [];
  team: any;
  count: number;
}
export interface IMapGetTeams {
  id: number;
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: File | string | null;
}
export interface PropsPageSize {
  onClick: (n: number) => void;
}

export interface PropsPage {
  filteredTeam: any;
  pagesVisited: number;
  usersPerPage: number;
}

export interface ReactPaginateProps {
  pageCount: number;

  pageRangeDisplayed: number;

  marginPagesDisplayed: number;

  previousLabel?: React.ReactNode | undefined;

  nextLabel?: React.ReactNode | undefined;

  breakLabel?: string | React.ReactNode | undefined;

  breakClassName?: string | undefined;

  breakLinkClassName?: string | undefined;

  onPageChange?(selectedItem: { selected: number }): void;
  ctive?(selectedItem: { selected: number }): void;

  initialPage?: number | undefined;

  forcePage?: number | undefined;

  disableInitialCallback?: boolean | undefined;

  containerClassName?: string | undefined;

  pageClassName?: string | undefined;

  pageLinkClassName?: string | undefined;

  pageLabelBuilder?: ((page: number) => string) | undefined;

  activeClassName?: string | undefined;

  activeLinkClassName?: string | undefined;

  previousClassName?: string | undefined;

  nextClassName?: string | undefined;

  previousLinkClassName?: string | undefined;

  nextLinkClassName?: string | undefined;

  disabledClassName?: string | undefined;

  hrefBuilder?(pageIndex: number): void;

  extraAriaContext?: string | undefined;

  ariaLabelBuilder?: ((pageIndex: number, selected: boolean) => string) | undefined;

  eventListener?: string | undefined;
}
/*  declare const ReactPaginate: React.ComponentClass<ReactPaginateProps>;
  export default ReactPaginate; */

export interface IFilteredTeams {
  filteredTeams: string;
}
export interface IChangePageSizeTeams {
  pageSize: number;
}

export interface IPaginationTeams {
  pageCount: number;
  changePage: (n: unknown) => void;
  type: string;
}
export interface IChangePageNumberTeams {
  pageNumber: number;
}
export interface teamInfo {
  name: string;
  id?: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: any;
}
export interface IFormImputsAddTeam {
  name?: string;
  foundationYear?: number;
  division?: string;
  conference?: string;
  imageUrl?: string | null;
  id?: number;
}
export interface PropsGetTeams {
  name: string;
  id?: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: any;
}
export interface FormInput {
  name?: string;
  number: number;
  position?: any;
  team?: any;
  avatarUrl?: any;
  id?: any;
  birthday: any;
  height: number;
  weight: number;
}
export type ITeamContent = {
  id: string;
};
export interface PropsPagePlayers {
  filteredPlayer: [];
  pagesVisited: number;
  usersPerPage: number;
  teams: [FormInput];
}

export interface IGeTeamById {
  loading: boolean;
  status: string | null;
  error: string | null | boolean | unknown;
  infoTeam: [];
}
