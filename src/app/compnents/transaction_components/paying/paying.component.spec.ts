import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayingComponent } from './paying.component';

describe('PayingComponent', () => {
  let component: PayingComponent;
  let fixture: ComponentFixture<PayingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayingComponent]
    });
    fixture = TestBed.createComponent(PayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
