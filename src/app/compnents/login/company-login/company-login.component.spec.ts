import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLoginComponent } from './company-login.component';

describe('CompanyLoginComponent', () => {
  let component: CompanyLoginComponent;
  let fixture: ComponentFixture<CompanyLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyLoginComponent]
    });
    fixture = TestBed.createComponent(CompanyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
