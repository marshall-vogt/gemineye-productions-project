import Carousel from '../components/Carousel';
import HomePageEvents from '../components/HomePageEvents';
import { Event } from '../lib/data';

type Props = {
  upcomingEvents: Event[] | undefined;
};

export default function HomePage({ upcomingEvents }: Props) {
  return (
    <div>
      <Carousel />
      <div className="text-white">
        <div className="flex justify-center m-5">
          <h3 className="font-bold text-xl">Upcoming Events</h3>
        </div>
        <div>
          <ul>
            {upcomingEvents?.map((event) => (
              <HomePageEvents key={event.eventId} event={event} />
            ))}
          </ul>
        </div>
      </div>
      <div className="h-[11vh]"></div>
    </div>
  );
}
