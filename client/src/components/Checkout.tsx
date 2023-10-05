import { Event } from '../lib/data';
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
  } = checkoutProps;
  const { date, title, locationName } = event;
  const newDate = new Date(date).toDateString();
  const grandTotal = (subtotal + 0.08 * subtotal).toFixed(2);
  return (
    <>
      <div>Your Tickets</div>
      <table>
        <thead>
          <tr>
            <th>Qty</th>
            <th>Tickets</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              GEMINEYE presents {title} at {locationName} {newDate}
            </td>
          </tr>
          <tr>
            <td>{quantity}</td>
            <td>General Admission @ $15.00</td>
            <td>${fixedSubtotal}</td>
          </tr>
        </tbody>
      </table>
      <button disabled>Grand Total: ${grandTotal}</button>
      <button>Add Another Event</button>
      <button
        onClick={() => handleCheckout(eventId, userId as number, quantity)}>
        Checkout
      </button>
    </>
  );
}
