import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';
import { User } from '../lib';

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
  handleSignOut: () => void;
};

export default function ModalMenu({
  isOpen,
  setOpen,
  user,
  handleSignOut,
}: Props) {
  function signOutClick() {
    handleSignOut();
    setOpen(!isOpen);
  }
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-white">
      <div className="flex justify-end">
        <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
      </div>
      <div>
        <div className="flex flex-col items-center justify-between h-[30vh]">
          <Link to="/">
            <button onClick={() => setOpen(!isOpen)}>Home</button>
          </Link>
          <Link to="/events">
            <button onClick={() => setOpen(!isOpen)}>Events</button>
          </Link>
          {user && (
            <>
              <Link to="/user-tickets">
                <button onClick={() => setOpen(!isOpen)}>My Tickets</button>
              </Link>
              <button onClick={signOutClick}>Sign-Out</button>
            </>
          )}
          {!user && (
            <>
              <Link to="/sign-in">
                <button onClick={() => setOpen(!isOpen)}>Sign-In</button>
              </Link>
              <Link to="/sign-up">
                <button onClick={() => setOpen(!isOpen)}>Sign-Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
