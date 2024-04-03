import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingListComponent } from './listing-list.component';

describe('ListingListComponent', () => {
  let component: ListingListComponent;
  let fixture: ComponentFixture<ListingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListingListComponent]
    });
    fixture = TestBed.createComponent(ListingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
