import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProspectPageComponent } from './new-prospect-page.component';

describe('NewProspectPageComponent', () => {
  let component: NewProspectPageComponent;
  let fixture: ComponentFixture<NewProspectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProspectPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProspectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
