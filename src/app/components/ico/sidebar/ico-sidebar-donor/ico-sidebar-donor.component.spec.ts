import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoSidebarDonorComponent } from './ico-sidebar-donor.component';

describe('IcoSidebarDonorComponent', () => {
  let component: IcoSidebarDonorComponent;
  let fixture: ComponentFixture<IcoSidebarDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoSidebarDonorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoSidebarDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
