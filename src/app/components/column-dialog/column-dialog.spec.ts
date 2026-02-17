import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnDialog } from './column-dialog';

describe('ColumnDialog', () => {
  let component: ColumnDialog;
  let fixture: ComponentFixture<ColumnDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnDialog],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
