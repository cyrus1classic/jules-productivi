import { Ticket } from './ticket.model';

export interface Column {
  id: string;
  title: string;
  tickets: Ticket[];
  color: string;
}
