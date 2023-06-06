import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemoOrderComponent } from './create-demo-order.component';

describe('CreateDemoOrderComponent', () => {
  let component: CreateDemoOrderComponent;
  let fixture: ComponentFixture<CreateDemoOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDemoOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDemoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
