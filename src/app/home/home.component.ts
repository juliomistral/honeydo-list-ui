import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import { AppState } from '@src/app/root-store/state';
import * as RootActions from '@src/app/root-store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'honeydo-list-ui';

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.dispatch(RootActions.appStartupStartedAction());
  }
}
