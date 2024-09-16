import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScontoDialogComponent } from './update-sconto-dialog.component';

describe('UpdateScontoDialogComponent', () => {
  let component: UpdateScontoDialogComponent;
  let fixture: ComponentFixture<UpdateScontoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateScontoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateScontoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
