import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { fetchTickets } from '../lib/data';
import UniqueQrCode from '../components/UniqueQrCode';
import { useWindowSize } from '@uidotdev/usehooks';

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
  const size = useWindowSize();
  const width = size.width;
  const resize = (width: number) => {
    if (width < 380) return 50;
    if (width < 640) return 75;
    if (width < 768) return 100;
    if (width < 1024) return 150;
    if (width < 1280) return 200;
    if (width < 1536) return 250;
    return 300;
  };
  const qrSize = resize(width as number);

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

  const renderTickets = ticketsPurchased.map((e, i) => {
    const newDate = new Date(e.date).toDateString();
    return (
      <div key={i} className="grid grid-cols-5">
        <div className="flex justify-center items-center mb-4 mt-4">
          <img src={e.eventFlyer} className="" />
        </div>
        <div className="flex justify-center items-center">{i + 1}</div>
        <div className="flex justify-center items-center">{newDate}</div>
        <div className="flex justify-center items-center text-center w-[20vw]">
          {e.locationName}
          <br />
          {e.locationAddress}
        </div>
        <div className="flex justify-center items-center">
          <UniqueQrCode code={e.hashedCode} index={i} size={qrSize} />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="text-white">
        {ticketsPurchased.length === 0 ? (
          <div className="text-center text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mt-[3vh]">
            No tickets purchased
          </div>
        ) : (
          <>
            <div className="text-center text-2xl m-5">My Tickets</div>
            <div className="grid grid-cols-5 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
              <div className="border w-[20vw] flex justify-center items-center">
                Event
              </div>
              <div className="border w-[20vw] flex justify-center items-center text-center">
                Ticket Number
              </div>
              <div className="border w-[20vw] flex justify-center items-center">
                Date
              </div>
              <div className="border w-[20vw] flex justify-center items-center">
                Location
              </div>
              <div className="border w-[20vw] flex justify-center items-center text-center">
                QR Code
              </div>
            </div>
            <>{renderTickets}</>
          </>
        )}
      </div>
      <div className="h-[18vh]"></div>
    </>
  );
}
