import { Injectable, signal, WritableSignal } from '@angular/core';
import { Column } from '../models/column.model';
import { Ticket, TicketType } from '../models/ticket.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  columns: WritableSignal<Column[]> = signal<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      color: '#e0e0e0',
      tickets: [
        {
          id: '1',
          title: 'Welcome to Jules Productivi',
          description: 'This is a sample ticket.',
          type: 'User Story',
          color: '#ffffff',
        },
      ],
    },
    {
      id: 'doing',
      title: 'In Progress',
      color: '#bbdefb',
      tickets: [],
    },
    {
      id: 'done',
      title: 'Done',
      color: '#c8e6c9',
      tickets: [],
    },
  ]);

  constructor() {}

  addColumn(title: string, color: string) {
    const newColumn: Column = {
      id: crypto.randomUUID(),
      title,
      color,
      tickets: [],
    };
    this.columns.update((cols) => [...cols, newColumn]);
  }

  updateColumn(id: string, title: string, color: string) {
    this.columns.update((cols) =>
      cols.map((col) => (col.id === id ? { ...col, title, color } : col))
    );
  }

  deleteColumn(id: string) {
    this.columns.update((cols) => cols.filter((col) => col.id !== id));
  }

  addTicket(columnId: string, ticket: Omit<Ticket, 'id'>) {
    const newTicket: Ticket = {
      ...ticket,
      id: crypto.randomUUID(),
    };
    this.columns.update((cols) =>
      cols.map((col) =>
        col.id === columnId ? { ...col, tickets: [...col.tickets, newTicket] } : col
      )
    );
  }

  updateTicket(columnId: string, ticketId: string, updatedTicket: Partial<Ticket>) {
    this.columns.update((cols) =>
      cols.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tickets: col.tickets.map((t) => (t.id === ticketId ? { ...t, ...updatedTicket } : t)),
          };
        }
        return col;
      })
    );
  }

  deleteTicket(columnId: string, ticketId: string) {
    this.columns.update((cols) =>
      cols.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tickets: col.tickets.filter((t) => t.id !== ticketId),
          };
        }
        return col;
      })
    );
  }

  moveTicket(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      // Reordering in the same column
      const column = this.columns().find((c) => c.tickets === event.container.data);
      if (column) {
        const newTickets = [...column.tickets];
        moveItemInArray(newTickets, event.previousIndex, event.currentIndex);
        this.columns.update((cols) =>
          cols.map((col) => (col.id === column.id ? { ...col, tickets: newTickets } : col))
        );
      }
    } else {
      // Moving between columns
      const prevColumn = this.columns().find((c) => c.tickets === event.previousContainer.data);
      const currColumn = this.columns().find((c) => c.tickets === event.container.data);

      if (prevColumn && currColumn) {
        const prevTickets = [...prevColumn.tickets];
        const currTickets = [...currColumn.tickets];

        transferArrayItem(
          prevTickets,
          currTickets,
          event.previousIndex,
          event.currentIndex
        );

        this.columns.update((cols) =>
          cols.map((col) => {
            if (col.id === prevColumn.id) {
              return { ...col, tickets: prevTickets };
            }
            if (col.id === currColumn.id) {
              return { ...col, tickets: currTickets };
            }
            return col;
          })
        );
      }
    }
  }
}
