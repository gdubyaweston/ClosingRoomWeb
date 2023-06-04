import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowNewComponent } from './escrow-new.component';

describe('EscrowNewComponent', () => {
  let component: EscrowNewComponent;
  let fixture: ComponentFixture<EscrowNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscrowNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscrowNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
