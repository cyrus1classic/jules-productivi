import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BoardService } from '../../services/board';
import { Column } from '../column/column';
import { ColumnDialog } from '../column-dialog/column-dialog';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    Column,
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  boardService = inject(BoardService);
  dialog = inject(MatDialog);

  columns = this.boardService.columns;

  addColumn() {
    const dialogRef = this.dialog.open(ColumnDialog, {
      width: '400px',
      data: { title: '', color: '#e0e0e0' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.addColumn(result.title, result.color);
      }
    });
  }
}
