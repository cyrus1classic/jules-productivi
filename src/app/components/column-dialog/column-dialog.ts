import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface ColumnDialogData {
  title: string;
  color: string;
}

@Component({
  selector: 'app-column-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './column-dialog.html',
  styleUrl: './column-dialog.scss',
})
export class ColumnDialog {
  constructor(
    public dialogRef: MatDialogRef<ColumnDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
