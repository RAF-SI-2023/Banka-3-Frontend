import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcBanka4Component } from './otc-banka4.component';

describe('OtcBanka4Component', () => {
  let component: OtcBanka4Component;
  let fixture: ComponentFixture<OtcBanka4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtcBanka4Component]
    });
    fixture = TestBed.createComponent(OtcBanka4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
