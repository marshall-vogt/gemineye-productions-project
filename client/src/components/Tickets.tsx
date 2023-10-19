type Props = {
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handlePurchase: () => void;
  cost: number;
};

export default function Tickets({ setQuantity, handlePurchase, cost }: Props) {
  return (
    <div className="bg-black flex flex-col items-center w-[75vw] sm:w-[60vw] md:w-[55vw] lg:w-[50vw] 2xl:w-[40vw] p-5 mb-3 text-sm sm:text-base md:text-lg 2xl:text-xl">
      <div className="bg-[#d9d9d9] text-black w-[65vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] 2xl:w-[30vw] flex justify-between items-center rounded-md p-5">
        <select
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="m-2 w-10 rounded-sm">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        <span className="text-center">General Admission</span>
        <span>${cost.toFixed(2)}</span>
      </div>
      <button
        onClick={handlePurchase}
        className="bg-[#411e8f] w-40 mt-10 rounded-md">
        Checkout
      </button>
    </div>
  );
}
