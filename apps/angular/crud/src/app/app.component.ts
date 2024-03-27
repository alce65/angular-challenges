import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { ErrorInfoComponent } from './components/error-info/error-info.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { Todo } from './model/todo';
import { TodoStateService } from './services/todo.state.service';

@Component({
  standalone: true,
  imports: [TodoCardComponent, ErrorInfoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
    <h1>CRUD</h1>
    @if (!state().error) {
      @for (todo of state().todos; track $index) {
        <app-todo-card
          [todo]="todo"
          (update)="onUpdate($event)"
          (delete)="onDelete($event)" />
      } @empty {
        <p>Loading...</p>
      }
    } @else {
      <app-error-info [error]="state().error!" />
    }
  `,
  styles: `
    :host {
      display: block;
      padding: 2rem;
    }
  `,
})
export class AppComponent implements OnInit {
  protected stateSrv = inject(TodoStateService);
  state = this.stateSrv.state;

  ngOnInit(): void {
    this.stateSrv.loadTodos();
  }

  onDelete(id: Todo['id']): void {
    this.stateSrv.deleteTodo(id);
  }

  onUpdate(todo: Todo): void {
    this.stateSrv.updateTodo(todo);
  }
}
