const tokenKey = 'react-context-jwt';
import { Ticket } from '../pages/UserTickets';

export type Event = {
  date: string;
  eventFlyer?: string;
  eventId: number;
  locationAddress: string;
  locationName: string;
  title: string;
  cost: number;
};

export async function readEvents(): Promise<Event[]> {
  const response = await fetch('/api/events');
  if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
  const entryList = await response.json();
  return entryList;
}

export async function fetchEvent(eventId: number): Promise<Event> {
  const res = await fetch(`/api/events/${eventId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchTickets(userId: number): Promise<Ticket[]> {
  const auth = localStorage.getItem(tokenKey);
  const a = JSON.parse(auth as string);
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${a.token}`,
    },
  };
  const res = await fetch(`/api/userEvents/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function purchaseTickets(
  eventId: number,
  userId: number,
  ticketCount: number
): Promise<void> {
  const auth = localStorage.getItem(tokenKey);
  const a = JSON.parse(auth as string);
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${a.token}`,
    },
    body: JSON.stringify({ ticketCount }),
  };
  const res = await fetch(`/api/userEvents/${eventId}/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}
