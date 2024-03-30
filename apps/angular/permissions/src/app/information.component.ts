import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  HasRoleDirective,
  isAdminDirective,
} from './directives/has-role.directive';
import { UserStore } from './user.store';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, HasRoleDirective, isAdminDirective, AsyncPipe],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    @if (userStore.user$ | async; as user) {
      <div *appIsAdmin="user.isAdmin">visible only for super admin</div>
      <div *appHasRole="user.roles; validRoles: ['MANAGER']">
        visible if manager
      </div>

      <div *appHasRole="user.roles; validRoles: ['MANAGER', 'READER']">
        visible if manager and/or reader
      </div>
      <div *appHasRole="user.roles; validRoles: ['MANAGER', 'WRITER']">
        visible if manager and/or writer
      </div>
      <div *appHasRole="user.roles; validRoles: ['CLIENT']">
        visible if client
      </div>
      <div>visible for everyone</div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  user$ = this.userStore.user$;
  constructor(protected userStore: UserStore) {}
}
