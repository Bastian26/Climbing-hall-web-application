import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutesState } from '../reducers/routes.reducer';

export const getAllUserState = createFeatureSelector<RoutesState>('routes');

export const getAllRoutes = createSelector(
  getAllUserState,
  (state: RoutesState) => state.routes
);

export const getRoute = createSelector(getAllUserState, (state) => state.route);
