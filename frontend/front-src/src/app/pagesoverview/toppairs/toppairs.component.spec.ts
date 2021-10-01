import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppairsComponent } from './toppairs.component';

describe('ToppairsComponent', () => {
  let component: ToppairsComponent;
  let fixture: ComponentFixture<ToppairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToppairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
