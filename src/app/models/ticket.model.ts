export type TicketType = 'User Story' | 'Bug' | 'Change' | 'Gap' | 'Technical';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  color: string;
}
