import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket } from './ticket';
import { BoardService } from '../../services/board';
import { MatDialog } from '@angular/material/dialog';
import { Ticket as TicketModel } from '../../models/ticket.model';

describe('Ticket', () => {
  let component: Ticket;
  let fixture: ComponentFixture<Ticket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ticket],
      providers: [
          { provide: BoardService, useValue: {} },
          { provide: MatDialog, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ticket);
    component = fixture.componentInstance;
    component.ticket = { id: '1', title: 'Test Ticket', description: 'Desc', type: 'Bug', color: '#000000' } as TicketModel;
    component.columnId = '1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
