import { routesReducer } from './reducers/routes.reducer';
import { membersReducer } from './reducers/members.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './model/app-state-model';

export const reducers: ActionReducerMap<AppState> = {
  routes: routesReducer,
  members: membersReducer,
};
