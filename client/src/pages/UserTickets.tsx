import { useContext } from 'react';
import AppContext from '../components/AppContext';

export default function UserTickets() {
  const { user } = useContext(AppContext);
  return <div>{user && 'Hello, World!'}</div>;
}
