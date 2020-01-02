import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as RootActions from '@src/app/root-store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'honeydo-list-ui';

  constructor(private store$: Store<{}>) { }

  ngOnInit() {
    this.store$.dispatch(RootActions.appStartupStartedAction());
  }
}
