import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValutaUsatoComponent } from './valuta-usato.component';

describe('ValutaUsatoComponent', () => {
  let component: ValutaUsatoComponent;
  let fixture: ComponentFixture<ValutaUsatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValutaUsatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValutaUsatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
