export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  participants?: string[];
}