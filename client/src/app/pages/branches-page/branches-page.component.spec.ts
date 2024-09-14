import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesPageComponent } from './branches-page.component';

describe('BranchesPageComponent', () => {
  let component: BranchesPageComponent;
  let fixture: ComponentFixture<BranchesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
