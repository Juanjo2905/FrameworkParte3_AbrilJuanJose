import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentCard } from './student-card';
import { Student } from '../../student.model';

describe('StudentCard', () => {
  let component: StudentCard;
  let fixture: ComponentFixture<StudentCard>;

  const mockStudent = {
    id: 1,
    name: 'Leanne Graham',
    email: 'sincere@april.biz',
    phone: '1-770-736-8031',
    address: { city: 'Gwenborough' },
    company: { name: 'Romaguera-Crona' }
  } as Student;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCard]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('student', mockStudent);
    fixture.detectChanges();
  });

  it('debe mostrar el nombre, correo y ciudad del estudiante y emitir el evento al hacer clic', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // 1. Verifica que los datos aparezcan en el HTML
    expect(compiled.textContent).toContain('Leanne Graham');
    expect(compiled.textContent).toContain('sincere@april.biz');
    expect(compiled.textContent).toContain('Gwenborough');

    // 2. Verifica que al hacer clic se emita el estudiante
    let emittedStudent: Student | undefined;
    component.selectStudent.subscribe((student) => {
      emittedStudent = student;
    });

    const cardElement = compiled.querySelector('.card') as HTMLElement;
    cardElement.click();

    expect(emittedStudent).toEqual(mockStudent);
  });
  
});
