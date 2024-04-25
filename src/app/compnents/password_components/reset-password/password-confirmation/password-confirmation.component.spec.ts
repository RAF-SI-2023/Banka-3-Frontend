import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConfirmationComponent } from './password-confirmation.component';

describe('PasswordConfirmationComponent', () => {
  let component: PasswordConfirmationComponent;
  let fixture: ComponentFixture<PasswordConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordConfirmationComponent]
    });
    fixture = TestBed.createComponent(PasswordConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


