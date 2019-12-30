import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Todolist} from '@src/app/model/todolist';
import {ModelUtils} from '@src/app/model/model-utils';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }

  public getTodoList(listId: number): Observable<Todolist> {
    const list: Todolist = new Todolist(ModelUtils.generateRandomId(), 'Adulting', 1234567890);

    return new Observable(subscriber => {
      subscriber.next(list);
    });
  }
}
