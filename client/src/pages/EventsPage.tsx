import EventList from '../components/EventList';
import { Event } from '../data';

type Props = {
  upcomingEvents: Event[] | undefined;
};

export default function EventsPage({ upcomingEvents }: Props) {
  return (
    <>
      <h3>Events</h3>
      <div>
        <ul>
          {upcomingEvents &&
            upcomingEvents.map((event: Event) => (
              <EventList key={event.eventId} event={event} />
            ))}
        </ul>
      </div>
    </>
  );
}
