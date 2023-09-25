import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallfooditemsComponent } from './viewallfooditems.component';

describe('ViewallfooditemsComponent', () => {
  let component: ViewallfooditemsComponent;
  let fixture: ComponentFixture<ViewallfooditemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewallfooditemsComponent]
    });
    fixture = TestBed.createComponent(ViewallfooditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
