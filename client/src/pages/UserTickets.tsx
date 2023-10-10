import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { fetchTickets } from '../lib/data';
import UniqueQrCode from '../components/UniqueQrCode';
import '../components/QrCode.css';

export type Ticket = {
  cost: number;
  date: string;
  eventFlyer: string;
  locationAddress: string;
  locationName: string;
  title: string;
  hashedCode: string;
  createdAt: string;
  eventId: number;
  userId: number;
  ticketId: number;
};

export default function UserTickets() {
  const [ticketsPurchased, setTicketsPurchased] = useState<Ticket[]>();
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

  // const {
  //   date,
  //   title,
  //   locationName,
  //   eventFlyer,
  //   locationAddress,
  //   ticketCount,
  // } = ticketsPurchased;

  const renderTickets = ticketsPurchased.map((e, i) => {
    const newDate = new Date(e.date).toDateString();
    return (
      <tr key={i}>
        <td>
          <img src={e.eventFlyer} />
        </td>
        <td>{i + 1}</td>
        <td>{newDate}</td>
        <td>
          {e.locationName}
          <br />
          {e.locationAddress}
        </td>
        <td>
          <UniqueQrCode code={e.hashedCode} />
        </td>
      </tr>
    );
  });

  return (
    <div>
      <img src="/images/dj1.JPG" />
      {ticketsPurchased.length === 0 ? (
        <div>No tickets purchased</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <td>My Tickets</td>
              </tr>
              <tr>
                <th>Event</th>
                <th>Ticket Number</th>
                <th>Date</th>
                <th>Location</th>
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>{renderTickets}</tbody>
          </table>
        </>
      )}
    </div>
  );
}
