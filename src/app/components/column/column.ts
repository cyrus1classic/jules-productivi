import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from '../../services/board';
import { Column as ColumnModel } from '../../models/column.model';
import { Ticket as TicketModel } from '../../models/ticket.model';
import { Ticket } from '../ticket/ticket';
import { TicketDialog } from '../ticket-dialog/ticket-dialog';
import { ColumnDialog } from '../column-dialog/column-dialog';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    Ticket,
  ],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {
  @Input({ required: true }) column!: ColumnModel;

  boardService = inject(BoardService);
  dialog = inject(MatDialog);

  drop(event: CdkDragDrop<TicketModel[]>) {
    this.boardService.moveTicket(event);
  }

  addTicket() {
    const dialogRef = this.dialog.open(TicketDialog, {
      width: '400px',
      data: { title: '', description: '', type: 'User Story', color: '#ffffff' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.addTicket(this.column.id, result);
      }
    });
  }

  editColumn() {
    const dialogRef = this.dialog.open(ColumnDialog, {
      width: '400px',
      data: { title: this.column.title, color: this.column.color },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.updateColumn(this.column.id, result.title, result.color);
      }
    });
  }

  deleteColumn() {
    this.boardService.deleteColumn(this.column.id);
  }
}
