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
      <div className="flex w-full h-[11vh] sm:h-[7vh] justify-around items-center mt-5 bg-[#352f44] mr-2 text-xs md:text-sm 2xl:text-lg">
        <div className="w-1/5 text-center">{newDate}</div>
        <div className="w-1/4 text-center">{title}</div>
        <div className="w-1/4 text-center">
          <div>{locationName}</div>
          <div className="text-center">{locationAddress}</div>
        </div>
        <div className="border rounded-md">
          <Link to={`events/${eventId}`}>
            <button className="p-3 flex justify-center items-center h-[4vh]">
              Tickets
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
}
