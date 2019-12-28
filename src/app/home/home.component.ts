import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import { ApplicationState } from '@src/app/root-store/state';
import { AppStartupStartedAction } from '@src/app/root-store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'honeydo-list-ui';

  constructor(private store$: Store<ApplicationState>) { }

  ngOnInit() {
    this.store$.dispatch(
      new AppStartupStartedAction()
    );
  }
}
