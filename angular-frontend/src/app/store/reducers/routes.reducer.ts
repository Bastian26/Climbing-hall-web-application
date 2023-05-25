import { Action, createReducer, on } from '@ngrx/store';
import * as RouteActions from '../actions/routes.actions';
import { Route } from '../../models/route';

export interface RoutesState {
  routes: Route[];
  route: Route | undefined;
  error: string;
  loading: boolean;
}

export const initialState: Readonly<RoutesState> = {
  routes: [],
  route: undefined,
  error: '',
  loading: false,
};

export const routesReducer = createReducer<RoutesState>(
  // get all routes
  initialState,
  on(RouteActions.loadRoutes, (state): RoutesState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(RouteActions.loadRoutesSuccess, (state, action): RoutesState => {
    return {
      ...state,
      routes: action.routes,
      loading: false,
    };
  }),
  on(RouteActions.loadRoutesFail, (state, action): RoutesState => {
    return {
      ...state,
      routes: [],
      loading: false,
      error: action.error,
    };
  }),
  // get specific route | save this rooute in store
  on(RouteActions.loadRoute, (state, { id }): RoutesState => {
    return {
      ...state,
      route: state.routes.find((x) => x.id === id),
      loading: false,
    };
  }),
  //add route
  on(RouteActions.addRoute, (state, { route }): RoutesState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(RouteActions.addRouteSuccess, (state, action): RoutesState => {
    return {
      ...state,
      routes: [...state.routes, action.route],
      loading: false,
    };
  }),
  on(RouteActions.addRouteFail, (state, action): RoutesState => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(RouteActions.addRoute, (state, { route }): RoutesState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(RouteActions.addRouteSuccess, (state, action): RoutesState => {
    return {
      ...state,
      routes: [...state.routes, action.route],
      loading: false,
    };
  }),
  on(RouteActions.addRouteFail, (state, action): RoutesState => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  // remove route
  on(RouteActions.removeRoute, (state, { id }): RoutesState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(RouteActions.removeRouteSuccess, (state, action): RoutesState => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(RouteActions.removeRouteFail, (state, action): RoutesState => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  // change loading process
  on(RouteActions.changeLoadingProcess, (state, { isLoading }): RoutesState => {
    return {
      ...state,
      loading: isLoading,
    };
  })
);

export function reducer(state: RoutesState | undefined, action: Action) {
  return routesReducer(state, action);
}
