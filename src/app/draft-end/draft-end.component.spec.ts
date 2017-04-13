import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftEndComponent } from './draft-end.component';

describe('DraftEndComponent', () => {
  let component: DraftEndComponent;
  let fixture: ComponentFixture<DraftEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
