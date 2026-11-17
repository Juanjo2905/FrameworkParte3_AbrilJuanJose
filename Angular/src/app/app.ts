import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentListPage } from './pages/student-list-page/student-list-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentListPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
