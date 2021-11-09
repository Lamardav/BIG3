
export interface IFilteredPlayers{
    filteredPlayers: string;
}
export interface IFilteredCategoryPlayers{
    filteredCategoryPlayers: any;
}


  export interface FormInputs {
    name?: string;
    number: number;
    position?: string;
    team?: number;
    avatarUrl?: any;
    id?: number;
    birthday: any;
    height: number;
    weight: number;
   
 
  };
  export interface IGetPlayersInits {
    loading: boolean;
    status: string | null; 
    error: any;
    players:  []
  }
  export interface IGetPos {
    loading: boolean;
    status: string | null; 
    error: string | null|boolean|unknown;
    positions:  []
  }
  export interface IGePlayerById {
    loading: boolean;
    status: string | null; 
    error: string | null|boolean|unknown;
    infoPlayer:  []
  }