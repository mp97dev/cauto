import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectPageComponent } from './prospect-page.component';

describe('ProspectPageComponent', () => {
  let component: ProspectPageComponent;
  let fixture: ComponentFixture<ProspectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProspectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
