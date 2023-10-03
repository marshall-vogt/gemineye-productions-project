import { useParams } from 'react-router-dom';
import { fetchEvent } from '../data';
import { useEffect, useState } from 'react';
import { Event } from '../data';
import './EventDetails.css';
import { Link } from 'react-router-dom';

type Scope = 'tickets' | 'details' | 'checkout';

export default function EventDetails() {
  const params = useParams();
  const eventId = params.eventId;
  const [event, setEvent] = useState<Event>();
  const [scope, setScope] = useState<Scope>('tickets');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    async function loadEvent(eventId: string) {
      try {
        const fetchedEvent = await fetchEvent(eventId);
        setEvent(fetchedEvent);
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
  const { date, title, locationName, eventFlyer, locationAddress, cost } =
    event;
  const newDate = new Date(date).toDateString();
  const subtotal = quantity * cost;
  const fixedSubtotal = subtotal.toFixed(2);

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
        {scope !== 'checkout' && (
          <>
            <div>
              GEMINEYE presents {title} at {locationName}
            </div>
            <div>{newDate}</div>
            <div>
              <div className="scope">
                <button onClick={() => setScope('tickets')}>Tickets</button>
                <button onClick={() => setScope('details')}>Details</button>
              </div>

              <div>
                {scope === 'tickets' && (
                  <>
                    <div className="select-tickets">
                      <select
                        onChange={(e) => setQuantity(Number(e.target.value))}>
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
                    <button onClick={() => setScope('checkout')}>
                      Purchase
                    </button>
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
          </>
        )}
        {scope === 'checkout' && (
          <>
            <div>Your Tickets</div>
            <table>
              <thead>
                <tr>
                  <th>Qty</th>
                  <th>Tickets</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    GEMINEYE presents {title} at {locationName} {newDate}
                  </td>
                </tr>
                <tr>
                  <td>{quantity}</td>
                  <td>General Admission @ $15.00</td>
                  <td>${fixedSubtotal}</td>
                </tr>
              </tbody>
            </table>
            <button disabled>
              Grand Total: ${(subtotal + 0.08 * subtotal).toFixed(2)}
            </button>
            <button>Add Another Event</button>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
