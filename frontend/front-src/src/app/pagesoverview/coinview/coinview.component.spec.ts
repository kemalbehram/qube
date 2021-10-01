import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinviewComponent } from './coinview.component';

describe('CoinviewComponent', () => {
  let component: CoinviewComponent;
  let fixture: ComponentFixture<CoinviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
