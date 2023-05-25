import { RoutesState } from '../reducers/routes.reducer';
import { MembersState} from "../reducers/members.reducer";

export interface AppState {
  readonly routes: RoutesState;
  readonly members: MembersState
}
