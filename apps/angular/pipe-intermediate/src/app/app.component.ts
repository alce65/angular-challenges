import { Component } from '@angular/core';
import { User } from './user.model';
import { ApplyFnPipe, IsAllowedPipe, ShowNamePipe } from './user.pipe';

@Component({
  standalone: true,
  imports: [ShowNamePipe, IsAllowedPipe, ApplyFnPipe],
  selector: 'app-root',
  template: `
    <h1>Angular Pipes</h1>
    <section>
      <h2>Sin usar Pipes</h2>
      <div>
        @for (
          person of persons;
          track index;
          let index = $index;
          let isFirst = $first
        ) {
          <p>
            {{ showName(person.name, index) }}
            {{ isAllowed(person.age, isFirst) }}
          </p>
        }
      </div>
    </section>
    <section>
      <h2>Usando Pipes</h2>
      <div>
        @for (
          person of persons;
          track index;
          let index = $index;
          let isFirst = $first
        ) {
          <p>
            {{ person | showName: index }}
            {{ person | isAllowed: isFirst }}
          </p>
        }
      </div>
    </section>
    <section>
      <h2>Usando un Pipe con una callback</h2>
      <div>
        @for (
          person of persons;
          track index;
          let index = $index;
          let isFirst = $first
        ) {
          <p>
            {{ person | applyFn: { index } : showNameFn }}
            {{ person | applyFn: { isFirst } : isAllowedFn }}
          </p>
        }
      </div>
    </section>
  `,
})
export class AppComponent {
  persons: User[] = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  showName(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }

  isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }

  showNameFn({ name }: { name: string }, { index }: { index: number }) {
    // very heavy computation
    return `${name} - ${index}`;
  }

  isAllowedFn({ age }: { age: number }, { isFirst }: { isFirst: boolean }) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}
