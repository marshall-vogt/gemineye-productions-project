import { Event } from '../lib/data';
import { Link } from 'react-router-dom';

type Props = {
  event: Event;
};

export default function EventPageEvents({ event }: Props) {
  const { date, title, locationName, eventId } = event;
  const newDate = new Date(date);
  return (
    <div className="event">
      <div>{newDate.toDateString()}</div>
      <div>{title}</div>
      <div>{locationName}</div>
      <div>
        <Link to={`${eventId}`}>
          <button>Tickets</button>
        </Link>
      </div>
    </div>
  );
}
