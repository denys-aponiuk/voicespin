import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Observable } from 'rxjs';

import { PlanetsInterface } from './app.interface';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit {

  planets$: Observable<PlanetsInterface[]>;
  tableFields: string[] = ['name', 'terrain', 'population', 'residentsAmount', 'filmsAmount'];
  expandedElement: PlanetsInterface | null;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.planets$ = this.appService.getPlanetsOfStarWars()
  }

}
