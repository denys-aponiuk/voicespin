import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PlanetsInterface } from './app.interface'

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {}

  getPlanetsOfStarWars(): Observable<PlanetsInterface[]> {
    return this.http.get<PlanetsInterface[]>(`${environment.serverUrl}/planets`);
  }
}
