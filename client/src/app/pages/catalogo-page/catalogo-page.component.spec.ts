import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPageComponent } from './catalogo-page.component';

describe('CatalogoPageComponent', () => {
  let component: CatalogoPageComponent;
  let fixture: ComponentFixture<CatalogoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
