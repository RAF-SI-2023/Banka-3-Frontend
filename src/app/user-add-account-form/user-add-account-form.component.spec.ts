import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddAccountFormComponent } from './user-add-account-form.component';

describe('UserAddAccountFormComponent', () => {
  let component: UserAddAccountFormComponent;
  let fixture: ComponentFixture<UserAddAccountFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddAccountFormComponent]
    });
    fixture = TestBed.createComponent(UserAddAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
