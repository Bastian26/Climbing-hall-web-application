import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of, switchMap, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as routeActions from '../actions/routes.actions';

import { RouteService } from '../../services/route.service';
import * as RoutesActions from '../actions/routes.actions';
import { Router } from '@angular/router';

/**
 * Effects offer a way to isolate and easily test side-effects within your application.
 */
@Injectable()
export class RoutesEffects {
  constructor(
    private actions$: Actions,
    private routeService: RouteService,
    private router: Router
  ) {}

  loadRoutes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.loadRoutes),
      switchMap(() =>
        this.routeService.getRoutes().pipe(
          map((routes) => routeActions.loadRoutesSuccess({ routes })),
          catchError((error) => of(RoutesActions.loadRoutesFail(error)))
        )
      )
    )
  );

  removeRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.removeRoute),
      switchMap((route) =>
        this.routeService.deleteRoute(route.id).pipe(map(() => route.id))
      ),
      map(
        (id) => routeActions.removeRouteSuccess({ id }),
        catchError((error) => of(RoutesActions.removeRouteFail(error)))
      )
    )
  );

  // Short version without id
  // removeRoute$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RoutesActions.removeRoute),
  //     switchMap((route) =>
  //       this.routeService.deleteRoute(route.id)),
  //     map(
  //       () => routeActions.removeRouteSuccess(),
  //       catchError((error) => of(RoutesActions.removeRouteFail(error)))
  //     )
  //   )
  // );

  addRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.addRoute),
      switchMap((data) => this.routeService.addRoute(data.route)),
      tap(() => this.router.navigate(['routes'])),
      map(
        (route) => routeActions.addRouteSuccess({ route }),
        catchError((error) => of(RoutesActions.addRouteFail(error)))
      )
    )
  );
}
