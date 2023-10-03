import { Outlet, Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
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
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
