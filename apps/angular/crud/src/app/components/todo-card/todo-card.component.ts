import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (todo(); as todo) {
      {{ todo.title }}
      <div>
        <button (click)="update.emit(todo)">Update</button>
        <button (click)="delete.emit(todo.id)">Delete</button>
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border: 1px solid #ccc;
      margin: 0.2rem 0;
    }
  `,
})
export class TodoCardComponent {
  todo = input.required<Todo>();
  delete = output<Todo['id']>();
  update = output<Todo>();
}
