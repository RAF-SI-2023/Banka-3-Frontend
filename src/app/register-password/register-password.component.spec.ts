import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPasswordComponent } from './register-password.component';

describe('RegisterPasswordComponent', () => {
  let component: RegisterPasswordComponent;
  let fixture: ComponentFixture<RegisterPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPasswordComponent]
    });
    fixture = TestBed.createComponent(RegisterPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
