export default function EventList({ event }) {
  return (
    <li>
      <div className="entryRow">
        <div>{event.date}</div>
        <div>{event.title}</div>
        <div>{event.locationName}</div>
        <button>Tickets</button>
      </div>
    </li>
  );
}
