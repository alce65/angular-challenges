import { HttpErrorResponse } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Todo } from '../model/todo';
import { TodoApiRepoService } from './todo.api.repo.service';

type TodoState = {
  todos: Todo[];
  error: HttpErrorResponse | null;
};

const initialState: TodoState = {
  todos: [],
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private repo = inject(TodoApiRepoService);
  private _state: WritableSignal<TodoState> = signal(initialState);

  get state() {
    return computed(() => this._state());
  }
  private handleErrors(error: HttpErrorResponse) {
    this._state.update(() => ({
      ...this._state(),
      error,
    }));
  }

  loadTodos() {
    this.repo.getTodos().subscribe({
      next: (todos) => {
        this._state.update(() => ({
          ...this._state(),
          todos: [...todos],
        }));
      },
      error: this.handleErrors.bind(this),
    });
  }

  updateTodo(todo: Pick<Todo, 'id'>) {
    this.repo.update(todo).subscribe({
      next: (todoUpdated) => {
        this._state.update(() => ({
          ...this._state(),
          todos: [
            ...this._state().todos.map((t) =>
              t.id === todoUpdated.id ? todoUpdated : t,
            ),
          ],
        }));
      },
      error: this.handleErrors.bind(this),
    });
  }

  deleteTodo(id: Todo['id']) {
    this.repo.delete(id).subscribe({
      next: () => {
        this._state.update(() => ({
          ...this._state(),
          todos: [...this._state().todos.filter((t) => t.id !== id)],
        }));
      },
      error: this.handleErrors.bind(this),
    });
  }
}
