import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowDetailComponent } from './escrow-detail.component';

describe('EscrowDetailComponent', () => {
  let component: EscrowDetailComponent;
  let fixture: ComponentFixture<EscrowDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscrowDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscrowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
