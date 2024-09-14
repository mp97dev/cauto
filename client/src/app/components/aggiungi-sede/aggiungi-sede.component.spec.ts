import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiSedeComponent } from './aggiungi-sede.component';

describe('AggiungiSedeComponent', () => {
  let component: AggiungiSedeComponent;
  let fixture: ComponentFixture<AggiungiSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiSedeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiungiSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
