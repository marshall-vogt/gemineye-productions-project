import { useParams } from 'react-router-dom';
import { fetchEvent, purchaseTickets } from '../lib/data';
import { useEffect, useState, useContext } from 'react';
import { Event } from '../lib/data';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import Checkout from '../components/Checkout';
import Tickets from '../components/Tickets';
import Details from '../components/Details';

export type Scope = 'tickets' | 'details' | 'checkout';

export default function EventDetails() {
  const style1 = 'bg-black text-white p-1';
  const style2 = 'bg-white text-black p-1';
  const params = useParams();
  const eventId = Number(params.eventId);
  const [event, setEvent] = useState<Event>();
  const [scope, setScope] = useState<Scope>('tickets');
  const [ticketStyle, setTicketStyle] = useState(style1);
  const [detailStyle, setDetailStyle] = useState(style2);
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

  function handleTicketClick() {
    setScope('tickets');
    setTicketStyle(style1);
    setDetailStyle(style2);
  }

  function handleDetailsClick() {
    setScope('details');
    setDetailStyle(style1);
    setTicketStyle(style2);
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
    setScope,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center m-5">
        <img src={`${eventFlyer}`} alt="event flyer" className="w-[50vw]" />
      </div>
      <div className="bg-[#411e8f] w-[70vw] flex flex-col items-center justify-around text-white">
        {scope !== 'checkout' && (
          <>
            <div className="mt-10 text-2xl">GEMINEYE presents</div>
            <div className="text-xl">
              {title} at {locationName}
            </div>
            <div>{newDate}</div>
            <div>
              <div className="flex">
                <button onClick={handleTicketClick} className={ticketStyle}>
                  Tickets
                </button>
                <button onClick={handleDetailsClick} className={detailStyle}>
                  Details
                </button>
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
      <div className="h-[11vh]"></div>
    </div>
  );
}
