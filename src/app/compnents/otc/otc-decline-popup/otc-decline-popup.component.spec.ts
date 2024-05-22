import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcDeclinePopupComponent } from './otc-decline-popup.component';

describe('OtcDeclinePopupComponent', () => {
  let component: OtcDeclinePopupComponent;
  let fixture: ComponentFixture<OtcDeclinePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtcDeclinePopupComponent]
    });
    fixture = TestBed.createComponent(OtcDeclinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
