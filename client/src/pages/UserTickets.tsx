import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { fetchTickets } from '../lib/data';
import './UserTickets.css';

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
    ticketCount,
  } = ticketsPurchased;
  const newDate = new Date(date).toDateString();

  const renderTickets = () => {
    const ticketList = [];
    for (let i = 0; i < ticketCount; i++) {
      ticketList.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{newDate}</td>
          <td>{title}</td>
          <td>
            {locationName}
            <br />
            {locationAddress}
          </td>
          <td>
            {Math.floor(Math.random() * 1000)}.
            {Math.floor(Math.random() * 1000)}.
            {Math.floor(Math.random() * 1000)}
          </td>
        </tr>
      );
    }
    return ticketList;
  };

  return (
    <div>
      {!ticketsPurchased ? (
        'Tickets not found'
      ) : (
        <>
          <img src={eventFlyer} alt="event-image" />
          <table>
            <thead>
              <tr>
                <td>My Tickets</td>
              </tr>
              <tr>
                <th>Ticket Number</th>
                <th>Date</th>
                <th>Event</th>
                <th>Location</th>
                <th>Ticket ID</th>
              </tr>
            </thead>
            <tbody>{renderTickets()}</tbody>
          </table>
        </>
      )}
    </div>
  );
}
