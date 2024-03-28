import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

type Category = 'Youth' | 'Junior' | 'Open' | 'Senior';

@Component({
  selector: 'app-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe],
  template: `
    {{ fullName() | titlecase }} plays tennis in the {{ category() }} category!!
  `,
  host: {
    class: 'text-xl text-green-800',
  },
})
export class UserComponent {
  name = input.required<string>();
  lastName = input<string>();
  age = input(0, {
    transform: numberAttribute,
  });

  fullName = computed<string>(() => `${this.name()} ${this.lastName() ?? ''}`);
  category = computed<Category>(() => this.ageToCategory(this.age()));

  private ageToCategory = (age: number): Category => {
    if (age === 0) return 'Open';
    if (age < 10) return 'Youth';
    if (age < 18) return 'Junior';
    if (age < 35) return 'Open';
    return 'Senior';
  };
}
