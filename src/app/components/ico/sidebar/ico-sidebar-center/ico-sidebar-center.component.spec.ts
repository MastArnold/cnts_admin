import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoSidebarCenterComponent } from './ico-sidebar-center.component';

describe('IcoSidebarCenterComponent', () => {
  let component: IcoSidebarCenterComponent;
  let fixture: ComponentFixture<IcoSidebarCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoSidebarCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoSidebarCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
