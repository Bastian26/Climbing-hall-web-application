import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberTableComponent } from './components/members/member-table/member-table.component';
import { RoutesComponent } from './components/routes/routes.component';
import { RouteComponent } from './components/routes/route/route.component';
import { RouteDetailPageComponent } from './components/routes/route/route-detail-page/route-detail-page.component';
import { AddRouteFormComponent } from './components/routes/route/add-route-form/add-route-form.component';
import { MemberDetailsComponent } from './components/members/member-table/member-details/member-details.component';
import { AddMemberFormComponent } from './components/members/member-table/add-member-form/add-member-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'members',
    pathMatch: 'full',
  },
  {
    path: 'members',
    component: MemberTableComponent,
  },
  {
    path: 'member/:id',
    component: MemberDetailsComponent,
  },
  {
    path: 'addMemberForm',
    component: AddMemberFormComponent,
  },
  {
    path: 'routes',
    component: RoutesComponent,
  },
  {
    path: 'route',
    component: RouteComponent,
  },
  {
    path: 'routeDetails/:id',
    component: RouteDetailPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'routesAddForm',
    component: AddRouteFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
