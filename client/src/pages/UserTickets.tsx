import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { fetchTickets } from '../lib/data';

export type Ticket = {
  cost: number;
  date: string;
  eventFlyer: string;
  locationAddress: string;
  locationName: string;
  ticketCount: number;
  title: string;
};

export default function UserTickets() {
  const [ticketsPurchased, setTicketsPurchased] = useState<Ticket>();
  const { user } = useContext(AppContext);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const userId = user?.userId;

  useEffect(() => {
    async function loadTickets(id: number) {
      try {
        const fetchedTickets = await fetchTickets(id);
        setTicketsPurchased(fetchedTickets);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTickets(userId as number);
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Tickets:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  if (!ticketsPurchased) return null;

  const {
    date,
    title,
    locationName,
    eventFlyer,
    locationAddress,
    cost,
    ticketCount,
  } = ticketsPurchased;
  return (
    <div>
      {!ticketsPurchased && 'Tickets not found'}
      {date}, {title}, {locationAddress}, {locationName}, {eventFlyer}, {cost},
      {ticketCount}
    </div>
  );
}
