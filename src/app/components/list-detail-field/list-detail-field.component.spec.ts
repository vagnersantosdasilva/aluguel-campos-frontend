import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailFieldComponent } from './list-detail-field.component';

describe('ListDetailFieldComponent', () => {
  let component: ListDetailFieldComponent;
  let fixture: ComponentFixture<ListDetailFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDetailFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetailFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
