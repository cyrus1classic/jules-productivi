import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TicketType } from '../../models/ticket.model';

export interface TicketDialogData {
  title: string;
  description: string;
  type: TicketType;
  color: string;
}

@Component({
  selector: 'app-ticket-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './ticket-dialog.html',
  styleUrl: './ticket-dialog.scss',
})
export class TicketDialog {
  ticketTypes: TicketType[] = ['User Story', 'Bug', 'Change', 'Gap', 'Technical'];

  constructor(
    public dialogRef: MatDialogRef<TicketDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TicketDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
