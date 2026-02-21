import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoSidebarExamComponent } from './ico-sidebar-exam.component';

describe('IcoSidebarExamComponent', () => {
  let component: IcoSidebarExamComponent;
  let fixture: ComponentFixture<IcoSidebarExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoSidebarExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoSidebarExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
