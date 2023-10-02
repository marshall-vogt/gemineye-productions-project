import './HomePage.css';
import EventList from '../components/EventList';
import { Event } from '../data';

type Props = {
  upcomingEvents: Event[] | undefined;
};

export default function HomePage({ upcomingEvents }: Props) {
  return (
    <>
      <h3>Upcoming Events</h3>
      <div>
        <ul>
          {upcomingEvents &&
            upcomingEvents.map((event) => (
              <EventList key={event.eventId} event={event} />
            ))}
        </ul>
      </div>
    </>
  );
}
