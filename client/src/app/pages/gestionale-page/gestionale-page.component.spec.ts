import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionalePageComponent } from './gestionale-page.component';

describe('GestionalePageComponent', () => {
  let component: GestionalePageComponent;
  let fixture: ComponentFixture<GestionalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionalePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
