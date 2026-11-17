import { Component, input, output } from '@angular/core';
import { Student } from '../../student.model';

@Component({
  selector: 'app-student-card',
  imports: [],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css'
})
export class StudentCard {
  student = input.required<Student>();
  isFavorite = input<boolean>(false);

  selectStudent = output<Student>();
  toggleFavorite = output<Student>();

  onSelect(): void {
    this.selectStudent.emit(this.student());
  }

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.student());
  }

}
