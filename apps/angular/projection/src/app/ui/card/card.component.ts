import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Store } from '../../data-access/store';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgTemplateOutlet, ListItemComponent],
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content selector=".image"></ng-content>

      <section>
        @for (item of list; track item.id) {
          <div>
            <slot
              [ngTemplateOutlet]="testTemplate"
              [ngTemplateOutletContext]="{ $implicit: item }"></slot>
            <button class="delete" (click)="delete(item.id)">
              <img class="h-5" src="assets/svg/trash.svg" />
            </button>
          </div>

          <!-- <app-list-item [name]="item.firstName || item.name || ''">
            <button class="delete" (click)="delete(item.id)">
              <img class="h-5" src="assets/svg/trash.svg" />
            </button>
          </app-list-item> -->
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CardComponent<
  T extends { id: number; firstName?: string; name?: string },
> {
  @Input({ required: true }) list!: T[];
  @Input({ required: true }) store!: Store<T>;
  @Input({ required: true }) randomItem!: () => T;
  @Input() customClass:
    | 'bg-light-red'
    | 'bg-light-green'
    | 'bg-light-blue'
    | '' = '';
  @ContentChild('testRef', { read: TemplateRef })
  testTemplate!: TemplateRef<{ $implicit: T }>;

  addNewItem() {
    this.store.addOne(this.randomItem());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
