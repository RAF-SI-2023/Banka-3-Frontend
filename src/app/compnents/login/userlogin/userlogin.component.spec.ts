import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginComponent } from './userlogin.component';

describe('UserloginComponent', () => {
  let component: UserloginComponent;
  let fixture: ComponentFixture<UserloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserloginComponent]
    });
    fixture = TestBed.createComponent(UserloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
