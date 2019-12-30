import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import { ApplicationState } from '@src/app/root-store/state';
import { RootActions } from '@src/app/root-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'honeydo-list-ui';

  constructor(private store$: Store<ApplicationState>) { }

  ngOnInit() {
    this.store$.dispatch(RootActions.AppStartupStartedAction());
  }
}
