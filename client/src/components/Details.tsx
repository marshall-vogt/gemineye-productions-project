type Props = {
  locationAddress: string;
  locationName: string;
};

export default function Details({ locationAddress, locationName }: Props) {
  return (
    <div className="bg-black flex flex-col items-center w-[75vw] sm:w-[60vw] md:w-[55vw] lg:w-[50vw] 2xl:w-[40vw] p-5 mb-3 text-sm sm:text-base md:text-lg 2xl:text-xl">
      <div className="bg-white text-black w-[45vw] sm:w-[40vw] md:w-[35vw] lg:w-[30vw] 2xl:w-[25vw] text-center">
        Event Description
      </div>
      <div className="bg-[#411e8f] flex flex-col items-center w-[55vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] 2xl:w-[35vw]">
        <div>Doors Open: 8:00PM</div>
        <div> 21+</div>
      </div>
      <div className="bg-white text-black w-[45vw] sm:w-[40vw] md:w-[35vw] lg:w-[30vw] 2xl:w-[25vw] text-center mt-2">
        Venue Location
      </div>
      <div className="bg-[#411e8f] flex flex-col items-center w-[55vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] 2xl:w-[35vw]">
        <div className="text-base sm:text-lg md:text-xl 2xl:text-2xl">
          {locationName}
        </div>
        <div>{locationAddress}</div>
      </div>
    </div>
  );
}
