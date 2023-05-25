import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../../../../models/route';
import {
  changeLoadingProcess,
  loadRoute,
} from '../../../../store/actions/routes.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/model/app-state-model';
import { getRoute } from '../../../../store/selectors/routes.selectors';
// import {getAllRoutes, getRoute} from "../../../../store/selectors/routes.selectors";

@Component({
  selector: 'app-route-detail-page',
  templateUrl: './route-detail-page.component.html',
  styleUrls: ['./route-detail-page.component.scss'],
})
export class RouteDetailPageComponent implements OnInit {
  route?: Route;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getRoute(parseInt(params['id']), false);
    });
  }

  getRoute(id: number, isLoading: boolean) {
    // saves Route per id in store (logic happens in reducer)
    this.store.dispatch(loadRoute({ id }));
    // get current Route from store
    this.store.select(getRoute).subscribe((route) => {
      this.route = route;
    });
    this.store.dispatch(changeLoadingProcess({ isLoading }));
  }
}
