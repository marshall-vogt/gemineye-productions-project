type Props = {
  locationAddress: string;
  locationName: string;
};

export default function Details({ locationAddress, locationName }: Props) {
  return (
    <>
      <div>Event Description</div>
      <div>Doors Open: 8:00PM 21+</div>
      <div>Venue Location</div>
      <div>
        <div>{locationName}</div>
        <div>{locationAddress}</div>
      </div>
    </>
  );
}
