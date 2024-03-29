import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { timer } from 'rxjs';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgIf],
  selector: 'app-root-old',
  template: `
    <ng-container *ngIf="persons.length > 0; else emptyList">
      <div *ngFor="let person of persons">
        {{ person.name }}
      </div>
    </ng-container>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOldComponent {
  persons: Person[] = [];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (persons().length) {
      @for (person of persons(); track person.name) {
        <p>{{ person.name }}</p>
      }
    } @else {
      <p>The list is empty !!</p>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  persons = signal<Person[]>([]);

  ngOnInit(): void {
    timer(2000).subscribe(() => {
      this.persons.update(() => [{ name: 'Pepe' }, { name: 'Ernestina' }]);
      console.log('timer', this.persons());
    });
  }
}
