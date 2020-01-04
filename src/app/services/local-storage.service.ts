import { Injectable } from '@angular/core';
import {AllUiData} from './datatransfer';
import {Observable} from 'rxjs';
import * as fromMockData from './mock-data';


const MOCK_DATA: AllUiData = {
  currentUserId: 1234567890,
  currentListId: fromMockData.TODO_LIST_ID
};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  public loadAppStateFromLocal(): Observable<AllUiData> {
    return new Observable<AllUiData>(subscriber => {
      subscriber.next(MOCK_DATA);
    });
  }
}
