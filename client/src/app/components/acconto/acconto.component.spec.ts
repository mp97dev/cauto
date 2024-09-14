import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccontoComponent } from './acconto.component';

describe('AccontoComponent', () => {
  let component: AccontoComponent;
  let fixture: ComponentFixture<AccontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccontoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
