import EventPageEvents from '../components/EventPageEvents';
import { Event } from '../lib/data';

type Props = {
  upcomingEvents: Event[] | undefined;
};

export default function EventsPage({ upcomingEvents }: Props) {
  return (
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-3xl">Events</h2>
      <div className="flex flex-col justify-center m-5 w-[80vw]">
        {upcomingEvents &&
          upcomingEvents.map((event: Event) => (
            <EventPageEvents key={event.eventId} event={event} />
          ))}
      </div>
      <div className="h-[18vh]"></div>
    </div>
  );
}
