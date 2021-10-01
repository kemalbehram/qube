import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsviewComponent } from './accountsview.component';

describe('AccountsviewComponent', () => {
  let component: AccountsviewComponent;
  let fixture: ComponentFixture<AccountsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
