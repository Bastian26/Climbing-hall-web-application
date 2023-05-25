import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route } from '../../models/route';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../store/model/app-state-model';
import { loadRoutes } from '../../store/actions/routes.actions';
import { getAllRoutes } from '../../store/selectors/routes.selectors';
import { getCurrentMember } from '../../store/selectors/members.selectors';
import { Member } from '../../models/member';
import { Actions, ofType } from '@ngrx/effects';
import * as RouteActions from '../../store/actions/routes.actions';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit, OnDestroy {
  routes$: Observable<Route[]> = this.store.select(getAllRoutes);
  currentMember: Member | undefined;
  onDestroy$ = new Subject<void>();

  constructor(private store: Store<AppState>, delete$: Actions) {
    // JSON.parse creates a copy of the original object - that avoids errors later
    this.store
      .select(getCurrentMember)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        (data) => (this.currentMember = JSON.parse(JSON.stringify(data)))
      );

    delete$
      .pipe(ofType(RouteActions.removeRouteSuccess), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.store.dispatch(loadRoutes());
      });
  }

  ngOnInit(): void {
    this.store.dispatch(loadRoutes());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  refreshRoutesComponent() {
    this.ngOnInit();
  }
}
