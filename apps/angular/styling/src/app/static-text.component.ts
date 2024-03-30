/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: `
    text {
      --text-font-size: 10px;
      --text-color: black;
    }
    :host-context([type='error']) {
      text {
        --text-font-size: 30px;
        --text-color: red;
      }
    }
    :host-context([type='warning']) {
      text {
        --text-font-size: 25px;
        --text-color: orange;
      }
    }
  `,
})
export class TextStaticComponent {
  // @Input() set type(type: StaticTextType) {
  //   switch (type) {
  //     case 'error': {
  //       this.font = 30;
  //       this.color = 'red';
  //       break;
  //     }
  //     case 'warning': {
  //       this.font = 25;
  //       this.color = 'orange';
  //       break;
  //     }
  //   }
  // }
  // font = 10;
  // color = 'black';
}
