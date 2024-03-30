import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.model';

@Pipe({
  standalone: true,
  name: 'showName',
})
export class ShowNamePipe implements PipeTransform {
  transform(value: User, index: number): string {
    return `${value.name} - ${index}`;
  }
}

@Pipe({
  standalone: true,
  name: 'isAllowed',
})
export class IsAllowedPipe implements PipeTransform {
  transform(value: User, isFirst: boolean): string {
    if (isFirst) {
      return 'always allowed';
    } else {
      return value.age > 25 ? 'allowed' : 'declined';
    }
  }
}

@Pipe({ standalone: true, name: 'applyFn' })
export class ApplyFnPipe<T> implements PipeTransform {
  transform(
    value: T,
    data: { [key: string]: unknown },
    fn: (value: T, data: { [key: string]: unknown }) => string,
  ): string {
    return fn(value, data);
  }
}
