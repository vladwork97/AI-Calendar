import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarEvent } from "../types/CalendarEvent";

interface CalendarViewProps {
  events: CalendarEvent[][];
}

const CalendarView = ({ events }: CalendarViewProps) => {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">📅 Calendar View</h2>
      <FullCalendar
        events={events.flat().map((event) => ({
          title: event.title,
          start: event.start,
          end: event.end,
        }))}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
      />
    </div>
  );
};

export default CalendarView;
