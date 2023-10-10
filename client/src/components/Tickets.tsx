type Props = {
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handlePurchase: () => void;
};

export default function Tickets({ setQuantity, handlePurchase }: Props) {
  return (
    <div className="bg-black flex flex-col items-center w-[50vw] p-5 mb-3">
      <div className="bg-[#d9d9d9] text-black w-full flex justify-between items-center rounded-md p-5">
        <select
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="m-2">
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
        <span>General Admission</span>
        <span>$15.00</span>
      </div>
      <button
        onClick={handlePurchase}
        className="bg-[#411e8f] w-40 mt-10 rounded-md">
        Purchase
      </button>
    </div>
  );
}
