import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairviewComponent } from './pairview.component';

describe('PairviewComponent', () => {
  let component: PairviewComponent;
  let fixture: ComponentFixture<PairviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
