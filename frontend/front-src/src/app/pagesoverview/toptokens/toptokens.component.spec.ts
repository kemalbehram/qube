import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptokensComponent } from './toptokens.component';

describe('ToptokensComponent', () => {
  let component: ToptokensComponent;
  let fixture: ComponentFixture<ToptokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToptokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToptokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
