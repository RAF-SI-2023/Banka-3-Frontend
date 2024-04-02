import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditListUserComponent } from './credit-list-user.component';

describe('CreditListUserComponent', () => {
  let component: CreditListUserComponent;
  let fixture: ComponentFixture<CreditListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditListUserComponent]
    });
    fixture = TestBed.createComponent(CreditListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
