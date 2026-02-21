import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoSidebarStaffComponent } from './ico-sidebar-staff.component';

describe('IcoSidebarStaffComponent', () => {
  let component: IcoSidebarStaffComponent;
  let fixture: ComponentFixture<IcoSidebarStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoSidebarStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoSidebarStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
