import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  template: `
    @if (store.teachers$ | async; as teachers) {
      <app-card
        [list]="teachers"
        [store]="store"
        [randomItem]="randomItem"
        customClass="bg-light-red">
        <img [src]="image" width="200px" />
      </app-card>
    }
  `,
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(TeacherStore);
  randomItem = this.http.randomItem<Teacher>('randTeacher');
  teachers: Teacher[] = [];
  image = 'assets/img/teacher.png';

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
