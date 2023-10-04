import './HomePage.css';
import HomePageEvents from '../components/HomePageEvents';
import { Event } from '../lib/data';

type Props = {
  upcomingEvents: Event[] | undefined;
};

export default function HomePage({ upcomingEvents }: Props) {
  return (
    <>
      <div className="imageDiv">
        <img src="/images/dj1.JPG" alt="dj" />
      </div>
      <h3>Upcoming Events</h3>
      <div>
        <ul>
          {upcomingEvents &&
            upcomingEvents.map((event) => (
              <HomePageEvents key={event.eventId} event={event} />
            ))}
        </ul>
      </div>
    </>
  );
}
