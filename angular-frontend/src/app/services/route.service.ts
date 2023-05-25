import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Route } from '../models/route';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {}

  public getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(`${this.apiServerUrl}/climbingRoutes`);
  }

  public getRouteById(routeId: number): Observable<Route> {
    return this.http.get<Route>(
      `${this.apiServerUrl}/climbingRoute/${routeId}`
    );
  }

  public addRoute(route: Route): Observable<Route> {
    return this.http.post<Route>(
      `${this.apiServerUrl}/climbingRoute`,
      route
    );
  }

  /*public updateRoute(routeId: number): Observable<void> {
      return this.http.put<void>(`${this.apiServerUrl}/climbingRoute/${routeId}`);
    }*/

  public deleteRoute(routeId: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/climbingRoute/${routeId}`
    );
  }
}
