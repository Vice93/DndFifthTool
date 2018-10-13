import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSharedComponent } from './info-shared.component';

describe('InfoSharedComponent', () => {
  let component: InfoSharedComponent;
  let fixture: ComponentFixture<InfoSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
