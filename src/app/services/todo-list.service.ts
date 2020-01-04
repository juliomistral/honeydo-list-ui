import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Todolist} from '@src/app/model/todolist';
import * as fromMockData from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }

  public getTodoList(listId: number): Observable<Todolist> {
    return new Observable(subscriber => {
      subscriber.next(fromMockData.MOCK_TODO_LIST);
    });
  }
}
