import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentListPage } from './student-list-page';

describe('StudentListPage', () => {
  let component: StudentListPage;
  let fixture: ComponentFixture<StudentListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
