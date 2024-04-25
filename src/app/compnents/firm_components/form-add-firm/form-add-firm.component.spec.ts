import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddFirmComponent } from './form-add-firm.component';

describe('FormAddFirmComponent', () => {
  let component: FormAddFirmComponent;
  let fixture: ComponentFixture<FormAddFirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddFirmComponent]
    });
    fixture = TestBed.createComponent(FormAddFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
