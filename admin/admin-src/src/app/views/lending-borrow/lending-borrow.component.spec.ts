import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingBorrowComponent } from './lending-borrow.component';

describe('LendingBorrowComponent', () => {
  let component: LendingBorrowComponent;
  let fixture: ComponentFixture<LendingBorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendingBorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
