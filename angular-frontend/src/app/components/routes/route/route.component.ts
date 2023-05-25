import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '../../../models/route';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/model/app-state-model';
import { removeRoute } from '../../../store/actions/routes.actions';
import { updateMember } from '../../../store/actions/members.actions';
import { Member } from '../../../models/member';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
})
export class RouteComponent implements OnInit {
  @Input() route: Route | undefined;
  @Input() currentMember: Member | undefined;
  @Output() refreshParentRoutes = new EventEmitter<void>();
  containsFavorite: boolean = false;
  onDestroy$ = new Subject<void>();

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    // checks if current component is a favorite route and saves it as a boolean
    this.containsFavorite = !!this.currentMember?.favouriteRoutes?.filter(
      (fav) => fav.id === this.route?.id
    ).length;
  }

  deleteRoute(route: Route): void {
    const id: number = route.id !== undefined ? route.id : 0;
    this.store.dispatch(removeRoute({ id }));
    this.router
      .navigateByUrl('/members', { skipLocationChange: true })
      .then(() => this.router.navigate(['/routes']));
  }

  toggleFavoriteRoute() {
    if (!this.containsFavorite && this.route !== undefined) {
      this.currentMember?.favouriteRoutes?.push(this.route);
    } else if (this.containsFavorite && this.route !== undefined) {
      const indexOfFav = this.currentMember?.favouriteRoutes?.indexOf(
        this.route
      );
      if (indexOfFav) this.currentMember?.favouriteRoutes?.splice(indexOfFav);
    }

    const member = this.currentMember;
    if (member) {
      this.store.dispatch(updateMember({ member }));
    }
    this.refreshParentRoutes.next();
  }
}
