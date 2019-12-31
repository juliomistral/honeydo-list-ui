import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Todolist} from '@src/app/model/todolist';
import {ModelUtils} from '@src/app/model/model-utils';


const MOCK_DATA: Todolist = {
  id: ModelUtils.generateRandomId(),
  name: 'Adulting',
  rootTaskId: 1234567890
};

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }

  public getTodoList(listId: number): Observable<Todolist> {
    return new Observable(subscriber => {
      subscriber.next(MOCK_DATA);
    });
  }
}
