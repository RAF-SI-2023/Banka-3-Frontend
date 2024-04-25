import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmAddAccountFormComponent } from './firm-add-account-form.component';

describe('FirmAddAccountFormComponent', () => {
  let component: FirmAddAccountFormComponent;
  let fixture: ComponentFixture<FirmAddAccountFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmAddAccountFormComponent]
    });
    fixture = TestBed.createComponent(FirmAddAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
