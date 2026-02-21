import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCardComponent } from './confirm-card.component';

describe('ConfirmCardComponent', () => {
  let component: ConfirmCardComponent;
  let fixture: ComponentFixture<ConfirmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
