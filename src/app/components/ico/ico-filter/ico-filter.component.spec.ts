import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoFilterComponent } from './ico-filter.component';

describe('IcoFilterComponent', () => {
  let component: IcoFilterComponent;
  let fixture: ComponentFixture<IcoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
