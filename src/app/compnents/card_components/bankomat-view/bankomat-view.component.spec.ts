import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankomatViewComponent } from './bankomat-view.component';

describe('BankomatViewComponent', () => {
  let component: BankomatViewComponent;
  let fixture: ComponentFixture<BankomatViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankomatViewComponent]
    });
    fixture = TestBed.createComponent(BankomatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


