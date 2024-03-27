import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  template: `
    @if (store.state | async; as cities) {
      <app-card
        [list]="cities"
        [store]="store"
        [randomItem]="randomItem"
        customClass="bg-light-blue">
        <img [src]="image" width="200px" />
        <ng-template #testRef let-item>
          <app-list-item
            [name]="item.firstName || item.name || ''"></app-list-item>
        </ng-template>
      </app-card>
    }
  `,
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  private http = inject(FakeHttpService);
  protected store = inject(CityStore);
  randomItem = this.http.randomItem<City>('randomCity');
  image = 'assets/img/city.png';

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }
}
