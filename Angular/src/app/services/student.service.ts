import { Injectable } from '@angular/core';
import { Student } from '../student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  async getStudents(): Promise<Student[]> {
    const response = await fetch(this.apiUrl);

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data: Student[] = await response.json();
    return data;
  }
}