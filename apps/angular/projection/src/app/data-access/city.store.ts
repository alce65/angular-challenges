import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class CityStore implements Store<City> {
  private cities$ = new BehaviorSubject<City[]>([]);
  get state() {
    return this.cities$.asObservable();
  }

  addAll(cities: City[]) {
    this.cities$.next(cities);
  }

  addOne(city: City) {
    this.cities$.next([...this.cities$.value, city]);
  }

  deleteOne(id: City['id']) {
    this.cities$.next(this.cities$.value.filter((s) => s.id !== id));
  }
}
