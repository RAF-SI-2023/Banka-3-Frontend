import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankomatViewCardComponent } from './bankomat-view-card.component';

describe('BankomatViewCardComponent', () => {
  let component: BankomatViewCardComponent;
  let fixture: ComponentFixture<BankomatViewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankomatViewCardComponent]
    });
    fixture = TestBed.createComponent(BankomatViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
