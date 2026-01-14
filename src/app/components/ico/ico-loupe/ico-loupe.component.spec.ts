import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoLoupeComponent } from './ico-loupe.component';

describe('IcoLoupeComponent', () => {
  let component: IcoLoupeComponent;
  let fixture: ComponentFixture<IcoLoupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoLoupeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoLoupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
