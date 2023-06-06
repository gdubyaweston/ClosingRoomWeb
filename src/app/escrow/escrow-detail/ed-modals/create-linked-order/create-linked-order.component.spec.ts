import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinkedOrderComponent } from './create-linked-order.component';

describe('CreateLinkedOrderComponent', () => {
  let component: CreateLinkedOrderComponent;
  let fixture: ComponentFixture<CreateLinkedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLinkedOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLinkedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
