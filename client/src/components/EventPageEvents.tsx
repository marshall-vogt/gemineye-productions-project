import { Event } from '../lib/data';
import { Link } from 'react-router-dom';

type Props = {
  event: Event;
};

export default function EventPageEvents({ event }: Props) {
  const { date, title, locationName, eventId, locationAddress } = event;
  const newDate = new Date(date);
  return (
    <div className="bg-[#352f44] rounded-md flex justify-center m-5 h-[28vh] text-xs sm:text-sm md:text-base lg:text-lg text-center">
      <div className="flex flex-col items-center justify-between m-5">
        <div>{newDate.toDateString()}</div>
        <div className="text-xl sm:text-2xl md:text-3xl mb-3">{title}</div>
        <div>{locationName}</div>
        <div>{locationAddress}</div>
        <div>
          <Link to={`${eventId}`}>
            <button className="bg-[#2A2438] p-3 border rounded-lg">
              Tickets
            </button>
          </Link>
        </div>
      </div>
      <div className="h-[8vh]"></div>
    </div>
  );
}
