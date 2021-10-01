import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingWithdrawComponent } from './lending-withdraw.component';

describe('LendingWithdrawComponent', () => {
  let component: LendingWithdrawComponent;
  let fixture: ComponentFixture<LendingWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendingWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
