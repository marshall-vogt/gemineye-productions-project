import EventPageEvents from '../components/EventPageEvents';
import { Event } from '../data';
import './EventsPage.css';

type Props = {
  upcomingEvents: Event[] | undefined;
};

export default function EventsPage({ upcomingEvents }: Props) {
  return (
    <>
      <h3>Events</h3>
      <div className="events">
        {upcomingEvents &&
          upcomingEvents.map((event: Event) => (
            <EventPageEvents key={event.eventId} event={event} />
          ))}
      </div>
    </>
  );
}
