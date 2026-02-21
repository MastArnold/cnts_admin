import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoSidebarSettingComponent } from './ico-sidebar-setting.component';

describe('IcoSidebarSettingComponent', () => {
  let component: IcoSidebarSettingComponent;
  let fixture: ComponentFixture<IcoSidebarSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcoSidebarSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcoSidebarSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
