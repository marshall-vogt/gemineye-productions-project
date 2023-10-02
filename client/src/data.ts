export type Event = {
  date: string;
  eventFlyer?: string;
  eventId: number;
  locationAddress: string;
  locationName: string;
  title: string;
};

export async function readEvents(): Promise<Event[]> {
  const response = await fetch('/api/events');
  if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
  const entryList = await response.json();
  return entryList;
}
