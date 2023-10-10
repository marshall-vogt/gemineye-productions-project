import { Event } from '../lib/data';
import { Link } from 'react-router-dom';

type Props = {
  event: Event;
};

export default function HomePageEvents({ event }: Props) {
  const { date, title, locationName, eventId, locationAddress } = event;
  const newDate = new Date(date).toDateString();
  return (
    <li>
      <div className="flex w-full h-[5vh] justify-around items-center mt-5 bg-[#352f44] mr-2">
        <div className="w-1/5 flex justify-center">{newDate}</div>
        <div className="w-1/4 flex justify-center">{title}</div>
        <div className="w-1/4 flex flex-col items-center">
          <div>{locationName}</div>
          <div>{locationAddress}</div>
        </div>
        <div className="w-1/6 border flex justify-center">
          <Link to={`events/${eventId}`}>
            <button>Tickets</button>
          </Link>
        </div>
      </div>
    </li>
  );
}
