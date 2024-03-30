import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../user.model';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private _templateRef = inject(TemplateRef);
  private _viewContainerRef = inject(ViewContainerRef);
  private _isVisible = false;

  appHasRole = input<Role[]>([]);
  appHasRoleValidRoles = input<Role[]>([]);

  constructor() {
    effect(() => {
      if (
        this.appHasRole().some((role) =>
          this.appHasRoleValidRoles().includes(role),
        ) &&
        !this._isVisible
      ) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._isVisible = true;
      } else {
        this._viewContainerRef.clear();
        this._isVisible = false;
      }
    });
  }
}

@Directive({
  selector: '[appIsAdmin]',
  standalone: true,
})
export class isAdminDirective {
  private _templateRef = inject(TemplateRef);
  private _viewContainerRef = inject(ViewContainerRef);
  private _isVisible = false;

  appIsAdmin = input<boolean>(false);

  constructor() {
    effect(() => {
      if (this.appIsAdmin() && !this._isVisible) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._isVisible = true;
      } else {
        this._viewContainerRef.clear();
        this._isVisible = false;
      }
    });
  }
}
