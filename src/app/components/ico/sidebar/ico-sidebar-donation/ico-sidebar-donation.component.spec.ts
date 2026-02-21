import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoSidebarDonationComponent } from './ico-sidebar-donation.component';

describe('IcoSidebarDonationComponent', () => {
  let component: IcoSidebarDonationComponent;
  let fixture: ComponentFixture<IcoSidebarDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoSidebarDonationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoSidebarDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
