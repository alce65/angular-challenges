import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  styles: `
    section {
      @apply flex flex-1 flex-col gap-5;
    }

    .list-item {
      @apply flex flex-row border-b px-5 pb-2;

      span {
        @apply flex-1;
      }
    }

    .info {
      transform: translateX(-2000px);
    }
  `,
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <section class="info" [@loadedInfo]="loadedIn">
        <div>
          <h3>2008</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h3>2010</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h4>2012</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>
      </section>

      <section class="data" [@loadedData]>
        @for (item of data; track $index) {
          <div class="list-item">
            <span>{{ item[0] }}:</span>
            <span>{{ item[1] }}</span>
          </div>
        }
      </section>
    </div>
  `,
  animations: [
    trigger('loadedInfo', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('* => in', animate('1s ease-in')),
    ]),
    trigger('loadedData', [
      transition(':enter', [
        query('.list-item', [
          style({ opacity: 0, transform: 'translateX(-30px)' }),
          stagger(100, [
            animate('1s ease-in'),
            style({ opacity: 1, transform: 'translateX(0)' }),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  loadedIn: string | undefined;
  data = Object.entries({
    name: 'Samuel',
    age: 28,
    birthDate: '02.11.1995',
    city: 'Berlin',
    language: 'English',
    likePizza: true,
  });

  ngOnInit(): void {
    timer(1).subscribe(() => {
      this.loadedIn = 'in';
    });
  }
}
