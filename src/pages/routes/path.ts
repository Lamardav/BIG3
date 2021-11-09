import { Authorization } from "../authorization/authorization"
import { SignUp } from "../signup/signUp"
import { Team } from "../team/team"
import { TeamsAdd } from "../teamAdd/teamsAdd"
import { Player } from "../player/player"
import { PlayersAdd } from "../playerAdd/playersAdd"
import { TeamDetail } from "../teamDetail/teamDetail"
import { PlayerDetail } from "../playerDetail/playerDetail"

export const publicPath={
    login: {path:'/login',component:Authorization},
    signUp:{path:'/signup',component:SignUp}
}

export const privatePath={
    team:{path:'/team',component:Team},
    teamAdd:{path:'/team/add',component:TeamsAdd},
    player:{path:'/player',component:Player},
    playerAdd:{path:'/player/add',component:PlayersAdd},
    teamUpdate:{path:'/team/update/:id',component:TeamsAdd},
    playerUpdate:{path:'/player/update/:id',component:PlayersAdd},
    teamDetail:{path:'/team/:id',component:TeamDetail},
    playerDetail:{path:'/player/:id',component:PlayerDetail},
}