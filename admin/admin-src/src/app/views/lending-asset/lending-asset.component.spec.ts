import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingAssetComponent } from './lending-asset.component';

describe('LendingAssetComponent', () => {
  let component: LendingAssetComponent;
  let fixture: ComponentFixture<LendingAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendingAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
