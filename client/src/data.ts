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

export async function fetchTickets(userId: number): Promise<Event> {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(userId),
  };
  const res = await fetch(`/api/userEvents/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function purchaseTickets(
  userId: number,
  eventId: number,
  ticketCount: number
): Promise<Event> {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({ userId, eventId, ticketCount }),
  };
  const res = await fetch(`/api/userEvents/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
