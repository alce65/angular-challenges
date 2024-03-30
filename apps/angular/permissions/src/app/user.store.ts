import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role, User } from './user.model';

export type Permission = 'ADMIN' | Role;

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();

  add(user: User) {
    this.user.next(user);
  }

  isAllowed(validPermissions: Permission[]) {
    const permissions = this.user.value?.isAdmin
      ? ['ADMIN']
      : this.user.value?.roles || [];
    return validPermissions.some((permission) =>
      permissions.includes(permission),
    );
  }
}
