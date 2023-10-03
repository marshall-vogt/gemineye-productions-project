import { useParams } from 'react-router-dom';
import { fetchEvent } from '../data';
import { useEffect, useState } from 'react';
import { Event } from '../data';
import './EventDetails.css';

type Scope = 'tickets' | 'details';

export default function EventDetails() {
  const params = useParams();
  const eventId = params.eventId;
  const [event, setEvent] = useState<Event>();
  const [scope, setScope] = useState<Scope>('tickets');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadEvent(eventId: string) {
      try {
        const event = await fetchEvent(eventId);
        setEvent(event);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (eventId) {
      setIsLoading(true);
      loadEvent(eventId);
    }
  }, [eventId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Event {eventId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  if (!event) return null;
  const { date, title, locationName, eventFlyer, locationAddress } = event;
  const newDate = new Date(date);

  return (
    <>
      <div className="event-image-container">
        <img
          src={`${eventFlyer}`}
          alt="event flyer"
          className="event-details-image"
        />
      </div>
      <div>
        <div>
          GEMINEYE presents {title} at {locationName}
        </div>
        <div>{newDate.toDateString()}</div>
        <div>
          <div className="scope">
            <button onClick={() => setScope('tickets')}>Tickets</button>
            <button onClick={() => setScope('details')}>Details</button>
          </div>
          <div>
            {scope === 'tickets' && (
              <>
                <div className="select-tickets">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                  <span>General Admission</span>
                  <span>$15.00</span>
                </div>
                <button>Purchase</button>
              </>
            )}
            {scope === 'details' && (
              <>
                <div>Event Description</div>
                <div>Doors Open: 8:00PM 21+</div>
                <div>Venue Location</div>
                <div>
                  <div>{locationName}</div>
                  <div>{locationAddress}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
