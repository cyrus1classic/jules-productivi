export type TicketType = 'User Story' | 'Bug' | 'Change' | 'Gap' | 'Technical' | 'Map';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  color: string;
  mapData?: {
    center: { lat: number; lng: number };
    zoom: number;
    pin?: { lat: number; lng: number };
  };
}
