import { useParams } from 'react-router-dom';
import { fetchEvent, purchaseTickets } from '../lib/data';
import { useEffect, useState, useContext } from 'react';
import { Event } from '../lib/data';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import Checkout from '../components/Checkout';
import Tickets from '../components/Tickets';
import Details from '../components/Details';

type Scope = 'tickets' | 'details' | 'checkout';

export default function EventDetails() {
  const params = useParams();
  const eventId = Number(params.eventId);
  const [event, setEvent] = useState<Event>();
  const [scope, setScope] = useState<Scope>('tickets');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [quantity, setQuantity] = useState<number>(1);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const userId = user?.userId;

  function handlePurchase() {
    user
      ? setScope('checkout')
      : alert('Must be logged in to purchase tickets');
  }

  async function handleCheckout(
    eventId: number,
    userId: number,
    ticketCount: number
  ) {
    try {
      await purchaseTickets(eventId, userId, ticketCount);
      navigate('/checkout');
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    async function loadEvent(eventId: number) {
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
  const checkoutProps = {
    handleCheckout,
    event,
    quantity,
    fixedSubtotal,
    subtotal,
    eventId,
    userId,
  };

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
                  <Tickets
                    setQuantity={setQuantity}
                    handlePurchase={handlePurchase}
                  />
                )}
                {scope === 'details' && (
                  <Details
                    locationAddress={locationAddress}
                    locationName={locationName}
                  />
                )}
              </div>
            </div>
          </>
        )}
        {scope === 'checkout' && <Checkout checkoutProps={checkoutProps} />}
      </div>
    </>
  );
}
