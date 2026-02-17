import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Column } from './column';
import { BoardService } from '../../services/board';
import { MatDialog } from '@angular/material/dialog';
import { Column as ColumnModel } from '../../models/column.model';

describe('Column', () => {
  let component: Column;
  let fixture: ComponentFixture<Column>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Column],
      providers: [
          { provide: BoardService, useValue: {} },
          { provide: MatDialog, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Column);
    component = fixture.componentInstance;
    component.column = { id: '1', title: 'Test Column', color: '#000000', tickets: [] } as ColumnModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
