import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditListComponent } from './credit-list.component';

describe('CreditListComponent', () => {
  let component: CreditListComponent;
  let fixture: ComponentFixture<CreditListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditListComponent]
    });
    fixture = TestBed.createComponent(CreditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
