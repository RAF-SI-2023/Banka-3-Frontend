import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordActivationComponent } from './password-activation.component';

describe('PasswordActivationComponent', () => {
  let component: PasswordActivationComponent;
  let fixture: ComponentFixture<PasswordActivationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordActivationComponent]
    });
    fixture = TestBed.createComponent(PasswordActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
