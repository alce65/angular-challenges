import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  standalone: true,

  imports: [CardComponent, AsyncPipe],
  template: `
    @if (store.students$ | async; as students) {
      <app-card
        [list]="students"
        [store]="store"
        [randomItem]="randomItem"
        customClass="bg-light-green">
        <img [src]="image" width="200px" />
      </app-card>
    }
  `,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(StudentStore);
  randomItem = this.http.randomItem<Student>('randStudent');
  students: Student[] = [];
  image = 'assets/img/student.webp';

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
