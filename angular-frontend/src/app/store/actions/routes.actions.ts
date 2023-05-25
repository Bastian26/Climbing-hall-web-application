import { createAction, props } from '@ngrx/store';
import { Route } from '../../models/route';

// load routes
export const loadRoutes = createAction('[Routes] Load All Routes');

export const loadRoutesSuccess = createAction(
  '[Routes] Load All Routes Success',
  props<{ routes: Route[] }>()
);

export const loadRoutesFail = createAction(
  '[Routes] Load All Routes Fail',
  props<{ error: string }>()
);

// load specific route
export const loadRoute = createAction(
  '[Routes] Load Route',
  props<{ id: number }>()
);

// add route
export const addRoute = createAction(
  '[Routes] Add Route',
  props<{ route: Route }>()
);

export const addRouteSuccess = createAction(
  '[Routes] Add Route Success',
  props<{ route: Route }>()
);

export const addRouteFail = createAction(
  '[Routes] Add Route Fail',
  props<{ error: string }>()
);

export const removeRoute = createAction(
  '[Routes] Remove Route',
  props<{ id: number }>()
);

export const removeRouteSuccess = createAction(
  '[Routes] Remove Route Success {$id}',
  props<{ id: number }>()
);

export const removeRouteFail = createAction(
  '[Routes] Remove Route Fail',
  props<{ error: string }>()
);

export const changeLoadingProcess = createAction(
  '[Routes] Loading finished',
  props<{ isLoading: boolean }>()
);
