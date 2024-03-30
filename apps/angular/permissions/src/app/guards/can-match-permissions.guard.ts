import { inject } from '@angular/core';
import { Permission, UserStore } from '../user.store';

export const canMatchPermissions = (
  permissions: Permission[],
  userService = inject(UserStore),
) => userService.isAllowed(permissions);
