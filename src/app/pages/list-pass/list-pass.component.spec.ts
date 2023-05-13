import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPassComponent } from './list-pass.component';

describe('ListPassComponent', () => {
  let component: ListPassComponent;
  let fixture: ComponentFixture<ListPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
