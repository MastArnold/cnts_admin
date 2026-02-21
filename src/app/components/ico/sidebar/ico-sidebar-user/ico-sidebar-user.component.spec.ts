import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoSidebarUserComponent } from './ico-sidebar-user.component';

describe('IcoSidebarUserComponent', () => {
  let component: IcoSidebarUserComponent;
  let fixture: ComponentFixture<IcoSidebarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoSidebarUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoSidebarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
