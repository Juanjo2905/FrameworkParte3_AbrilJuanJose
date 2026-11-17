
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Student } from '../../student.model';
import { StudentService } from '../../services/student.service';
import { StudentCard } from '../../components/student-card/student-card';

@Component({
  selector: 'app-student-list-page',
  imports: [StudentCard],
  templateUrl: './student-list-page.html',
  styleUrl: './student-list-page.css'
})
export class StudentListPage implements OnInit {
  private studentService = inject(StudentService);

  students = signal<Student[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  selectedStudent = signal<Student | null>(null);
  showOnlyFavorites = signal<boolean>(false);

  searchQuery = signal<string>('');
  favoriteIds = signal<number[]>([]);

  filteredStudents = computed(() => {
    const term = this.searchQuery().toLowerCase().trim();
    const onlyFavs = this.showOnlyFavorites();
    const favIds = this.favoriteIds();

    return this.students().filter(student =>{
      const matchesName = !term || student.name.toLowerCase().includes(term);
      const matchesFavorite = !onlyFavs || favIds.includes(student.id);
      return matchesName && matchesFavorite;
    });
  });

  toggleFavoritesFilter(): void {
    this.showOnlyFavorites.update(current => !current);
  }

  favoritesCount = computed(() => this.favoriteIds().length);

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.studentService.getStudents();
      this.students.set(data);
    } catch (error) {
      this.errorMessage.set('Ocurrió un error al cargar los estudiantes.');
    } finally {
      this.isLoading.set(false);
    }
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  handleStudentSelect(student: Student): void {
    this.selectedStudent.set(student);
  }

  handleToggleFavorite(student: Student): void {
    this.favoriteIds.update(ids =>
      ids.includes(student.id)
        ? ids.filter(id => id !== student.id)
        : [...ids, student.id]
    );
  }

  
}