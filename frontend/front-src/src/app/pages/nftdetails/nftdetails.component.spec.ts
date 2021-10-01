import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NftdetailsComponent } from './nftdetails.component';

describe('NftdetailsComponent', () => {
  let component: NftdetailsComponent;
  let fixture: ComponentFixture<NftdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NftdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NftdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
