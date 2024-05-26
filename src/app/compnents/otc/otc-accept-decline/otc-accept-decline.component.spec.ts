import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcAcceptDeclineComponent } from './otc-accept-decline.component';

describe('OtcAcceptDeclineComponent', () => {
  let component: OtcAcceptDeclineComponent;
  let fixture: ComponentFixture<OtcAcceptDeclineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtcAcceptDeclineComponent]
    });
    fixture = TestBed.createComponent(OtcAcceptDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
