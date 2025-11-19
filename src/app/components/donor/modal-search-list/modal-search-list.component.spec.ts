import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchListComponent } from './modal-search-list.component';

describe('ModalSearchListComponent', () => {
  let component: ModalSearchListComponent;
  let fixture: ComponentFixture<ModalSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSearchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
