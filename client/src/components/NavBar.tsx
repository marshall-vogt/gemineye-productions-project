import { Outlet, Link } from 'react-router-dom';
import './NavBar.css';
import { useContext } from 'react';
import AppContext from './AppContext';

export default function NavBar() {
  const { user, handleSignOut } = useContext(AppContext);

  return (
    <div>
      <div className="navbar">
        <nav>
          <div className="logo">
            <h2>Gemineye Productions</h2>
          </div>
          <div className="links">
            <Link to="/">
              <button className="navbar-button">Home</button>
            </Link>
            <Link to="/events">
              <button className="navbar-button">Events</button>
            </Link>
            {user && (
              <>
                <Link to="/user-tickets">
                  <button>My Tickets</button>
                </Link>
                <button className="navbar-button" onClick={handleSignOut}>
                  Sign-Out
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/sign-in">
                  <button className="navbar-button">Sign-In</button>
                </Link>
                <Link to="/sign-up">
                  <button className="navbar-button">Sign-Up</button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
