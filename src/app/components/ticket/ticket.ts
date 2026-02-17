import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from '../../services/board';
import { Ticket as TicketModel } from '../../models/ticket.model';
import { TicketDialog } from '../ticket-dialog/ticket-dialog';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: './ticket.html',
  styleUrl: './ticket.scss',
})
export class Ticket {
  @Input({ required: true }) ticket!: TicketModel;
  @Input({ required: true }) columnId!: string;

  boardService = inject(BoardService);
  dialog = inject(MatDialog);

  editTicket() {
    const dialogRef = this.dialog.open(TicketDialog, {
      width: '400px',
      data: {
        title: this.ticket.title,
        description: this.ticket.description,
        type: this.ticket.type,
        color: this.ticket.color,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.updateTicket(this.columnId, this.ticket.id, result);
      }
    });
  }

  deleteTicket() {
    this.boardService.deleteTicket(this.columnId, this.ticket.id);
  }
}
