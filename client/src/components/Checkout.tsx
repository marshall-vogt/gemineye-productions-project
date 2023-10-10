import { Event } from '../lib/data';
import { Scope } from '../pages/EventDetails';
type Props = {
  checkoutProps: {
    handleCheckout: (
      eventId: number,
      userId: number,
      quantity: number
    ) => Promise<void>;
    event: Event;
    fixedSubtotal: string;
    quantity: number;
    subtotal: number;
    eventId: number;
    userId: number | undefined;
    setScope: (value: React.SetStateAction<Scope>) => void;
  };
};
export default function Checkout({ checkoutProps }: Props) {
  const {
    handleCheckout,
    event,
    fixedSubtotal,
    quantity,
    subtotal,
    eventId,
    userId,
    setScope,
  } = checkoutProps;
  const { date, title, locationName } = event;
  const newDate = new Date(date).toDateString();
  const grandTotal = (subtotal + 0.08 * subtotal).toFixed(2);
  return (
    <>
      <div className="text-3xl">Your Tickets</div>
      <table className="bg-[#d9d9d9] text-black m-2 w-[50vw]">
        <thead>
          <tr>
            <th className="border border-black w-[calc(100%/6)]">Qty</th>
            <th className="border border-black w-[calc(200%/3)]">Tickets</th>
            <th className="border border-black w-[calc(100%/6)]">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-black w-[100%]">
            <td></td>
            <td className="flex flex-col items-center underline m-2">
              <div>GEMINEYE presents</div>
              <div>
                {title} at {locationName}
              </div>
              <div>{newDate}</div>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="border border-black text-center">{quantity}</td>
            <td className="border border-black text-center">
              General Admission @ $15.00
            </td>
            <td className="border border-black text-center">
              ${fixedSubtotal}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        disabled
        className="w-[50vw] bg-[#bbbbbb] text-black m-2 font-bold">
        Grand Total: ${grandTotal}
      </button>
      <button
        className="w-[50vw] bg-[#bbbbbb] text-black m-2"
        onClick={() => setScope('tickets')}>
        Return to Event Details
      </button>
      <button
        className="w-[50vw] bg-[#bbbbbb] text-black m-2 font-bold"
        onClick={() => handleCheckout(eventId, userId as number, quantity)}>
        Purchase
      </button>
    </>
  );
}
