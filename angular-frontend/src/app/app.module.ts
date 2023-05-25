import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MemberTableComponent } from './components/members/member-table/member-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { RoutesComponent } from './components/routes/routes.component';
import { RouteComponent } from './components/routes/route/route.component';
import { AddRouteFormComponent } from './components/routes/route/add-route-form/add-route-form.component';
import { RouteDetailPageComponent } from './components/routes/route/route-detail-page/route-detail-page.component';
import { MemberDetailsComponent } from './components/members/member-table/member-details/member-details.component';
import { AddMemberFormComponent } from './components/members/member-table/add-member-form/add-member-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { RoutesEffects } from './store/effects/routes.effects';
import { reducers } from './store/rootReducer';
import { MembersEffects } from './store/effects/members.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    MemberTableComponent,
    RoutesComponent,
    RouteComponent,
    AddRouteFormComponent,
    RouteDetailPageComponent,
    MemberDetailsComponent,
    AddMemberFormComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers),
    /**
     * Folgendes würde man bei einem Reducer nehmen
     * StoreModule.forRoot({ members: membersReducer.reducer } as ActionReducerMap<any, any>),
     */
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
    EffectsModule.forRoot([RoutesEffects, MembersEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
