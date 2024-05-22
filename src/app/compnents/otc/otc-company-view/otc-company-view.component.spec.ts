import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcCompanyViewComponent } from './otc-company-view.component';

describe('OtcCompanyViewComponent', () => {
  let component: OtcCompanyViewComponent;
  let fixture: ComponentFixture<OtcCompanyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtcCompanyViewComponent]
    });
    fixture = TestBed.createComponent(OtcCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
