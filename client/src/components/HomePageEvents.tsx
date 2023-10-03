import { Event } from '../data';
import { Link } from 'react-router-dom';

type Props = {
  event: Event;
};

export default function HomePageEvents({ event }: Props) {
  const { date, title, locationName, eventId } = event;
  const newDate = new Date(date);
  return (
    <li>
      <div className="entryRow">
        <div>{newDate.toDateString()}</div>
        <div>{title}</div>
        <div>{locationName}</div>
        <div>
          <Link to={`events/${eventId}`}>
            <button>Tickets</button>
          </Link>
        </div>
      </div>
    </li>
  );
}
