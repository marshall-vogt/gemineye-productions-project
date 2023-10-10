type Props = {
  locationAddress: string;
  locationName: string;
};

export default function Details({ locationAddress, locationName }: Props) {
  return (
    <div className="bg-black flex flex-col items-center w-[50vw] p-5 mb-3">
      <div className="bg-white text-black w-[15vw] text-center">
        Event Description
      </div>
      <div className="bg-[#411e8f] flex flex-col items-center w-[30vw]">
        <div>Doors Open: 8:00PM</div>
        <div> 21+</div>
      </div>
      <div className="bg-white text-black w-[15vw] text-center mt-2">
        Venue Location
      </div>
      <div className="bg-[#411e8f] flex flex-col items-center w-[30vw]">
        <div className="text-xl">{locationName}</div>
        <div>{locationAddress}</div>
      </div>
    </div>
  );
}
