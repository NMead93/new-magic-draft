import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftingComponent } from './drafting.component';

describe('DraftingComponent', () => {
  let component: DraftingComponent;
  let fixture: ComponentFixture<DraftingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
