import { AuthState } from "./auth/auth.reducers";
import { HeroState } from "./hero/hero.reducers";

export interface AppState { 
    Heroes : HeroState,
    User : AuthState
}