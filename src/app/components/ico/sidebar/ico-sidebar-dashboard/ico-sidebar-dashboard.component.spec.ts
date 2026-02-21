import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoSidebarDashboardComponent } from './ico-sidebar-dashboard.component';

describe('IcoSidebarDashboardComponent', () => {
  let component: IcoSidebarDashboardComponent;
  let fixture: ComponentFixture<IcoSidebarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoSidebarDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoSidebarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
