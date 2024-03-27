import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { delay } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoApiRepoService {
  private http = inject(HttpClient);
  urlBase = 'https://jsonplaceholder.typicode.com/todos';

  getTodos() {
    return this.http.get<Todo[]>(this.urlBase).pipe(delay(1000));
  }

  update(todo: Pick<Todo, 'id'>) {
    return this.http.patch<Todo>(
      `${this.urlBase}/${todo.id}`,
      JSON.stringify({
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  delete(id: Todo['id']) {
    return this.http.delete<Todo>(`${this.urlBase}/${id}`);
  }
}
